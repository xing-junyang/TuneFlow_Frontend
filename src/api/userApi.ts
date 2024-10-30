import axios from 'axios';

export const login = async (credentials: { username: string, password: string }) => {
  return axios.post('/api/users/login', credentials);
};

export const getUserInfo = async () => {
  return axios.get('/api/users/me');
};