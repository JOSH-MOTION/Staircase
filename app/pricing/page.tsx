import type { Metadata } from 'next';
import Header from '../../components/Header';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'See STAIRCASE menu pricing by category — main dishes, pancakes, ice cream, treats and drinks.',
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <Pricing />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
