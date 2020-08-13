<template>
    <div class="pin-form">
        <form @submit="onSubmit" class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <md-field>
                    <label>Nombre de la ubicaci&oacute;n</label>
                    <md-input v-model="localPin.name"></md-input>
                </md-field>
                <gmap-autocomplete
                    class="w-100"
                    @place_changed="setPlace"
                    :options="{fields: ['geometry','address_components','name','url']}"
                >
                        <template v-slot:input="slotProps">
                            <div :class="{'active':inputFocus}" class="form-group">
                                <label :class="{'active':inputFocus}">Direcci&oacute;n</label>
                                <input
                                ref="input"
                                class="w-100 map-input"
                                placeholder=""
                                v-on:listeners="slotProps.listeners"
                                v-on:attrs="slotProps.attrs"
                                @focus="inputFocus = true"
                                @blur="inputFocus = false"/>
                            </div>
                        </template>
                </gmap-autocomplete>
                <md-field>
                    <label>Textarea with Autogrow</label>
                    <md-textarea v-model="localPin.description" md-autogrow></md-textarea>
                </md-field>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="map-render">
                    <gmap-map
                        class="map"
                        :center="center"
                        :zoom="16"
                        :options="mapStyle"
                        style="width:100%;  height: 400px;"
                    >
                        <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            @click="center = m.position"
                        ></gmap-marker>
                    </gmap-map>
                </div>
            </div>
            <div class="col-12 text-right">
                <md-button class="md-dense md-primary md-raised" @click="addMarker">Guardar</md-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mapsConfig from '@/mixins/mapsConfig'

export default {
    name: 'EditForm',
    mixins: [mapsConfig],
    computed: {
        ...mapState('maps',{
            pin: 'pin'
        })
    },
    mounted(){
        this.geolocate()
    },
    data: () => ({
        localPin: {
            name: '',
            streetName: '',
            extNumber: '',
            description: '',
            link: '',
            marker: {
                lat: '',
                lon: ''
            }
        },
        inputFocus: false
    }),
    methods: {
        ...mapActions('maps',{
            create: 'createPin'
        }),
        onSubmit(e){
            e.preventDefault()
        },
        geolocate: function(){
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            });
        },
        setPlace(place) {
            this.currentPlace = place;
            if (this.currentPlace) {
                this.localPin = {
                    name: this.currentPlace.name,
                    streetName: this.currentPlace.address_components[1].short_name,
                    extNumber: this.currentPlace.address_components[0].long_name,
                    description: '',
                    link: this.currentPlace.url,
                    marker: {
                        lat: this.currentPlace.geometry.location.lat(),
                        lon: this.currentPlace.geometry.location.lng()
                    }
                }
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                };
                console.log("marker: ", marker)
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }

        },
        addMarker() {
            if (this.currentPlace) {
                this.localPin = {
                    name: this.currentPlace.name,
                    streetName: this.currentPlace.address_components[1].short_name,
                    extNumber: this.currentPlace.address_components[0].long_name,
                    description: '',
                    link: this.currentPlace.url,
                    marker: {
                        lat: this.currentPlace.geometry.location.lat(),
                        lon: this.currentPlace.geometry.location.lng()
                    }
                }
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                };
                console.log("marker: ", marker)
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.form-group{
    position: relative;
    label{
        transition: all .2s;
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75rem;
        color: #c5c6ca;
        font-weight: 500;
        &.active{
            top: -17px;
            transform: inherit;
            color: #448aff;
            // font-size: 8px;
        }
    }
    .map-input{
        position: relative;
        background: transparent;
        border: none;
        border-radius: 0%;
        border-bottom: 1px solid #c5c6ca;
        outline: transparent;
        color: white;
    }
    &:after{
            left: 50%;
            bottom: 0;
            content: '';
            position: absolute;
            transition: .2s;
            height: 2px;
            width: 0%;
            z-index: 999;
        }
    &.active{
        &:after{
            left: 0;
            width: 100%;
            background: #448aff;
        }
    }
}
</style>