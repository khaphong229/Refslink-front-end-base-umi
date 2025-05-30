import { getApiToken } from '@/services/APIToken';
import { useState } from 'react';

export default () => {
	const [apiToken, setApiToken] = useState<string>();

	const getToken = async () => {
	const res = await getApiToken();

	if (res?.token) {
		localStorage.setItem('apiToken', res.token); // Lưu token vào localStorage
		setApiToken(res.token); // Cập nhật state
	}
};


	return {
		apiToken,
		getToken,
	};
};
