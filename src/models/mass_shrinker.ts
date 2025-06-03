import { getMassShrinker } from '@/services/MassShrinker';
import { message } from 'antd';
import { useState } from 'react';

interface ShortenLinkResponse {
	message: string;
	data: {
		_id: string;
		alias: string;
		shorten_link: string;
		created_at: string;
		updated_at: string;
	};
}

export default () => {
	const [urls, setUrls] = useState('');
	const [res, setRes] = useState<ShortenLinkResponse[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetch = async (urlList: string[]) => {
		setIsLoading(true);
		try {
			const response = await getMassShrinker(urlList);
			setRes(response.data);
			message.success('Rút gọn hàng loạt thành công.');
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		const urlList = urls
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line !== '');
		if (urlList.length > 20) {
			alert('Chỉ nhập tối đa 20 URL!');
			return;
		}

		await fetch(urlList);
	};

	return {
		urls,
		res,
		isLoading,

		setUrls,
		handleSubmit,
	};
};
