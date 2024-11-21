import axiosInstance from "./instance"

export const login = async(id: string, password: string)=>{
    const response = await axiosInstance.post(`/auth/login`, {id: id, password: password});
    return response;
}