// store/modules/loading.js

export default {
    namespaced: true,
    state: {
      isLoading: false
    },
    mutations: {
      SET_LOADING(state, payload) {
        state.isLoading = payload
      },
      TOGGLE_LOADING(state){
        state.isLoading = !state.isLoading
      }
    },
    actions: {
      isLoading({commit}){
        commit('SET_LOADING', true)
      },
      notLoading({commit}){
        commit('SET_LOADING', false)
      }
    }
  }
  