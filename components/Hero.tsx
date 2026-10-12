'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="hero-eyebrow">Fresh • Handcrafted • Everyday</span>
          <h1>
            Serving your favorite doses of{' '}
            <span className="hero-highlight">happiness</span> all day,
            everyday
          </h1>
          <p>favorie! Everyone&apos;s favorite</p>
          <a
            className="button yellow"
            href="#menu"
            onClick={handleExploreClick}
          >
            Order Now <ArrowRight size={17} />
          </a>
        </motion.div>

        <motion.div
          className="hero-art"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.25 }}
        >
          <span className="sun" />
          <img
            src="/assets/img/hero-ice.png"
            alt="STAIRCASE Strawberry Ice Cream"
          />
          <span className="swoosh" />
        </motion.div>
      </div>

      <svg
        className="hero-divider"
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,38 C120,68 220,8 360,32 C500,56 560,12 700,30 C840,48 900,70 1040,46 C1120,32 1160,50 1200,40 L1200,90 L0,90 Z" />
      </svg>
    </section>
  );
}

