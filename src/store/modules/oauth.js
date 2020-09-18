import { login as userLogin, register as userRegister, AdminLogout } from '@/api/oauth'

const state = {
    isLoading: false,
    token: localStorage.getItem('token') || null,
    user: '',
    error: null
}

const mutations = {
    AUTH_REQUEST(state, payload){
        state.isLoading = payload
    },
    AUTH_SUCCESS(state, token, user){
        state.isLoading = false
        state.token = token
        state.user = user
    },
    AUTH_ERROR(state, payload){
        state.isLoading = false
        state.error = payload
    },
    LOGOUT(state){
        state.isLoading = false
        state.token = null 
    }
}

const actions = {
    async login({commit}, user){
        try {
            commit('AUTH_REQUEST', true)
            const { data } = await userLogin(user)
            localStorage.setItem('token', data.token)
            commit('AUTH_SUCCESS', data.token, data.user)
            return
        } catch (error) {
            commit('AUTH_ERROR', error)
            localStorage.removeItem('token')
        }
    },
    async register({commit}, user){
        try {
            await userRegister(user)
        } catch (error) {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
        }
    },
    async logout({commit}, token){
        try {
            await AdminLogout(token)
            localStorage.removeItem('token')
            commit('LOGOUT')
        } catch (error) {
            commit('AUTH_ERROR')
        }
    }
}

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.isLoading,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
