import axios from 'axios';

export async function getSongDetails(songId){
  return axios.get(`/api/songs/${songId}`);
}

export async function getComments(songId){
  return axios.get(`/api/songs/${songId}/comments`);
}

export async function addComment(songId, commentData){
  return axios.post(`/api/songs/${songId}/comments`, commentData);
}