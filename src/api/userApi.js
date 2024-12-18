import axios from 'axios';

export function login(phone, password) {
    const config = {
        method: 'post',
        url: '/api/users/login',
        params: {
            'phone': phone,
            'password': password
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(config);
}

export function getUserInfo() {
    const config = {
        method: 'get',
        url: '/api/users/getInformation',
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

// 用户注册
export function register(name, phone, password) {
    const data = JSON.stringify({
        "name": name,
        "phone": phone,
        "password": password,
    });

    const config = {
        method: 'post',
        url: '/api/users/register',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(config);
}

export function recordPlayHistory(songId){
    if(songId == null){
        return;
    }

    const config = {
        method: 'post',
        url: '/api/users/recordPlayHistory/' + songId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}