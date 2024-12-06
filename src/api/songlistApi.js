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