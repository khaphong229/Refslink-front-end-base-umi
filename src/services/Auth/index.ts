import axios from "axios"


const API_URL = 'http://localhost:3111/auth'

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;

}

export interface LoginRequest{
  email: String,
  password: String

}

export interface LoginResponse {
  access_token: string;
  expire_in: number;
  auth_type: string;
}

export const loginApi = async(data:LoginRequest): Promise<LoginResponse> =>{
  const response = await axios.post<LoginResponse>(`${API_URL}/login`,data)
  return response.data
}
