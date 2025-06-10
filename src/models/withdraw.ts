import { getUserInfo } from '@/services/base/api';
import { getWithdraw, withdraw } from '@/services/Withdraw';
import { message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Withdraw.WithdrawItem[]>([]);
	const [withdrawLoading, setWithdrawLoading] = useState(false);
	const { initialState, refresh } = useModel('@@initialState');

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getWithdraw();
			setData(response.data.data);
		} catch (error) {
			message.error('Không thể tải lịch sử rút tiền');
		}
		setLoading(false);
	};

	const handleWithdraw = async () => {
		const currentBalance = Number(initialState?.currentUser?.balance || 0);
		if (currentBalance <= 0) {
			message.error('Số dư không đủ để rút tiền');
			return;
		}

		setWithdrawLoading(true);
		try {
			await withdraw();
			message.success('Yêu cầu rút tiền đã được gửi thành công');
			await getUserInfo();
			await refresh();
			await fetchData();
		} catch (error) {
			message.error('Không thể gửi yêu cầu rút tiền');
		}
		setWithdrawLoading(false);
	};

	return {
		loading,
		setLoading,
		data,
		setData,
		withdrawLoading,
		setWithdrawLoading,

		handleWithdraw,
		fetchData,
	};
};
