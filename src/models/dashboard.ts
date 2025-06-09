import { getData, updateEarningsAPI } from '@/services/Dashboard';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [paramsData, setParamsData] = useState({
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});

	const fetchDataDashboard = async () => {
		setIsLoading(true);
		try {
			const res = await getData(paramsData);
			setData(res.data);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const updateEarnings = async () => {
		try {
			await updateEarningsAPI();
			console.log('Đã cập nhật earnings thành công');
		} catch (error) {
			console.error('Lỗi khi cập nhật earnings:', error);
		}
	};

	return {
		data,
		isLoading,
		paramsData,
		setParamsData,
		fetchDataDashboard,
		updateEarnings,
	};
};
