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
        start: 0,
        limit: 20
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
      }
    },
    actions: {
        getGlass({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getGlass(id)
                    .then(resp=>{
                        commit('SET_GLASS', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        updateGlass({commit, state}, glass){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.updateGlass(state.glass.id, glass)
                    .then(resp=>{
                        console.log(resp)
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        console.log(err)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                        store.dispatch('editor/getGlass', state.glass.id, {root:true})
                    })
            })
        },
        createGlass({commit}, glass){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.createGlass(glass)
                    .then(resp=>{
                        resolve(resp)
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
                    })
                    .catch(err=>{
                        reject(err)
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
                        store.dispatch('editor/getGlass', state.glass.id, {root:true})
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
                    store.dispatch('editor/getGlass', state.glass.id, {root:true})
                })
            })
        }
    }
  }
  