import Vue from 'vue'
import Vuex from 'vuex'

// Importar oauth
import oauth from './modules/oauth'
import loading from './modules/loading'
import editor from './modules/editor'
import banners from './modules/banners'

Vue.use(Vuex)

export default new Vuex.Store({
  // Aquuí registramos todos los módulos
  modules: {
    oauth,
    loading,
    editor,
    banners
  }
})