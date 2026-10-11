import Header from '../components/Header';
import Hero from '../components/Hero';
import HomeAboutTeaser from '../components/HomeAboutTeaser';
import HomeHighlights from '../components/HomeHighlights';
import Testimonials from '../components/Testimonials';
import HomeCta from '../components/HomeCta';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <HomeAboutTeaser />
        <HomeHighlights />
        <Testimonials />
        <HomeCta />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
