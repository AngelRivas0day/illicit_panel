import * as api from '@/api/api'

const state = {
    pins: [],
    pin: {},
    error: null,
    isLoading: false
}

const mutations = {
    SET_PINS(state, payload){
        state.pins = payload
    },
    SET_PIN(state, payload){
        state.pin = payload
    },
    SET_LOADING(state, payload){
        state.isLoading = payload
    },
    SET_ERROR(state, payload){
        state.error = payload
    }
}

const actions = {
    async getPins({commit}){
        try {
            commit('SET_LOADING', true)
            const { data } = await  api.getAll('pins')
            commit('SET_PINS', data)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async getPin({commit}, pinId){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getOne('pins', pinId)
            commit('SET_PIN', data)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async createPin({commit}, newPin){
        try {
            commit('SET_LOADING', true)
            await  api.post_('pins', newPin, true)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async deletePin({commit, dispatch}, pinId){
        try {
            commit('SET_LOADING', true)
            await api.delete_('pins', pinId, true)
        } catch (error) {
            commit('SET_ERROR', error)
        } finally {
            dispatch('pins/getPins', null, {root:true})
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