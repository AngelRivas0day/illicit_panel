/* eslint-disable */
// store/modules/editor.js
import * as api from '@/api/glasses'
import { getField, updateField } from 'vuex-map-fields';

function slugfy(string){
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export default {
    namespaced: true,
    state: {
        success: false,
        isLoading: false,
        glass: {},
        designs: [],
        glasses: [],
        start: 0,
        limit: 10,
        searchPatter: '',
        error: null
    },
    getters: {
        getField
    },
    mutations: {
        updateField,
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
        async getGlasses({commit, state}){
            try {
                commit('SET_LOADING', true)
                const { data } = await api.getGlasses(state.start, state.limit, state.searchPatter)
                commit('SET_GLASSES', data)
            } catch (error) {
                console.log(error)
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async getGlass({commit}, id){
            try {
                commit('loading/TOGGLE_LOADING', null, {root:true})
                commit('SET_LOADING', true)
                const { data } = await api.getGlass(id)
                commit('SET_GLASS', data)
            } catch (error) {
                console.log(error)
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
                commit('loading/TOGGLE_LOADING', null, {root:true})
            }
        },
        async updateGlass({commit, state, dispatch}, updatedGlass){
            try {
                commit('SET_LOADING', true)
                updatedGlass['slug'] = slugfy(updatedGlass.name)
                await api.updateGlass(state.glass.id, updatedGlass)
            } catch (error) {
                 commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
                dispatch('glasses/getGlass', state.glass.id, {root:true})
            }
        },
        async createGlass({commit}, glass){
            try {
                glass['slug'] = slugfy(glass.name)
                commit('SET_LOADING', true)
                const { data } = await api.createGlass(glass)
                commit('SET_CREATED', data)
            } catch (error) {
                console.log(error)
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async deleteGlass({commit}, id){
            try {
                commit('SET_LOADING', true)
                await api.deleteGlass(id)
            } catch (error) {
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async deleteGlassDesign({commit, state, dispatch},{name}){
            try {
                commit('SET_LOADING', true)
                await api.deleteGlassDesign(state.glass.id , name)
            } catch (error) {
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
                dispatch('glasses/getGlass', state.glass.id, {root:true})
            }
        },
        async createGlassDesign({commit, state, dispatch}, data){
            try {
                commit('SET_LOADING', true)
                await api.createGlassDesign(state.glass.id, data)
            } catch (error) {
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
                dispatch('glasses/getGlass', state.glass.id, {root:true})
            }
        }
    }
  }
  