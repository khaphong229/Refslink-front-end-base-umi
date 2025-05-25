import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Card from 'antd/lib/card/Card';
import Landing from './Landing';
import IntroSection from './IntroduceSection';
import ConnectSection from './ConnectSection';
import SnowBackground from '@/components/SnowFall';
const TrangChu = () => {
  return (
    <>
      <div style={{ padding: '0 40px'}}>
        <Header />
        <SnowBackground/>
        <Landing/>
        <IntroSection/>
        <ConnectSection/>
      {/* <Footer/> */}
      </div>
    </>
  );
};

export default TrangChu
