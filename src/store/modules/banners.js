// store/modules/editor.js
import * as api from '@/api/api'

const state = {
    isLoading: false,
    banners: [],
    banner: {},
    error: null
}

const mutations = {
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
        state.error = payload
    }
}

const actions = {
    async getItems({commit}){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getAll('banners')
            commit('SET_ITEMS', data)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async getItem({commit}, id){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getOne('banners',id)
            commit('SET_ITEM', data)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async createItem({commit}, item){
        try {
            commit('SET_LOADING', true)
            await api.post_('banners',item)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async deleteItem({commit}, id){
        try {
            commit('SET_LOADING', true)
            await api.delete_('banners',id)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
  