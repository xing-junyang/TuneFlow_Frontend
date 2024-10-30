import axios from 'axios';

export const getSongDetails = async (songId: string) => {
  return axios.get(`/api/songs/${songId}`);
};

export const getComments = async (songId: string) => {
  return axios.get(`/api/songs/${songId}/comments`);
};

export const addComment = async (songId: string, commentData: object) => {
  return axios.post(`/api/songs/${songId}/comments`, commentData);
};