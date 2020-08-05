<template>
    <div class="style-editor">
        <form class="form">
            <md-card class="mb-4">
                <md-card-header>
                    <div class="md-title">Editor de estilos</div>
                </md-card-header>
                    <md-card-content>
                    <form @submit="onSubmit()" class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <md-field>
                                <label>Nombre del estilo</label>
                                <md-input v-model="styleData.color.name"></md-input>
                            </md-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 text-center">
                            <chrome-picker class="mx-auto my-0" v-model="styleData.color.hex" />
                        </div>
                        <div class="col-12">
                            <md-field>
                                <label>3 Imagenes para el estilo color: {{styleData.color.name}}</label>
                                <md-file @change="onFileChange" v-model="styleData.images" accept="image/*" multiple/>
                            </md-field>
                        </div>
                        <template v-if="styleData.images">
                            <div v-for="i in urlPreviews" :key="i" class="col-xs-12 col-sm-6 col-md-4">
                                <img :src="i" alt="">
                            </div> 
                        </template>
                    </form>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="addStyle" class="md-dense md-raised md-primary">
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
                    <div class="mb-5" v-for="s in lenseStyles" :key="s.color.name">
                        <DesignCard :design="s" />
                    </div>
                </md-card-content>
            </md-card>

            <div class="w-100 mt-4">
                <md-button type="submit" class="md-dense md-raised">
                    <i class="tim-icons icon-check-2"></i>
                    Guardar cambios
                </md-button>
            </div>
        </form>
    </div>
</template>

<script>
import DesignCard from './DesignCard'

export default {
    name: 'StyleEditor',
    components: {DesignCard},
    props: {
        designs: {
            type: Array,
            default: () => [],
            required: false
        }
    },
    updated(){
        if(this.designs){
            console.log("Editando estilos")
            console.log("Diseños del lente: ", this.designs)
            this.lenseStyles = this.designs
        }else{
            console.log("Creando estilos")
        }
    },
    watch: {
        designs(){
            this.lenseStyles = this.designs
        }
    },
    data: () => ({
        lenseStyles: [],
        styleData: {
            color: {
                name: '',
                hex: ''
            },
            images: [],
        },
        urlPreviews: []
    }),
    methods: {
        addStyle(){
            console.log(this.styleData.images)
            this.styleData = {
                color: {
                    name: '',
                    hex: ''
                },
                images: []
            }
            this.urlPreviews = []
        },
        deleteStyle(){
            this.lenseStyles.pop()
        },
        onSubmit(){
            console.log(this.lenseStyles)
        },
        onFileChange(e){
            const files = e.target.files;
            Array.from(files).forEach((element,i) => {
                this.urlPreviews.push(URL.createObjectURL(element))
            });
        }
    }
}
</script>

<style lang="scss">

</style>