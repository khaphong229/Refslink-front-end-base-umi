import useInitModel from '@/hooks/useInitModel';

export interface SettingRecord {
	_id: string;
	name: string;
	value: string;
	description: string;
	is_public: boolean;
	createdAt: string;
	updatedAt: string;
}

export default () => {
	const objInit = useInitModel<SettingRecord>('admin/settings');

	return {
		...objInit,
	};
};
