import { getSettingByKey, putSetting } from '@/services/base/api';
import type { ESettingKey } from '@/services/base/constant';
import type { ISetting } from '@/services/base/typing';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [formSubmiting, setFormSubmiting] = useState<boolean>(false);
	const [settings, setSettings] = useState<Partial<Record<ESettingKey, any>>>({});

	const getByKeyModel = async (key: ESettingKey, ip?: string): Promise<any> => {
		setLoading(true);
		try {
			const res = await getSettingByKey(key, ip);
			const temp = Object.assign(settings, { [key]: res.data?.data });
			setSettings(temp);

			return res.data?.data;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			setLoading(false);
		}
	};

	const updateSettingModel = async (data: ISetting, ip?: string): Promise<ISetting> => {
		if (formSubmiting) return Promise.reject('Form submiting');
		setFormSubmiting(true);

		try {
			const res = await putSetting(data, ip);
			const temp = Object.assign(settings, { [data.key]: data.value });
			setSettings(temp);
			message.success('Cập nhật thành công');

			return res.data?.data;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			setFormSubmiting(false);
		}
	};

	return {
		loading,
		setLoading,
		formSubmiting,
		setFormSubmiting,
		settings,
		setSettings,
		getByKeyModel,
		updateSettingModel,
	};
};
