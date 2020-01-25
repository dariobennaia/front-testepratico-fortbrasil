import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// request interceptor
api.interceptors.request.use(
  async config => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const requestConfig = error.config;
      window.location = '/login';
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export default api;
