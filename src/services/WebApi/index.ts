import { CLIENT } from '@/constants/router_api';

import axios from 'axios';

export const changeStatus = async (id, status) => {
	const res = await axios.put(`${CLIENT.API_WEB}/change-status/${id}`, { status });
	return res?.data;
};
