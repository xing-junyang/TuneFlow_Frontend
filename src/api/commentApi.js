import axios from 'axios';

export function commentSong(songId, mark, content){
    const config = {
        method: 'post',
        url: '/api/comments/commentSong/' + songId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
        params: {
            mark: mark,
            content: content
        }
    };

    return axios(config);
}

export function commentSongList(songListId, mark, content){
    const config = {
        method: 'post',
        url: '/api/comments/commentSonglist/' + songListId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
        params: {
            mark: mark,
            content: content
        }
    };

    return axios(config);
}

export function getSongComments(songId){
    const config = {
        method: 'get',
        url: '/api/comments/getSongComments/' + songId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}

export function getSongListComments(songListId){
    const config = {
        method: 'get',
        url: '/api/comments/getPlaylistComments/' + songListId,
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        }
    };

    return axios(config);
}