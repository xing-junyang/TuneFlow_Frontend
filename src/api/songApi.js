import request from '@/utils/request'
// 请求拦截器添加token
request.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Token'] = `${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 创建歌单
export function createSongList(data) {
    return request({
        url: '/api/songlists/create',
        method: 'post',
        data
    })
}

// 获取用户歌单
export function getUserSongList() {
    return request({
        url: '/api/songlists/getSonglist',
        method: 'get'
    })
}

// 搜索歌单
export function searchSongList(name) {
    return request({
        url: '/api/songlists/search',
        method: 'get',
        params: { name }
    })
}

// 删除歌单
export function deleteSongList(songlistId) {
    return request({
        url: `/api/songlists/delete/${songlistId}`,
        method: 'delete'
    })
}

// 更新歌单
export function updateSongList(data) {
    return request({
        url: '/api/songlists/update',
        method: 'post',
        data
    })
}