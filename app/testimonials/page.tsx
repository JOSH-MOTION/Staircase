import type { Metadata } from 'next';
import Header from '../../components/Header';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'See what STAIRCASE customers are saying about our food, desserts and drinks.',
};

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main>
        <Testimonials />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
