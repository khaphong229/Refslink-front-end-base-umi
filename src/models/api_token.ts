import useInitModel from '@/hooks/useInitModel';
import { ipRoot } from '@/utils/ip';
import { useEffect } from 'react';

export default () => {
	const objInit = useInitModel<ApiToken.Record>('api-token');
	console.log('objInit', objInit);

	return {
		...objInit,
	};
};
