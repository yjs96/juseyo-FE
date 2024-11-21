import axiosInstance from './instance';

export const login = async (id: string, password: string) => {
  // console.log(id, password);
  const response = await axiosInstance.post(`/auth/login`, {
    id: id,
    password: password
  });
  return response.data;
};
