import { Button, Row, Col, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import './style.less';
import TopImg from '@/assets/top.png';
// import ParticlesBackground from '@/components/ParticlesBackground';

const { Title, Paragraph } = Typography;

export default function Landing() {
	const history = useHistory();

	return (
		<div className='landing-wrapper'>
            {/* <ParticlesBackground/> */}
			<Row gutter={[32, 32]} align='middle'>
				<Col xs={24} md={12}>
					<div className='landing-text'>
						<Title level={1}>
							<span className='gradient-text text-color'>Quản lý </span>
							link rút gọn cùng Ref
							<span className='text-color'>slink</span>
						</Title>
						<Paragraph className='description'>
							RefLink là nền tảng rút gọn link nhanh chóng, tiện lợi, giúp bạn chia sẻ các đường dẫn dài một cách chuyên
							nghiệp và dễ nhớ.Với RefLink, bạn có thể quản lý, theo dõi lượt click và tối ưu hiệu quả chia sẻ liên kết
							chỉ trong vài giây.
						</Paragraph>
						<Button
							type='primary'
							size='large'
							style={{ borderRadius: '5px' }}
							onClick={() => history.push('/user/login')}
						>
							Bắt đầu ngay!
						</Button>
					</div>
				</Col>
				<Col xs={24} md={12}>
					<div className='landing-image'>
						<img src={TopImg} alt='top-illustration' />
					</div>
				</Col>
			</Row>
		</div>
	);
}
