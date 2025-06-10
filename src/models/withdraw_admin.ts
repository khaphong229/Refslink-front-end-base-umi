import useInitModel from '@/hooks/useInitModel';

export default () => {
	const objInit = useInitModel<Withdraw.WithdrawItem>('admin/withdraw');
	console.log('objInit', objInit);
	return {
		...objInit,
	};
};
