import type { Metadata } from 'next';
import Header from '../../components/Header';
import ContactPageClient from '../../components/ContactPageClient';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with STAIRCASE — call or WhatsApp us, find our locations in Kumasi, or send us a message. Open Monday to Sunday, 9:00 AM to 11:00 PM.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactPageClient />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
