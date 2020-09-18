import { login as userLogin, register, AdminLogout } from '@/api/oauth'

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
        return new Promise((resolve, reject)=>{
            register(user)
                .then(resp=>{
                    // const token = resp.data.token
                    // const user = resp.data.name
                    // localStorage.setItem('token',token)
                    // commit('AUTH_SUCCESS', token, user)
                    // resolve(resp)
                })
                .catch(err=>{
                    commit('AUTH_ERROR')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    async logout({commit}, token){
        return new Promise((resolve, reject)=>{
            AdminLogout(token)
                .then(resp=>{
                    localStorage.removeItem('token')
                    commit('LOGOUT')
                    resolve(resp)
                })
                .catch(err=>{
                    commit('AUTH_ERROR')
                    reject(err)
                })
        })
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
