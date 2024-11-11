import axios from 'axios';

export function login(credentials) {
    return axios.post('/api/users/login', credentials);
}

export function getUserInfo() {
    return axios.get('/api/users/me');
}