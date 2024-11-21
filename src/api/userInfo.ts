import axiosInstance from './instance';

export const getUserInfo = async () => {
  const response = await axiosInstance.get('/users/me');
  const data = response.data;
  return data;
};

export const getPoint = async () => {
  const response = await axiosInstance.get('/mypage/point');
  const data = response.data.totalPoints;
  return data;
};
