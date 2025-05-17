import useInitModel from '@/hooks/useInitModel';

export default () => {
	const objInit = useInitModel<WebApi.Record>('api-webs');

	return {
		...objInit,
	};
};
