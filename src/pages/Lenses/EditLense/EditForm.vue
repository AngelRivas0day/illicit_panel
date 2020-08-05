<template>
    <div class="lense-form">
        <form @submit="lenseSubmit" class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Producto</label>
                    <md-input :disabled="lenseCreationStatus" v-model="form.name"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <span class="md-prefix">$</span>
                    <label>Precio</label>
                    <md-input :disabled="lenseCreationStatus" v-model="form.price"></md-input>
                </md-field>
            </div>
            <div class="col-12">
                <md-field>
                    <label>Desctipci&oacute;n</label>
                    <md-textarea :disabled="lenseCreationStatus" v-model="form.description" md-autogrow md-counter="200"></md-textarea>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Categorias</label>
                    <md-select :disabled="lenseCreationStatus" v-model="form.categories" multiple>
                        <md-option value="fight-club">Fight Club</md-option>
                        <md-option value="godfather">Godfather</md-option>
                        <md-option value="godfather-ii">Godfather II</md-option>
                        <md-option value="godfather-iii">Godfather III</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Marcas</label>
                    <md-select :disabled="lenseCreationStatus" v-model="form.brands" multiple>
                        <md-option value="fight-club">Fight Club</md-option>
                        <md-option value="godfather">Godfather</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="col-12 text-right">
                <md-button type="submit" :disabled="lenseCreationStatus" class="md-dense md-raised md-primary">Crear lente</md-button>
            </div>
        </form>
        <div v-show="lenseCreationStatus" class="lense-forn__styles mt-4">
            <StyleEditor />
        </div>
    </div>
</template>

<script>
import StyleEditor from './StyleEditor'

export default {
    name: 'EditForm',
    components: {StyleEditor},
    data: ()=>({
        form: {
            name: '',
            description: '',
            price: 0,
            categories: [],
            brands: []
        },
        lenseCreationStatus: false,
    }),
    methods: {
        lenseSubmit(){
            this.$notify({verticalAlign: 'top', horizontalAlign: 'right', message: 'Lente creado con éxito', type: 'success'});
            this.lenseCreationStatus = true;
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