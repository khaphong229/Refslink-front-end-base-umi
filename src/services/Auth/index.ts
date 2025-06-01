import { SuccessReponse } from '@/types/ResponseApi';
import { ipRoot } from '@/utils/ip';
import axios from 'axios';
import { ChangePasswordBody } from './typing';

export type LoginResponse = SuccessReponse<{
	access_token: string;
	expire_in: number;
	auth_type: string;
}>;

export type RegisterResponse = SuccessReponse<{
	name: string;
	email: string;
	password: string;
}>;

export interface RegisterBody {
	name: string;
	email: string;
	password: string;
}

export const clientRegister = async (payload: RegisterBody) => {
	const response = await axios.post(`${ipRoot}/auth/register`, payload);
	return response?.data;
};

export const clientLogin = async (payload: { email: string; password: string }): Promise<LoginResponse> => {
	const response = await axios.post<LoginResponse>(`${ipRoot}/auth/login`, { ...payload });
	return response?.data;
};

export async function adminlogin(payload: { email?: string; password?: string }) {
	const response = await axios.post(`${ipRoot}/admin/auth/login`, { ...payload });
	return response?.data;
}

export const changePassword = async (data: ChangePasswordBody) => {
	return axios.patch(`${ipRoot}/auth/change-password`, data);
};

export const googleLogin = async () => {
	const res = await axios.get(`${ipRoot}/auth/google`);
	return res.data;
};

export const googleCallback = async () => {
	const res = await axios.get(`${ipRoot}/auth/google/callback`);
	return res.data;
};

export const loginSuccess = async (id: string) => {
	const res = await axios.post(`${ipRoot}/auth/login-success`, { googleId: id });
	return res.data;
};
