import * as api from '@/api/api'

export default {
    namespaced: true,
    state: {
        pins: [],
        pin: {},
        success: false,
        isLoading: false
    },
    mutations: {
        SET_PINS(state, payload){
            state.pins = payload
            state.success = true
        },
        SET_PIN(state, payload){
            state.pin = payload
            state.success = true
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_SUCCESS(state, payload){
            state.success = payload
        }
    },
    actions: {
        getPins({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('pins')
                    .then(resp=>{
                        commit('SET_PINS', resp.data)
                        commit('SET_SUCCESS', true)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_SUCCESS', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        getPin({commit}, pinId){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getOne('pins', pinId)
                    .then(resp=>{
                        commit('SET_PIN', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_SUCCESS', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        createPin({commit}, newPin){
            return new Promise((resolve, reject)=>{
                api.post_('pins', newPin)
                    .then(resp=>{
                        commit('SET_SUCCESS', true)
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('SET_SUCCESS', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        deletePin({commit}, pinId){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.delete_('pins', pinId)
                    .then(resp=>{
                        commit('SET_SUCCESS', true)
                        resolve()
                    })
                    .catch(err=>{
                        commit('SET_SUCCESS', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        }
    }
}