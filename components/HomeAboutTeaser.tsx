'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function HomeAboutTeaser() {
  return (
    <section id="about" className="section">
      <div className="container">
        <span className="eyebrow">About Us</span>
        <div className="about-grid">
          <motion.img
            {...reveal}
            className="about-wall"
            src="/assets/img/about.png"
            alt="About STAIRCASE"
          />

          <motion.div {...reveal}>
            <h2>Irresistible taste crafted for every craving.</h2>
            <p>
              At <strong>STAIRCASE</strong>, our passion is simple: creating
              unforgettable dining experiences through rich, authentic
              flavors and comforting culinary creations.
            </p>
            <p>
              From sizzling seafood platters and smoky Ghanaian jollof to
              fluffy pancakes, gourmet ice cream and handcrafted drinks —
              every dish is prepared with fresh ingredients and
              uncompromising quality.
            </p>
            <Link href="/about" className="button red">
              Learn More About Us <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
