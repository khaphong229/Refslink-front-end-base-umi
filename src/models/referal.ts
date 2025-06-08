import { getUserRefered } from '@/services/Referal';
import { ipClient } from '@/utils/ip';
import { message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
	const { initialState }: any = useModel('@@initialState');
	const [loading, setLoading] = useState(false);
	const [referralData, setReferralData] = useState<Referal.ReferralData[]>([]);
	const referralLink = `${ipClient}/user/register?ref=${initialState?.currentUser?.ref_code}`;

	const fetchReferralData = async () => {
		try {
			setLoading(true);
			const response = await getUserRefered();
			if (response.status === 200 && response.success) {
				setReferralData(response.data);
			} else {
				message.error(response.message || 'Không thể lấy dữ liệu giới thiệu');
			}
		} catch (error) {
			message.error('Có lỗi xảy ra khi lấy dữ liệu giới thiệu');
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(referralLink);
			message.success('Đã sao chép link giới thiệu!');
		} catch (err) {
			message.error('Không thể sao chép liên kết');
		}
	};

	return {
		loading,
		referralData,
		referralLink,

		fetchReferralData,
		copyToClipboard,
	};
};
