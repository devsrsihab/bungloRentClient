import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner";
import Features from "../../components/Home/Features/Features";
import Contact from "../../components/Home/Contact";
import State from "../../components/Home/State";
import AboutUs from "../../components/Home/AboutUs";

const Home = () => {
  return (
    <>
      {/* Home page title for html */}
      <Helmet>
        <title>Home | Welcom To BungloRent</title>
      </Helmet>

      {/* banner section */}
      <Banner/>
      {/* About Us section */}
      <AboutUs/>
      {/* Features or Benefits section */}
      <Features/>
      {/* State section */}
      <State/>
      {/* Contact Information section */}
      <Contact/>
    </>
  );
};

export default Home;
