import useInitModel from '@/hooks/useInitModel';

export default () => {
	const objInit = useInitModel<Support.Record>('admin/supports');

	return {
		...objInit,
	};
};
