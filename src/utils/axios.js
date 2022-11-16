import a from 'axios';
import verifyJwt from './verifyJwt';

const BASE_URL = 'http://localhost:4000/api';

const axiosNormal = a.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const axios = a.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tk');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.baseURL = BASE_URL;
    config.withCredentials = true;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (
      (error?.response?.status === 401 && !prevRequest.sent) ||
      !verifyJwt(localStorage.getItem('tk'))
    ) {
      prevRequest.sent = true;
      try {
        const { data } = await axiosNormal.post(`${BASE_URL}/auth/refresh-token`);
        prevRequest.headers['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('tk', data.token);

        return axios(prevRequest);
      } catch (e) {
        if (e.response.data.error.status === 401) window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
