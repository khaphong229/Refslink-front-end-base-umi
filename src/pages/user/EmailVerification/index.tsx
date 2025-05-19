import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Result, Spin, Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled, LoadingOutlined } from '@ant-design/icons';
import './style.less';
import { ipRoot } from '@/utils/ip';
import { ROUTER_CLIENT } from '@/constants/router';

function VerifyEmail() {
	const [status, setStatus] = useState('loading');
	const history = useHistory();
	const { token } = useParams();

	useEffect(() => {
		console.log(token, 'okee');

		if (token && token.length > 10) {
			axios
				.post(`${ipRoot}/auth/verify-account/${token}`)
				.then((response) => {
					setStatus('active');
					message.success('Xác minh thành công!');
				})
				.catch((error) => {
					setStatus('inactive');
					message.error('Liên kết xác minh đã hết hạn hoặc không hợp lệ.');
				});
		} else {
			setStatus('invalid');
			message.warning('Thiếu mã xác minh.');
		}
	}, [history]);

	const getContent = () => {
		switch (status) {
			case 'loading':
				return (
					<Result
						icon={<Spin indicator={<LoadingOutlined style={{ fontSize: 72 }} spin />} />}
						title='Đang xác minh tài khoản...'
						subTitle='Vui lòng đợi trong giây lát'
					/>
				);
			case 'active':
				return (
					<Result
						status='success'
						icon={<CheckCircleFilled className='custom-icon success-icon' />}
						title='Xác minh thành công!'
						subTitle='Tài khoản của bạn đã được kích hoạt thành công'
						extra={[
							<Button type='primary' key='login' onClick={() => history.push(ROUTER_CLIENT.LOGIN)}>
								Đăng nhập ngay
							</Button>,
						]}
					/>
				);
			case 'inactive':
				return (
					<Result
						status='error'
						icon={<CloseCircleFilled className='custom-icon error-icon' />}
						title='Xác minh không thành công'
						subTitle='Token đã hết hạn hoặc không hợp lệ'
						extra={[
							<Button type='primary' key='home' onClick={() => history.push('/')}>
								Về trang chủ
							</Button>,
						]}
					/>
				);
			case 'invalid':
				return (
					<Result
						icon={<WarningFilled className='custom-icon warning-icon' />}
						title='Thiếu mã xác minh'
						subTitle='Vui lòng kiểm tra lại đường dẫn'
						extra={[
							<Button type='primary' key='home' onClick={() => history.push('/')}>
								Về trang chủ
							</Button>,
						]}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='verify-email-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div className='verify-email-content'>{getContent()}</div>
		</div>
	);
}

export default VerifyEmail;
