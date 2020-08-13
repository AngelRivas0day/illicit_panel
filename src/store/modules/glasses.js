// store/modules/editor.js
import * as api from '@/api/glasses'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        success: false,
        isLoading: false,
        glass: {},
        designs: [],
        glasses: [],
        start: 0,
        limit: 10
    },
    mutations: {
      SET_GLASS(state, payload) {
        state.success = true
        state.glass = payload
        state.designs = payload.designs
      },
      SET_LOADING(state, payload){
        state.isLoading = payload
      },
      SET_ERROR(state, payload){
          state.success = payload
      },
      SET_GLASSES(state, payload){
          state.glasses = [...payload]
          state.start = payload.length - 1
          state.end = payload.length + 10
      },
      SET_CREATED(state, payload){
          state.glass['id'] = payload
      }
    },
    actions: {
        getGlasses({commit, state}){
            return new Promise((resolve, reject)=>{
                commit('loading/TOGGLE_LOADING', null, {root:true})
                api.getGlasses(state.start, state.limit)
                    .then(resp=>{
                        console.log(resp)
                        commit('SET_GLASSES', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('loading/TOGGLE_LOADING', null, {root:true})
                    })
            })
        },
        getGlass({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('loading/TOGGLE_LOADING', null, {root:true})
                commit('SET_LOADING', true)
                api.getGlass(id)
                    .then(resp=>{
                        console.log(resp.data)
                        commit('SET_GLASS', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                        commit('loading/TOGGLE_LOADING', null, {root:true})
                    })
            })
        },
        updateGlass({commit, state}, updatedGlass){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.updateGlass(state.glass.id, updatedGlass)
                    .then(resp=>{
                        console.log(resp)
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        console.log(err.message)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                        store.dispatch('glasses/getGlass', state.glass.id, {root:true})
                    })
            })
        },
        createGlass({commit}, glass){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.createGlass(glass)
                    .then(resp=>{
                        resolve(resp)
                        commit('SET_CREATED', resp.data)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        deleteGlass({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.deleteGlass(id)
                    .then(resp=>{
                        resolve(resp)
                        this.$notify({
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            message: 'El lente ha sido eliminado con éxito',
                            type: 'success'
                        });
                    })
                    .catch(err=>{
                        reject(err)
                        this.$notify({
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            message: 'El lente no ha sido eliminado debido a un error',
                            type: 'warning'
                        });
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        deleteGlassDesign({commit, state},{name}){
            console.log("Vuex name: ", name)
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.deleteGlassDesign(state.glass.id , name)
                    .then(resp=>{
                        resolve(resp)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                        store.dispatch('glasses/getGlass', state.glass.id, {root:true})
                    })
            })
        },
        createGlassDesign({commit, state}, data){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.createGlassDesign(state.glass.id, data)
                .then(resp=>{
                    console.log(resp)
                })
                .catch(err=>{
                    console.log(err)
                })
                .finally(()=>{
                    commit('SET_LOADING', false)
                    store.dispatch('glasses/getGlass', state.glass.id, {root:true})
                })
            })
        }
    }
  }
  