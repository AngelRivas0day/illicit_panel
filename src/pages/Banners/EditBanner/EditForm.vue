<template>
    <div class="edit-form">
        <form @submit="onSubmit" class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Titulo del banner</label>
                    <md-input v-model="form.title"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Imagen del banner</label>
                    <md-file @change="handleChange" v-model="form.image"></md-file>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 offset-md-6">
                <template v-for="image in urlPreview">
                    <div :key="image" class="img-form">
                        <img :src="image" alt="">
                    </div>
                </template>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Texto del bot&oacute;n</label>
                    <md-input v-model="form.buttonText"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Enlace del bot&oacute;n</label>
                    <md-input v-model="form.buttonUrl"></md-input>
                </md-field>
            </div>
            <div class="col-12 text-right">
                <md-button type="submit" class="md-dense md-raised md-primary">Guardar</md-button>
            </div>
            <div class="col-12 text-right">
                <md-button type="button" to="/banners" class="md-dense md-raised">Volver</md-button>
            </div>
        </form>
    </div>
</template>

<script>
import store from '@/store'
// import { mapState } from 'vuex'

export default {
    name: 'EditForm',
    mounted(){
        if(this.$route.params.id){
            this.getData()
            this.isCreating = false
        }else{
            this.isCreating = true
        }
    },
    data: () => ({
        form: {
            image: '',
            title: '',
            buttonText: '',
            buttonUrl: ''    
        },
        urlPreview: [],
        isCreating: true,
        selectedFile: []
    }),
    methods: {
        getData(){
            store.dispatch('banner/getItem', this.$route.params.id)
                .catch(resp=>{
                    this.form = resp
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        onSubmit(e){
            e.preventDefault()
            if(this.isCreating){
                const formData = new FormData()
                formData.append('title', this.form.title)
                formData.append('buttonText', this.form.buttonText)
                formData.append('buttonUrl', this.form.buttonUrl)
                Array.from(this.selectedFile).forEach((element,i) => {
                    formData.append("image", element)
                });
                store.dispatch('banners/createItem', formData, {root:true})
                    .then(resp=>{
                        console.log(resp)
                            this.$notify({
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            message: 'Banner creado con éxito',
                            type: 'success'
                        });
                    })
                    .catch(err=>{
                        console.log(err)
                            this.$notify({
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            message: 'Banner no creado debido a un error',
                            type: 'warning'
                        });
                    })
                    .finally(()=>{
                        this.$router.push({name: 'Banners'})
                    })
            }else{

            }
        },
        handleChange(e){
            this.selectedFile = e.target.files
            console.log(this.selectedFile)
            Array.from(this.selectedFile).forEach((element,i) => {
                this.urlPreview.push(URL.createObjectURL(element))
            });
        }
    }
}
</script>

<style>

</style>