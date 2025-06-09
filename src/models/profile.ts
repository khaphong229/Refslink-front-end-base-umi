import { getProfile as fetchProfile, updateProfile as sendUpdateProfile } from '@/services/User';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [profile, setProfile] = useState<any>({});

	const getProfile = async () => {
		const res = await fetchProfile();
		if (res) {
			setProfile(res.data);
		}
		return res.data;
	};

	const updateProfile = async (values: any) => {
		try {
			await sendUpdateProfile(values);
			message.success('Cập nhật hồ sơ thành công!');
			await getProfile(); // cập nhật lại local state sau khi cập nhật
		} catch (error) {
			console.error('Cập nhật thất bại! ', error);
			message.error('Cập nhật thất bại!');
		}
	};

	return {
		profile,
		getProfile,
		updateProfile,
	};
};
