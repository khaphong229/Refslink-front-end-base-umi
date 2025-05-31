import { getData } from '@/services/Dashboard';
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

	return {
		data,
		isLoading,
		paramsData,
		setParamsData,
		fetchDataDashboard,
	};
};
