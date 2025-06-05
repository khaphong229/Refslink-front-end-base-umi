import axios from '@/utils/axios';
import { ipRoot } from '@/utils/ip';

export const getMassShrinker = async (urlList: string[]) => {
	const response = await axios.post(`${ipRoot}/st/bulk`, { urls: urlList });
	return response.data;
};
