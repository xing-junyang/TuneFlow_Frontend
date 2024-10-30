import axios from 'axios';

export const getSongDetails = async (songId) => {
  return axios.get(`/api/songs/${songId}`);
};

export const getComments = async (songId) => {
  return axios.get(`/api/songs/${songId}/comments`);
};

export const addComment = async (songId, commentData) => {
  return axios.post(`/api/songs/${songId}/comments`, commentData);
};