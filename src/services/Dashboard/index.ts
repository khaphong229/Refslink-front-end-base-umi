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

export const updateEarningsAPI = async () => {
	const response = await axios.get(`${ipRoot}/auth/update-earnings`);
	return response;
};

export const getAllDashboardData = async () => {
	const response = await axios.get(`${ipRoot}/admin/statistic/dashboard/summary`);
	return response?.data;
}

export const getLinkStatistics = async () => {
	const response = await axios.get(`${ipRoot}/admin/statistic/shorten-links/by-date`);
	return response?.data;
}

export const getUserStatistics = async () => {
	const response = await axios.get(`${ipRoot}/admin/statistic/users/by-date`);
	return response?.data;
};