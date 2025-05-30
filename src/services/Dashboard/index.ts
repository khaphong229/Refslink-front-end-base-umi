import { ipRoot } from '@/utils/ip';
import axios from 'axios';

export const getData = async (params) => {
	const { month, year } = params;
	const response = await axios.get(`${ipRoot}/dashboard`, {
		params: {
			month,
			year,
		},
	});
	return response?.data;
};
