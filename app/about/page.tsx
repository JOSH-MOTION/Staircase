import type { Metadata } from 'next';
import Header from '../../components/Header';
import About from '../../components/About';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'STAIRCASE is a Ghanaian restaurant serving irresistible local and continental meals, ice cream, desserts and drinks through dine-in and takeaway.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <About />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
