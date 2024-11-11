import axios from 'axios';

export function getSongDetails(songId) {
    return axios.get(`/api/songs/${songId}`);
}

export function getComments(songId) {
    return axios.get(`/api/songs/${songId}/comments`);
}

export function addComment(songId, commentData) {
    return axios.post(`/api/songs/${songId}/comments`, commentData);
}