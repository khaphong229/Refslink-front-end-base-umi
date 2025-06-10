import { ipRoot } from '@/utils/ip';
import axios from 'axios';

export const withdraw = async () => {
	const res = await axios.post(`${ipRoot}/withdraw`);
	return res?.data;
};

export const getWithdraw = async () => {
	const res = await axios.get(`${ipRoot}/withdraw`);
	return res?.data;
};

export const updateStatusWithdraw = async (id: string, status: string) => {
	const res = await axios.patch(`${ipRoot}/admin/withdraw/${id}/status`, { status });
	return res?.data;
}
