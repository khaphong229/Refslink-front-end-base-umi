import axios from '@/utils/axios';
const API_URL = 'http://localhost:3111';

export const getLinks = async () => {
	const response = await axios.get(`${API_URL}/shorten_link`);
	return response?.data;
};

export const createShortLink = async (values) => {
	const response = await axios.post(`${API_URL}/shorten-link`, values);
	console.log(response.data);

	return response?.data;
};
