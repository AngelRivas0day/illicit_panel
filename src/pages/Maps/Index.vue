<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el pin?"
            md-content="Al eliminar este pin no podrá ser recuperado posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel('pin')"
            @md-confirm="onAccept(deletePin)"
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
                    <template>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <md-card class="map-card">
                                <md-card-media>
                                    <gmap-map
                                        class="map"
                                        :center="center"
                                        :zoom="15"
                                        :options="mapStyle"
                                        style="width:100%;  height: 200px;"
                                    >
                                        <gmap-marker
                                            :position="localPin.marker"
                                            @click="center = localPin.marker"
                                        ></gmap-marker>
                                    </gmap-map>
                                </md-card-media>

                                <md-card-header class="map-card-header">
                                    <div class="md-title">{{ localPin.streetName }}</div>
                                    <div class="md-subhead">#{{ localPin.extNumber }}</div>
                                </md-card-header>

                                <md-card-expand>
                                    <md-card-actions class="map-card-actions" md-alignment="space-between">
                                    <div>
                                        <md-button :to="localPin.link" class="md-primary">Google maps</md-button>
                                        <md-button>Eliminar</md-button>
                                    </div>
                                    <md-card-expand-trigger>
                                        <md-button class="md-icon-button no-outline">
                                            <md-icon>keyboard_arrow_down</md-icon>
                                        </md-button>
                                    </md-card-expand-trigger>
                                    </md-card-actions>

                                    <md-card-expand-content>
                                        <md-card-content>
                                            {{ localPin.description }}
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
    data: () => ({
         localPin: {
            name: 'Av Salto del Agua 2415',
            streetName: 'Av Salto del Agua',
            extNumber: '2415',
            description: 'test',
            link: 'https://maps.google.com/?q=Av+Salto+del+Agua+2415,+Jardines+del+Country,+44210+Guadalajara,+Jal.,+Mexico&ftid=0x8428ae2d45c66f8b:0x6546bd02a77a7600',
            marker: {
                lat: 20.7098146,
                lng: -103.3692752
            }
        }
    }),
    methods: {
        ...mapActions('pins',{
            getData: 'getPins',
            delete: 'deletePin'
        }),
        deletePin(){
            this.delete(this.itemToDelete.id)
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