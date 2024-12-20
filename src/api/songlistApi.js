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

export function getAlbumAllSongs(songlistid){
    const config = {
        method: 'get',
        url: '/api/songlists/getSongs/' + songlistid,
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

export function deleteSongFromAlbum(songListId, songId){
    const config = {
        method: 'post',
        url: '/api/songlists/deleteSong/' + songListId + '/' + songId,
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

export function updateAlbumInformation(data) {
    const config = {
        method: 'post',
        url: '/api/songlists/updateAlbumInformation',
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
        data: data
    };

    return axios(config);
}

export function searchSongList(name) {
    const config = {
        method: 'get',
        url: '/api/songlists/search',
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
        params: { keyword: name },
    };

    return axios(config);
}2