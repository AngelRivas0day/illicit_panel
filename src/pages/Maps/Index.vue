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
                                    <img class="map-card-image" src="https://70stma.co.uk/wp-content/uploads/map-placeholder.jpg" alt="Map">
                                </md-card-media>

                                <md-card-header class="map-card-header">
                                    <div class="md-title">Title goes here</div>
                                    <div class="md-subhead">Subtitle here</div>
                                </md-card-header>

                                <md-card-expand>
                                    <md-card-actions class="map-card-actions" md-alignment="space-between">
                                    <div>
                                        <md-button>Vista previa</md-button>
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
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
                                        </md-card-content>
                                    </md-card-expand-content>
                                </md-card-expand>
                            </md-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <md-card class="map-card">
                                <md-card-media>
                                    <img class="map-card-image" src="https://70stma.co.uk/wp-content/uploads/map-placeholder.jpg" alt="Map">
                                </md-card-media>

                                <md-card-header class="map-card-header">
                                    <div class="md-title">Title goes here</div>
                                    <div class="md-subhead">Subtitle here</div>
                                </md-card-header>

                                <md-card-expand>
                                    <md-card-actions class="map-card-actions" md-alignment="space-between">
                                    <div>
                                        <md-button>Vista previa</md-button>
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
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
                                        </md-card-content>
                                    </md-card-expand-content>
                                </md-card-expand>
                            </md-card>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <md-card class="map-card">
                                <md-card-media>
                                    <img class="map-card-image" src="https://70stma.co.uk/wp-content/uploads/map-placeholder.jpg" alt="Map">
                                </md-card-media>

                                <md-card-header class="map-card-header">
                                    <div class="md-title">Title goes here</div>
                                    <div class="md-subhead">Subtitle here</div>
                                </md-card-header>

                                <md-card-expand>
                                    <md-card-actions class="map-card-actions" md-alignment="space-between">
                                    <div>
                                        <md-button>Vista previa</md-button>
                                        <md-button @click="attemptDelete({id: 1, foo:'bar'})">Eliminar</md-button>
                                    </div>
                                    <md-card-expand-trigger>
                                        <md-button class="md-icon-button no-outline">
                                            <md-icon>keyboard_arrow_down</md-icon>
                                        </md-button>
                                    </md-card-expand-trigger>
                                    </md-card-actions>

                                    <md-card-expand-content>
                                        <md-card-content>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
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

export default {
    name: 'Maps',
    mixins: [goTo, attemptDelete],
    computed: {
        ...mapState('maps',{
            pins: 'pins',
            isLoading: 'isLoading'
        })
    },
    methods: {
        ...mapActions('maps',{
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