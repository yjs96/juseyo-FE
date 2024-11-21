import axiosInstance from "./instance"

interface requestMissionInterface {
    startDate: string,
    endDate: string,
    content: string,
    category: string|null,
    point: number|""
  }

export const postRequestMission = async(requestMissionData:requestMissionInterface)=>{
    const response = await axiosInstance.post('/request-mission/child/request', requestMissionData);
    return response;
}