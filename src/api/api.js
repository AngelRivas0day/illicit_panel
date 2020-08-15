import * as Axios from 'axios'
const base_url = 'http://localhost:3000'

function setHeaders(contentType, token = null){
    let config = {}
    if(token){
        config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/${contentType}`
            }
        }
    }else{
        config = {
            headers: {
                'Content-Type': `application/${contentType}`
            }
        }
    }
    return config;
}

function getOne(endpoint, id, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.get(`${base_url}/${endpoint}/${id}`, config)
}

function getAll(endpoint, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.get(`${base_url}/${endpoint}`, config)
}

function patch(endpoint, id, data, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('x-www-url-formencoded', localStorage.getItem('token'))
    }else{
        config = setHeaders('x-www-url-formencoded')
    }
    return Axios.patch(`${base_url}/${endpoint}/${id}`, data, config)
}

function post(endpoint, data, isToken = false){
    var config;
    if(isToken == true){
        config = setHeaders('x-www-url-formencoded', localStorage.getItem('token'))
    }else{
        config = setHeaders('x-www-url-formencoded')
    }
    return Axios.post(`${base_url}/${endpoint}`, data, config)
}

function post_(endpoint, data, isToken = true){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.post(`${base_url}/${endpoint}`, data, config)
}

function delete_(endpoint, id, isToken = true){
    var config;
    if(isToken == true){
        config = setHeaders('json', localStorage.getItem('token'))
    }else{
        config = setHeaders('json')
    }
    return Axios.delete(`${base_url}/${endpoint}/${id}`, config)
}

export {
    getOne,
    getAll,
    patch,
    post,
    post_,
    delete_
}