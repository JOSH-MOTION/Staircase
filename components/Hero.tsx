'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('book');
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
          <h1>Serving your favorite doses of happiness all day, everyday</h1>
          <p>favorie! Everyone&apos;s favorite</p>
          <a
            className="button yellow"
            href="#book"
            onClick={handleExploreClick}
          >
            Explore <ArrowRight size={17} />
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
    </section>
  );
}

