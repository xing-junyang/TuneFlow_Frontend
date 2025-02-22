import axios from 'axios'

const request = axios.create({
    baseURL: 'http://113.44.139.10:8080',
    timeout: 30000
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default request 