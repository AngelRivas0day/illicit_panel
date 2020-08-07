import { get, post } from 'axios'

const base_url = 'http://localhost:3000/'
const resource = 'admins'
const request_url = `${base_url}${resource}`

function login(user){
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    return post(`${request_url}/login`, user, config)
}

function register(user){
    const config = {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    return post(request_url, user, config)
}

function AdminLogout(token){
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    return get(`${request_url}/logout`, config)
}

export {login,register,AdminLogout}