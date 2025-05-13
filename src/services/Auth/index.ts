import axios from "axios"


const API_URL = 'http://localhost:3111/auth/register'

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const Register = async (data: RegisterPayload) => {
  return await axios.post(API_URL,data);
};
