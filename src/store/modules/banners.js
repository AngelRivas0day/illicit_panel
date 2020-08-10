// store/modules/editor.js
import * as api from '@/api/api'

export default {
    namespaced: true,
    state: {
        success: false,
        isLoading: false,
        banners: [],
        banner: {}
    },
    mutations: {
        SET_ITEMS(state, payload){
            state.success = true
            state.banners = payload
        },
        SET_ITEM(state, payload) {
            state.success = true
            state.banner = payload
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_ERROR(state, payload){
            state.success = payload
        }
    },
    actions: {
        getItems({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('banners')
                    .then(resp=>{
                        commit('SET_ITEMS', resp.data)
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
        getItem({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getOne('banners',id)
                    .then(resp=>{
                        commit('SET_ITEM', resp.data)
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
        createItem({commit}, item){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post_('banners',item)
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
        deleteItem({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.delete_('banners',id)
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
        }
    }
}
  