import axios from '@/utils/axios';
import { ipRoot } from '@/utils/ip';

export const getApiToken = async () => {
	const response = await axios.get(`${ipRoot}/api-token`);
	return response.data;
};
