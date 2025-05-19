import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Card from 'antd/lib/card/Card';
import Landing from './Landing';
import IntroSection from './IntroduceSection';
import ConnectSection from './ConnectSection';
const TrangChu = () => {
  return (
    <>
      <Header />
      <Card>
        <Landing/>
        <IntroSection/>
        <ConnectSection/>
      </Card>
      <Footer/>
    </>
  );
};

export default TrangChu
