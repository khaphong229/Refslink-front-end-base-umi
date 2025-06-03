import { getApiToken } from '@/services/APIToken';
import { useState } from 'react';

export default () => {
	const [apiToken, setApiToken] = useState<string>();

	const getToken = async () => {
		const res = await getApiToken();

		if (res?.token) {
			localStorage.setItem('apiToken', res.token);
			setApiToken(res.token);
		}
	};

	return {
		apiToken,
		getToken,
	};
};
