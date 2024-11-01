import axios from 'axios';

export async function login(credentials){
  return axios.post('/api/users/login', credentials);
}

export async function getUserInfo(){
  return axios.get('/api/users/me');
}