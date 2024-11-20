// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACK_BASE,
//   timeout: 10000,
//   headers: {
//     'ngrok-skip-browser-warning': 'any',
//   },
// });

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const kakaoToken = localStorage.getItem('accessToken');

    if (kakaoToken) {
      config.headers.Authorization = `Bearer ${kakaoToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
