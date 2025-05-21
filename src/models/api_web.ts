import useInitModel from '@/hooks/useInitModel';

export default () => {
	const objInit = useInitModel<WebApi.Record>('api-webs');
	console.log('objInit', objInit);
	return {
		...objInit,
	};
};
