<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Preferences</md-dialog-title>
            <md-dialog-content>
                <OfferProductSelector @product-selected="setProduct" />
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="edit-form">
            <form @submit="onSubmit" class="row">
                <div class="col-12">
                    <md-datepicker v-model="offer.period.start">
                        <label>Fecha de inicio</label>
                    </md-datepicker>
                </div>
                <div v-show="offer.period.start" class="col-12">
                    <md-datepicker v-model="offer.period.end">
                        <label>Fecha de cierre</label>
                    </md-datepicker>
                </div>
                <div class="col-xs-12 col-sm-12" :class="{'col-md-6': product.name != ''}">
                    <md-field>
                        <label>Producto</label>
                        <md-input @click="showDialog = true" v-model="product.name"></md-input>
                    </md-field>
                </div>
                <div v-show="product.name != ''" class="col-xs-12 col-sm-12 col-md-6">
                    <md-field>
                        <span class="md-prefix">$</span>
                        <label>Precio</label>
                        <md-input v-model="product.price" disabled></md-input>
                    </md-field>
                </div>
                <div v-show="offer.productId" class="col-12">
                    <md-field>
                        <span class="md-prefix">$</span>
                        <label>Descuento</label>
                        <md-input type="number" v-model="offer.discount"></md-input>
                        <span class="md-helper-text">Aplicado sobre producto</span>
                    </md-field>
                </div>
                <div class="col-12 text-right">
                    <md-button type="submit" class="md-raised md-dense md-primary">Guardar</md-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import OfferProductSelector from './OfferProductSelector/Index'

export default {
    name: 'EditForm',
    props: {
        mode: {
            type: String,
            default: "edit", // "edit" | "create"
            validator: function(value){
                return ["edit","create"].indexOf(value) !== -1
            }
        }
    },
    components: {
        OfferProductSelector
    },
    computed: {
        ...mapFields('offers',{
            offer: 'offer'
        }),
        ...mapState('glasses',{
            glass: 'glass'
        })
    },
    async mounted(){
        if(this.mode == "create"){
            try {
                await this.getGlass(this.offer.productId)
                this.product = {
                    id: this.glass.id,
                    name: this.glass.name,
                    price: this.glass.price
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    data: () => ({
        product: {
            id: null,
            name: '',
            price: null
        },
        showDialog: false
    }),
    methods: {
        ...mapActions('offers',{
            createOffer: 'createOffer',
            updateOffer: 'updateOffer'
        }),
        ...mapActions('glasses',{
            getGlass: 'getGlass'
        }),
        onSubmit(e){
            e.preventDefault()
            if(this.mode == "edit"){
                this.onUpdate()
            }else if(this.mode == "create"){
                this.onCreate()
            }
        },
        async onUpdate(){
            try {
                await this.updateOffer({ offerId: this.$route.params.id, updatedOffer: this.offer })
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'La oferta ha sido actualizada con éxito',
                    type: 'success'
                });
            } catch (error) {
                console.log(error)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'La oferta no ha sido actualizada debido a un error',
                    type: 'warning'
                });
            }
        },
        async onCreate(){
            try {
                await this.createOffer(this.offer)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'La oferta ha sido creada con éxito',
                    type: 'success'
                });
            } catch (error) {
                console.log(error)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'La oferta no ha sido creada debido a un error',
                    type: 'warning'
                });
            }
        },
        setProduct(product){
            this.offer.productId = product.id
            this.product = {
                id: product.id,
                name: product.name,
                price: product.price
            }
            this.showDialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-form{
    max-width: 600px;
    margin: 0 auto;
}
</style>