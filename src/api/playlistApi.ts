import axios from 'axios';

export const getPlaylists = async () => {
  return axios.get('/api/playlists');
};

export const addPlaylist = async (playlistData: object) => {
  return axios.post('/api/playlists', playlistData);
};

export const deletePlaylist = async (playlistId: string) => {
  return axios.delete(`/api/playlists/${playlistId}`);
};