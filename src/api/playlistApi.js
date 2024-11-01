import axios from 'axios';

export async function getPlaylists () {
  return axios.get('/api/playlists');
}

export async function addPlaylist(playlistData){
  return axios.post('/api/playlists', playlistData);
}

export async function deletePlaylist(playlistId){
  return axios.delete(`/api/playlists/${playlistId}`);
}