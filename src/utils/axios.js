import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://192.168.1.18:4000/api'
});

export default customAxios;
