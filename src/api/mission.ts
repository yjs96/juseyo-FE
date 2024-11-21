import axiosInstance from './instance';

export const getProgressMission = async () => {
  const response = await axiosInstance.get(`/mission/progress-list`);
  return response.data;
};

export const getCompleteMission = async () => {
  const response = await axiosInstance.get(`/mission/complete-list`);
  return response.data;
};

export const getFailMission = async () => {
  const response = await axiosInstance.get(`/mission/fail-list`);
  return response.data;
};

export const getRequestMission = async () => {
  const response = await axiosInstance.get(`/request-mission/all-list`);
  return response.data;
};
