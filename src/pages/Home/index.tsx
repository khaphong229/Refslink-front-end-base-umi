import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Card from 'antd/lib/card/Card';
import Landing from './Landing';
import IntroSection from './IntroduceSection';
import ConnectSection from './ConnectSection';
import SnowBackground from '@/components/SnowFall';
import HeroSlider from './SlideData';
import {  PricingPlans,} from './PricingPlans';
import RecentLinks from './RecentLinks';
import {  FeaturesSection,  } from './FeaturesSection';
import AppFooter from '@/components/Footer';
const TrangChu = () => {
  return (
    <>
      <div style={{ padding: '0 40px'}}>
        <Header />
        <SnowBackground/>
        <Landing/>
        {/* <IntroSection/> */}
        <FeaturesSection/>
        <RecentLinks/>
        
        <PricingPlans/>
        <ConnectSection/>


      </div>

    </>
  );
};

export default TrangChu
