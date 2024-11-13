import Navbar from "../components/Navigation/Navbar";
import MainContent from "../components/Home/MainContent";
import HeroSection from "../components/ExchangeRates/HeroSection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MainContent />
    </div>
  );
};

export default HomePage;
