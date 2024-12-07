import axios from 'axios';

export function getAlbums() {
    const config = {
        method: 'get',
        url: '/api/songlists/getAlbums',
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

export function getAlbum(id) {
    const config = {
        method: 'get',
        url: '/api/songlists/getSonglist/' + id,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

export function getAlbumSongs(id) {
    const config = {
        method: 'get',
        url: '/api/songs/getSong/' + id,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

export function createAlbum(data) {
    const config = {
        method: 'post',
        url: '/api/songlists/createAlbum',
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
        data: data
    };

    return axios(config);
}

export function addSongToAlbum(songListId, songId){
    const config = {
        method: 'post',
        url: '/api/songlists/addSong/' + songListId + '/' + songId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

export function deleteAlbum(id) {
    const config = {
        method: 'delete',
        url: '/api/songlists/delete/' + id,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}