import Navbar from "../components/navbar";
import Slidebar from "../components/slidebar";
import Footer from "../components/footer";
import IntroSection from "../components/home/intro-section"
import CarouselSection from './../components/home/carousel-section';
import InfoSection from './../components/home/info-section';
import LoginSection from './../components/home/login-section';
import ProvidersSection from './../components/home/providers-section';

function HomePage() {
  return (
    <div className="home-page bg-dark">
      <Navbar />
      {/* <Slidebar /> */}




      <IntroSection />
      <CarouselSection />
      <InfoSection />
      <LoginSection />
      <ProvidersSection />

      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
