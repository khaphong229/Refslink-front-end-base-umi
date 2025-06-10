import axios from "axios";
import { CLIENT } from "@/constants/router_api";
import { ipRoot } from "@/utils/ip";

export const changePassword = async (data: { password: string; new_password: string }) => {
    const res = await axios.post(`${CLIENT}/auth/change-password`, data);
    return res?.data;}


export const updateProfile = async (data:any) => {
    const res = await axios.put(`${ipRoot}/auth/me`, data);
    console.log('updateProfile', res);
    return res?.data;
}

export const getProfile = async () =>{
    const res = await axios.get(`${ipRoot}/auth/me`);
    console.log('getProfile', res);
    return res?.data;
}