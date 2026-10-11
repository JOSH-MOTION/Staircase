import type { Metadata } from 'next';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Browse the full STAIRCASE menu — main dishes, fluffy pancakes, ice cream, strawberry treats and cocktails & drinks. Add dishes to your order and send it straight to us on WhatsApp.',
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        <Menu />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
