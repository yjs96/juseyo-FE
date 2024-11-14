import axios from 'axios';

const axiosInstance = axios.create({
  // 나중에 우리 서비스 백엔드 api 주소 + env로 뺼 예정
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
