import axiosInstance from './instance';

interface requestMissionInterface {
  endDate: string;
  content: string;
  category: string | null;
  point: number | '';
}

export const postRequestMission = async (
  requestMissionData: requestMissionInterface
) => {
  const response = await axiosInstance.post(
    '/request-mission/child/request',
    requestMissionData
  );
  return response;
};

export const getRequestMissionReject = async (id: number) => {
  const response = await axiosInstance.get(
    `/request-mission/parent/reject/${id}`
  );
  return response;
};

export const getRequestMissionApprove = async (id: number) => {
  const response = await axiosInstance.get(
    `/request-mission/parent/approve/${id}`
  );
  return response;
};

export const getProgressMissionFail = async (id: number) => {
  const response = await axiosInstance.get(`/mission/parent/fail/${id}`);
  return response;
};

export const getProgressMissionComplete = async (id: number) => {
  const response = await axiosInstance.get(`/mission/parent/complete/${id}`);
  return response;
};
