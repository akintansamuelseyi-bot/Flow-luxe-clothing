import Navbar from '../components/navbar';
import HeroSection from '../components/herosection';
import BrandStatements from '../components/brandshowcase';
import Categories from '../components/categories';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';
import Testimonial from '../components/testimonial';

const Homepage = () => {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <BrandStatements />
        <Categories />
        <Testimonial />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default Homepage;
