import Vue from 'vue'
import Vuex from 'vuex'

// Importar oauth
import oauth from './modules/oauth'
import loading from './modules/loading'
import glasses from './modules/glasses'
import banners from './modules/banners'
import pins from './modules/pins'

Vue.use(Vuex)

export default new Vuex.Store({
  // Aquuí registramos todos los módulos
  modules: {
    oauth,
    loading,
    glasses,
    banners,
    pins
  }
})