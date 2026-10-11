import type { Metadata } from 'next';
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about STAIRCASE — opening hours, delivery, WhatsApp ordering, locations and more.',
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <Faq />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
