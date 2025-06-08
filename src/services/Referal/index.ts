import { ipRoot } from '@/utils/ip';
import axios from 'axios';

export const getUserRefered = async () => {
	const response = await axios.get(`${ipRoot}/referal/refered-users`);
	return response.data;
};
