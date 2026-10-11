'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Play } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function About() {
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
              At <strong>STAIRCASE</strong>, our passion is simple: creating unforgettable dining experiences through rich, authentic flavors and comforting culinary creations.
            </p>
            <p>
              From our sizzling seafood platters and smoky Ghanaian jollof to freshly stacked fluffy pancakes, gourmet ice cream, and handcrafted cocktails — every dish is prepared with fresh ingredients and uncompromising quality.
            </p>
            <p>
              Whether you are stopping by for a quick lunch, celebrating with friends, or unwinding with a chilled drink, we invite you to experience our irresistible taste.
            </p>

            <div className="video">
              <img src="/assets/img/menu/wings-fries.jpg" alt="STAIRCASE specialties" />
              <Link href="/menu" aria-label="View our menu">
                <Play fill="currentColor" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

