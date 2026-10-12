import type { Metadata } from 'next';
import Header from '../../components/Header';
import AccountDashboard from '../../components/AccountDashboard';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main>
        <AccountDashboard />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
