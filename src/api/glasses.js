import { get, post, patch, delete as axiosDelete } from 'axios'

const base_url = 'http://localhost:3000/'
const resource = 'glasses'
const request_url = `${base_url}${resource}`

function getGlasses(start, limit, searchPattern = null){
    const config = {
        params: {
            start,
            limit,
            searchPattern
        }
    }
    return get(request_url, config)
}

function createGlass(glass){
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
        }
    }
    return post(request_url, glass, config)
}

function updateGlass(id, glass){
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
        }
    }
    return patch(`${request_url}/${id}`, glass, config)
}

function deleteGlass(id){
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }
    return axiosDelete(`${request_url}/${id}`, config)
}

function getGlass(id){
    return get(`${request_url}/${id}`)
}

function createGlassDesign(id,design){
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }
    return post(`${request_url}/${id}/designs`, design, config)
}

function deleteGlassDesign(glassId, designName){
    const config = {
        headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }
    return axiosDelete(`${request_url}/${glassId}/designs/${designName}`, config)
}

export {
    createGlass,
    getGlasses,
    getGlass,
    createGlassDesign,
    updateGlass,
    deleteGlass,
    deleteGlassDesign
}