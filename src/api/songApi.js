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
        url: '/api/songlists/getUserSonglists',
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
        url: '/api/songlists/updateInformation',
        method: 'post',
        data
    })
}

// 创建歌曲
export function createSong(data) {
    return request({
        url: '/api/songs/create',
        method: 'post',
        data
    })
}

// 删除歌曲
export function deleteSong(songId) {
    return request({
        url: `/api/songs/delete/${songId}`,
        method: 'delete'
    })
}

// 获取歌曲
export function getSong(songId) {
    return request({
        url: `/api/songs/getSong/${songId}`,
        method: 'get'
    })
}

// 更新歌曲
export function updateSong(songId, data) {
    return request({
        url: `/api/songs/updateInformation/${songId}`,
        method: 'post',
        data
    })
}

// 添加歌曲到歌单
export function addSongToSongList(songListId, songId) {
    return request({
        url: `/api/songlists/addSong/${songListId}/${songId}`,
        method: 'post'
    })
}