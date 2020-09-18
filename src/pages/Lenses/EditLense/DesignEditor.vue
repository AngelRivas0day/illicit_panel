<template>
    <div class="style-editor">
        <form @submit="addStyle" class="form">
            <md-card class="mb-4">
                <md-card-header>
                    <div class="md-title">Editor de estilos</div>
                </md-card-header>
                    <md-card-content>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <md-field>
                                <label>Nombre del dise&ntilde;o</label>
                                <md-input v-model="styleData.name"></md-input>
                            </md-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <md-field>
                                <label>Nombre del color</label>
                                <md-input v-model="styleData.color.colorName"></md-input>
                            </md-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 offset-md-6 col-md-6 text-center">
                            <chrome-picker class="mx-auto my-0" v-model="styleData.color.hex" />
                        </div>
                        <div class="col-12">
                            <md-field>
                                <label>3 Imagenes para el dise&ntilde;o: {{styleData.name}}</label>
                                <md-file @change="onFileChange" v-model="styleData.images" accept="image/*" multiple/>
                            </md-field>
                        </div>
                        <template v-if="styleData.images">
                            <div v-for="i in urlPreviews" :key="i" class="col-xs-12 col-sm-6 col-md-4">
                                <img :src="i" alt="">
                            </div> 
                        </template>
                        <div class="col-12">
                            <md-field>
                                <label>Imagen principal del dise&ntilde;o: {{styleData.name}}</label>
                                <md-file @change="onFileChangeMain" v-model="styleData.mainImage" accept="image/*"/>
                            </md-field>
                        </div>
                        <template v-if="styleData.mainImage">
                            <div v-for="standAloneImage in urlPreview" :key="standAloneImage" class="col-xs-12 col-sm-6 col-md-4">
                                <img :src="standAloneImage" alt="">
                            </div> 
                        </template>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" class="md-dense md-raised md-primary">
                        <i class="tim-icons icon-simple-add"></i>
                        Agregar estilo
                    </md-button>
                </md-card-actions>
            </md-card>

            <md-card>
                <md-card-header>
                    <div class="md-title">Estilos del lente</div>
                </md-card-header>
                <md-card-content>
                    <div :class="{'mb-5': lenseStyles.length > 1}" v-for="s in lenseStyles" :key="s.name">
                        <DesignCard :design="s" />
                    </div>
                </md-card-content>
            </md-card>

            <div class="w-100 mt-4 text-right">
                <md-button to="/lentes" class="md-dense md-primary md-raised">
                    <i class="tim-icons icon-minimal-left"></i>
                    Volver
                </md-button>
            </div>
        </form>
    </div>
</template>

<script>
import DesignCard from './DesignCard'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'StyleEditor',
    components: {DesignCard},
    computed: {
        ...mapState('glasses',{
            designs: 'designs'
        })
    },
    updated(){
        if(this.$route.params.id)
            this.lenseStyles = this.designs
    },
    watch: {
        designs(){
            if(this.$route.params.id)
                this.lenseStyles = this.designs
        }
    },
    data: () => ({
        lenseStyles: [],
        styleData: {
            color: {
                colorName: '',
                hex: ''
            },
            images: [],
            mainImage: [],
            name: ''
        },
        urlPreviews: [],
        selectedFiles: [],
        selectedFile: [],
        urlPreview: []
    }),
    methods: {
        ...mapActions('glasses',{
            createGlassDesign: 'createGlassDesign'
        }),
        async addStyle(e){
            e.preventDefault()
            const formData = new FormData()
            formData.append('colorName', this.styleData.color.colorName)
            formData.append('name', this.styleData.name)
            formData.append('hex', this.styleData.color.hex.hex)
            Array.from(this.selectedFiles).forEach((element,i) => {
                formData.append("images", element)
            });
            Array.from(this.selectedFile).forEach((element,i) => {
                formData.append("mainImage", element)
            });
            try {
                await this.createGlassDesign(formData)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El diseño ha sido creado con éxito',
                    type: 'success'
                });
            } catch (error) {
                console.log(error)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El diseño no ha sido creado debido a un error',
                    type: 'warning'
                });
            } finally {
                this.styleData = {
                    color: { name: '', hex: '' },
                    images: []
                }
                this.urlPreviews = []
            }
        },
        onFileChange(e){
            this.selectedFiles = e.target.files
            Array.from(this.selectedFiles).forEach((element,i) => {
                this.urlPreviews.push(URL.createObjectURL(element))
            });
        },
        onFileChangeMain(e){
            this.selectedFile = e.target.files
            console.log(this.selectedFile)
            Array.from(this.selectedFile).forEach((element,i) => {
                this.urlPreview.push(URL.createObjectURL(element))
            });
        }
    }
}
</script>

<style lang="scss">

</style>