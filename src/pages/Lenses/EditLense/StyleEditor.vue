<template>
    <div class="style-editor">
        <form @submit="onSubmit()" class="form">

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <label>Color</label>
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
            </div>

            <h3 class="w-100">Dise&ntilde;os actuales</h3>
            <div class="row" v-for="s in lenseStyles" :key="s.color.name">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <label>Color</label>
                        <md-input disabled v-model="s.color.name"></md-input>
                    </md-field>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 text-left">
                    <div class="color-ball" :style="'background-color:'+s.color.hex.hex+';'"></div>
                </div>
                <div v-for="url in s.urls" :key="url" class="col-xs-12 col-sm-6 col-md-4">
                    <img :src="url" alt="">
                </div>
            </div>

            <div class="w-100 text-right">
                <md-button @click="deleteStyle" class="md-dense md-raised md-accent">
                    <i class="tim-icons icon-simple-delete"></i>
                    Eliminar estilo
                </md-button>
                <md-button @click="addStyle" class="md-dense md-raised md-primary">
                    <i class="tim-icons icon-simple-add"></i>
                    Agregar estilo
                </md-button>
            </div>

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
export default {
    name: 'StyleEditor',
    data: () => ({
        lenseStyles: [],
        styleData: {
            color: {
                name: '',
                hex: ''
            },
            images: [],
            urls: []
        },
        urlPreviews: []
    }),
    methods: {
        addStyle(){
            this.lenseStyles.push(this.styleData)
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
                this.styleData.urls.push(URL.createObjectURL(element))
                this.urlPreviews.push(URL.createObjectURL(element))
            });
        }
    }
}
</script>

<style lang="scss">
.color-ball{
    width: 35px;
    height: 35px;
    border-radius: 100%;
    position: relative;
    top: 40%;
    display: block;
    margin: 0 0 0 auto;
}
</style>