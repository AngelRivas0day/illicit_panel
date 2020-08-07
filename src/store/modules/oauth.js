// oauth.js
import { login, register, AdminLogout } from '@/api/oauth'
// Creamos el objeto con "Espacio de Nombres"
export default {
  namespaced: true,
  state: {
    isLoading: false,
    token: localStorage.getItem('token') || null,
    user: ''
  },
  mutations: {
    AUTH_REQUEST(state, payload){
        state.isLoading = payload
    },
    AUTH_SUCCESS(state, token, user){
        state.isLoading = false
        state.token = token
        state.user = user
    },
    AUTH_ERROR(state){
        state.isLoading = false
    },
    LOGOUT(state){
        state.isLoading = false
        state.token = null
    }
  },
  actions: {
    login({commit}, user){
        commit('AUTH_REQUEST', true)
        return new Promise((resolve, reject)=>{
            login(user)
                .then(resp=>{
                    console.log("Auth: ", resp)
                    const token = resp.data.token
                    const user = resp.data.name
                    localStorage.setItem('token',token)
                    commit('AUTH_SUCCESS', token, user)
                    resolve(resp)
                })
                .catch(err=>{
                    commit('AUTH_ERROR')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    register({commit}, user){
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
    logout({commit}, token){
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
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.isLoading,
  }
}
