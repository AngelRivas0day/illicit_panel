<template>
    <div v-if="glass" class="lense-form">
        <form @submit="onSubmit" class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Producto</label>
                    <md-input :disabled="showDesignEditor" v-model="form.name"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <span class="md-prefix">$</span>
                    <label>Precio</label>
                    <md-input :disabled="showDesignEditor" v-model="form.price"></md-input>
                </md-field>
            </div>
            <div class="col-12">
                <md-field>
                    <label>Desctipci&oacute;n</label>
                    <md-textarea :disabled="showDesignEditor" v-model="form.description" md-autogrow md-counter="200"></md-textarea>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Categorias</label>
                    <md-select :disabled="showDesignEditor" v-model="form.categories" multiple>
                        <md-option value="men">Hombre</md-option>
                        <md-option value="godfather">Godfather</md-option>
                        <md-option value="godfather-ii">Godfather II</md-option>
                        <md-option value="godfather-iii">Godfather III</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Marcas</label>
                    <md-select :disabled="showDesignEditor" v-model="form.brands" multiple>
                        <md-option value="fight-club">Fight Club</md-option>
                        <md-option value="godfather">Godfather</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-12 text-right">
                <md-button v-if="glass && !isCreating" @click="showDesignEditor = !showDesignEditor" :disabled="!glass" class="md-dense md-raised md-primary ml-4">{{showDesignEditor ? 'Ocultar' : 'Ver'}} estilos</md-button>
                <md-button type="submit" :disabled="showDesignEditor" class="md-dense md-raised md-primary">Guardar</md-button>
            </div>
        </form>
        <div v-show="showDesignEditor" class="lense-forn__styles mt-4">
            <!-- Los designs le van a llegar al componente por vuex -->
            <DesignEditor />
        </div>
    </div>
</template>

<script>
import DesignEditor from './DesignEditor'
import { createGlass } from '@/api/glasses'
import store from '@/store'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'EditForm',
    components: {DesignEditor},
    computed: {
        ...mapState('glasses',{
            glass: 'glass'
        })
    },
    mounted(){
        if(this.$route.params.id){
            this.form = this.glass
            this.isCreating = false
        }else{
            this.isCreating = true
        }
    },
    data: ()=>({
        glassId: null,
        form: {
            name: '',
            description: '',
            price: 0,
            categories: [],
            brands: []
        },
        showDesignEditor: false,
        isCreating: false
    }),
    watch:{
        glass(){
            if(this.$route.params.id)
                this.form = this.glass
                this.isCreating = false
        }
    },
    methods: {
        ...mapActions('glasses',{
            createGlass: 'createGlass',
            updateGlass: 'updateGlass'
        }),
        create(){
            // metodo que es llamado cuando se crea un lente
            // sera controlado por un flag
            this.createGlass(this.form)
                .then(resp=>{
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'Lente creado con éxito',
                        type: 'success'
                    });
                    this.showDesignEditor = true
                })
                .catch(err=>{
                    console.log(err)
                    this.showDesignEditor = false
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El lente no ha sido creado debido a un error',
                        type: 'warning'
                    });
                })
        },
        update(){
            const updatedGlass = {
                name: this.form.name,
                description: this.form.description,
                price: this.form.price,
                brands: this.form.brands,
                categories: this.form.categories
            }
            this.updateGlass(updatedGlass)
                .then(resp=>{
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'Lente actualizado con éxito',
                        type: 'success'
                    });
                })
                .catch(err=>{
                    console.log(err)
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El lente no se ha actualizado debido a un error',
                        type: 'warning'
                    });
                })  
                .finally(()=>{
                    this.showDesignEditor = true
                })
        },
        onSubmit(e){
            e.preventDefault()
            if(this.isCreating){
                this.create()
            }else{
                this.update()
            }
        }
    }
}
</script>

<style lang="scss">
.lense-form{
    display: block;
    margin: 0 auto;
    width: 80%;
    max-width: 800px;
}
</style>