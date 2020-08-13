<template>
    <div class="pin-form">
        <form @submit="onSubmit" class="row">
            <div class="col-xs-12 col-sm-12 col-md-6">
                <label>
                    <gmap-autocomplete
                    @place_changed="setPlace"
                    :options="{fields: ['geometry','address_components','name','url']}"
                    >
                        <template v-slot:input="slotProps">
                            <input placeholder="Test" ref="input" v-on:listeners="slotProps.listeners" v-on:attrs="slotProps.attrs" />
                        </template>
                    </gmap-autocomplete>
                    <button @click="addMarker">Add</button>
                </label>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="map-render">
                    <gmap-map
                        class="map"
                        :center="center"
                        :zoom="12"
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
        }
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
    // .map-render{
    //     height: 400px;
    //     width: 100%;
    //     .map{
    //         width: 100%;
    //         height: 100%;
    //     }
    // }
</style>