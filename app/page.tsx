'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import Booking from '../components/Booking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Notice from '../components/Notice';

export default function Home() {
  const [notice, setNotice] = useState('');

  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <Booking onNotify={setNotice} />
        <Contact onNotify={setNotice} />
      </main>

      <Footer />
      <BackToTop />
      <Notice message={notice} onClose={() => setNotice('')} />
    </>
  );
}
