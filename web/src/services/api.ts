import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.localhost:3333',
});

export default api;
