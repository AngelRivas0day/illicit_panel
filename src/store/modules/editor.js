// store/modules/editor.js
import * as api from '@/api/glasses'

export default {
    namespaced: true,
    state: {
        success: false,
        isLoading: false,
        glass: {},
        designs: []
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
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        updateGlass({commit}, id, glass){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.updateGlass(id, glass)
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

        },
        deleteDesign({commit}, id){

        }
    }
  }
  