<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el pin?"
            md-content="Al eliminar este pin no podrá ser recuperado posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel('pin')"
            @md-confirm="onAccept(onDelete)"
        ></md-dialog-confirm>
        <div class="maps card">
            <div class="card-header">
                <h1 class="title">Ubicaciones</h1>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 mb-4">
                        <md-button @click="goTo('Map')" class="md-dense md-primary md-raised">
                            <i class="tim-icons icon-simple-add"></i>
                            Agregar pin
                        </md-button>
                    </div>
                    <template v-if="pins">
                        <div v-for="pin in pins" :key="pin.id" class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <md-card class="map-card">
                                <md-card-media>
                                    <gmap-map
                                        class="map"
                                        :center="pin.marker"
                                        :zoom="15"
                                        :options="mapStyle"
                                        style="width:100%;  height: 200px;"
                                    >
                                        <gmap-marker
                                            :position="pin.marker"
                                            @click="center = pin.marker"
                                        ></gmap-marker>
                                    </gmap-map>
                                </md-card-media>

                                <md-card-header class="map-card-header">
                                    <div class="md-title">{{ pin.street }}</div>
                                    <div class="md-subhead">#{{ pin.extNumber }}</div>
                                </md-card-header>

                                <md-card-expand>
                                    <md-card-actions class="map-card-actions" md-alignment="space-between">
                                    <div>
                                        <a target="_blank" :href="pin.link" class="md-button md-dense md-raised md-primary">Google maps</a>
                                        <md-button @click="attemptDelete(pin)">Eliminar</md-button>
                                    </div>
                                    <md-card-expand-trigger>
                                        <md-button class="md-icon-button no-outline">
                                            <md-icon>keyboard_arrow_down</md-icon>
                                        </md-button>
                                    </md-card-expand-trigger>
                                    </md-card-actions>

                                    <md-card-expand-content>
                                        <md-card-content>
                                            {{ pin.description }}
                                        </md-card-content>
                                    </md-card-expand-content>
                                </md-card-expand>
                            </md-card>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import goTo from '@/mixins/goTo'
import attemptDelete from '@/mixins/attemptDelete'
import { mapState, mapActions } from 'vuex'
import mapsConfig from '@/mixins/mapsConfig'

export default {
    name: 'Maps',
    mixins: [goTo, attemptDelete, mapsConfig],
    computed: {
        ...mapState('pins',{
            pins: 'pins',
            isLoading: 'isLoading'
        })
    },
    async mounted(){
        try {
            await this.getPins()
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        ...mapActions('pins',{
            getPins: 'getPins',
            deletePin: 'deletePin'
        }),
        async onDelete(){
            try {
                await this.deletePin(this.itemToDelete.id)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El pin ha sido eliminado con éxito',
                    type: 'success'
                });
            } catch (error) {
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El pin no ha sido eliminado debido a un error',
                    type: 'warning'
                });
            }
           
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';
.map-card{
    border-radius: 9px;
    overflow: hidden;
    background-color: #333;
    &-actions{
        background-color: #333 !important;
    }
    &-image{
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
}
</style>