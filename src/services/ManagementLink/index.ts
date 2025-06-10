import axios from '@/utils/axios';
import { ipRoot } from '@/utils/ip';

export interface PaginationParams {
	page: number;
	limit: number;
	q?: string;
}

export const getLinks = async (params: PaginationParams) => {
	const { page, limit, q } = params;
	const response = await axios.get(`${ipRoot}/shorten-link`, {
		params: {
			page,
			limit,
			q,
		},
	});
	return response?.data;
};

export const createShortLink = async (values) => {
	const response = await axios.post(`${ipRoot}/shorten-link`, values);
	return response?.data;
};

export const deleteShortLinkById = async (id: string) => {
	const response = await axios.delete(`${ipRoot}/shorten-link/${id}`);
	return response;
};

export const goLink = async (body) => {
	const response = await axios.post(`${ipRoot}/shorten-link/go`, body);
	return response.data;
};

export const goLinkValid = async (body) => {
	const response = await axios.post(`${ipRoot}/shorten-link/go/link`, body);
	return response.data;
};
