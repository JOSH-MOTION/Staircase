import type { Metadata } from 'next';
import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Dine-in, takeaway, delivery and WhatsApp ordering at STAIRCASE — local and continental meals, ice cream, desserts and drinks in Ghana.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
