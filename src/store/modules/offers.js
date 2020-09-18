import * as api from '@/api/api'
import { getField, updateField } from 'vuex-map-fields';

const state = {
    offers: null,
    offer: {
        period: {
            start: null,
            end: null
        },
        discount: null,
        productId: null
    },
    isLoading: false,
    error: null
}

const mutations = {
    updateField,
    SET_OFFERS(state, payload){
        state.offers = payload
    },
    SET_OFFER(state, payload){
        state.offer = payload
    },
    SET_ERROR(state, payload){
        state.error = payload
    },
    SET_LOADING(state, payload){
        state.isLoading = payload
    },
    RESET_DATA(state){
        state.offer = {
            period: {
                start: null,
                end: null
            },
            discount: null,
            productId: null
        }
    }
}

const actions = {
    async getOffers({commit}){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getAll('offers', true)
            commit('SET_OFFERS', data)
        } catch (error) {
            commit('SET_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async getOffer({commit}, offerId){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getOne('offers', offerId, true)
            commit('SET_OFFER', data)
        } catch (error) {
            commit('SET_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async createOffer({commit}, offerObject){
        try {
            commit('SET_LOADING', true)
            await api.post('offers', offerObject, true)
        } catch (error) {
            commit('SET_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async updateOffer({commit}, {offerId, updatedOffer}){
        try {
            commit('SET_LOADING', true)
            await api.patch('offers', offerId, updatedOffer, true)
        } catch (error) {
            commit('SET_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async deleteOffer({commit}, offerId){
        try {
            commit('SET_LOADING', true)
            await api.delete_('offers', offerId, true)
        } catch (error) {
            commit('SET_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    resetData({commit}){
        commit('RESET_DATA')
    }
}

const getters = {
    getField
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}