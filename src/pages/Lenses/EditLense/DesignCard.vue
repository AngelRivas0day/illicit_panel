<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el diseño"
            md-content="Al eliminar este diseño con toda su información y fotografías, no podrás recuperarlas posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel"
            @md-confirm="deleteDesign"
        >
        </md-dialog-confirm>
        <div class="design-card row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Nombre del dise&ntilde;o</label>
                    <md-input disabled v-model="design.name"></md-input>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Nombre del color</label>
                    <md-input disabled v-model="design.color.colorName"></md-input>
                </md-field>
            </div>
            <div class="col-12">
                <div class="color-sample" :style="'background-color:' + design.color.hex + ';'" >
                    <span>{{ design.color.hex }}</span>
                </div>
            </div>
            <div v-for="url in design.images" :key="url" class="col-xs-12 col-sm-6 col-md-4 design-images">
                <img :src="url" alt="" />
            </div>
            <div class="col-12 text-right">
                <md-button @click="isDeleting = true" :disabled="isLoading" class="md-dense md-raised md-accent mx-0 mt-3">
                    Eliminar estilo
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import {mapState} from 'vuex'

export default {
    name: "DesignCard",
    props: {
        design: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState('editor',{
            isLoading: 'isLoading'
        })
    },
    data: ()=>({
        isDeleting: false,
    }),
    methods: {
        deleteDesign() {
            store.dispatch('editor/deleteGlassDesign', {name: this.design.name}, {root:true})
                .then(()=>{
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El diseño ha sido eliminado, con éxito',
                        type: 'success'
                    });
                })
                .catch(err=>{
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El diseño no ha sido eliminado debido a un error',
                        type: 'warning'
                    });
                })
        },
        onCancel(){
            this.isDeleting = false
            this.$notify({
                verticalAlign: 'top',
                horizontalAlign: 'right',
                message: 'El diseño no ha sido eliminado por acción del usuario',
                type: 'warning'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.design-card{
    .color-sample{
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        @media #{$break-medium}{
            margin-bottom: 20px;
        }
        span{
            color: white;
            font-weight: bold;
        }
    }
    .design-images{
        margin-bottom: 25px;
        @media #{$break-medium}{
            margin-bottom: 0px;
        }
        &:last-of-type{
            margin-bottom: 0px !important;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
