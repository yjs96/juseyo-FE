import axiosInstance from "./instance"

export const getProgressMission = async()=>{
    const response = await axiosInstance.get(`/mission/progress-list`);
    return response;
}

export const getCompleteMission = async()=>{
    const response = await axiosInstance.get(`/mission/complete-list`);
    return response;
}

export const getFailMission = async()=>{
    const response = await axiosInstance.get(`/mission/fail-list`);
    return response;
}

export const getRequestMission = async()=>{
    const response = await axiosInstance.get(`/request-mission/all-list`);
    return response;
}