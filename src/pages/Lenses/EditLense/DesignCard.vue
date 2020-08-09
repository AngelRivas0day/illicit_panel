<template>
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
            <md-button @click="deleteDesign" :disabled="isLoading" class="md-dense md-raised md-accent mx-0 mt-3">
                Eliminar estilo
            </md-button>
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
    methods: {
        deleteDesign() {
            console.log(this.design.name)
            store.dispatch('editor/deleteGlassDesign', {name: this.design.name}, {root:true})
                .then(resp=>{
                    console.log("Se elimino el disenio con exito: ", resp)
                })
                .catch(err=>{
                    console.log("Hubo un error", err)
                })
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
