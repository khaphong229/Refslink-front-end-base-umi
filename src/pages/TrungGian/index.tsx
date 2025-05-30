import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Button, Progress, Typography } from 'antd';
import './style.less';
import SnowBackground from '@/components/SnowFall';
import { useParams } from 'react-router';
import { goLink, goLinkValid } from '@/services/ManagementLink';
import { primaryColor } from '@/services/base/constant';

const TrungGianPage: React.FC = () => {
	const [countdown, setCountdown] = useState(5);
	const [isCounting, setIsCounting] = useState(true);
	const [resultGoLink, setResulGoLink] = useState(null);
	const isFirstRender = useRef(true);

	const { Title } = Typography;
	const { id } = useParams();

	const fetchGoLink = async () => {
		const data = await goLink({ alias: id });
		setResulGoLink(data);
	};

	useEffect(() => {
		if (countdown > 0 && isCounting) {
			const timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
			return () => clearTimeout(timer);
		} else if (countdown === 0) {
			setIsCounting(false);
		}
	}, [countdown, isCounting]);

	useEffect(() => {
		if (isFirstRender.current) {
			fetchGoLink();
			isFirstRender.current = false;
		}
	}, []);

	const openLink = async () => {
		await goLinkValid({ alias: id });
		if (resultGoLink?.data?.link) {
			window.location.href = resultGoLink?.data?.link;
		}
	};

	return (
		<>
			<SnowBackground />
			<Header />
			<div className='countdown-container'>
				<div
					className='description'
					style={{ textAlign: 'center' }}
					dangerouslySetInnerHTML={{ __html: resultGoLink?.data?.description || '' }}
				/>
				<Title level={4} style={{ textAlign: 'center', padding: '10px 0' }}>
					Bạn cần vượt những trang web sau để đến liên kết đích{' '}
					<span style={{ color: primaryColor }}>{resultGoLink?.data?.name}</span>
				</Title>
				<Progress status='exception' type='circle' percent={countdown * 20} format={() => countdown} width={120} />
				<Button type='primary' disabled={isCounting} onClick={openLink} className='get-link-button'>
					{isCounting ? 'Xin chờ trong giây lát' : 'Get Link - Nhấn để vượt link'}
				</Button>
			</div>
		</>
	);
};

export default TrungGianPage;
