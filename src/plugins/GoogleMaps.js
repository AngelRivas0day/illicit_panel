import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps-withscopedautocomp";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBegSzhiDJwn6LaRS7vBZQc4uZCMRLlrNM",
    libraries: "places", // necessary for places input
    v: 3.38
  }
});