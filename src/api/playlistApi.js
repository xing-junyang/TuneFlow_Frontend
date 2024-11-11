import axios from 'axios';

export function getPlaylists() {
    return axios.get('/api/playlists');
}

export function addPlaylist(playlistData) {
    return axios.post('/api/playlists', playlistData);
}

export function deletePlaylist(playlistId) {
    return axios.delete(`/api/playlists/${playlistId}`);
}