import axios from 'axios';

export const getPlaylists = async () => {
  return axios.get('/api/playlists');
};

export const addPlaylist = async (playlistData) => {
  return axios.post('/api/playlists', playlistData);
};

export const deletePlaylist = async (playlistId) => {
  return axios.delete(`/api/playlists/${playlistId}`);
};