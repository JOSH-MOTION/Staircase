import type { Metadata } from 'next';
import Header from '../../components/Header';
import AdminDashboard from '../../components/AdminDashboard';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main>
        <AdminDashboard />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
