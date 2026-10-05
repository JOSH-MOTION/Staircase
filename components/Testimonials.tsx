'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const REVIEWS = [
  {
    quote: 'The Jollof with Goat and Piranha cocktail at STAIRCASE are unbeatable! Truly irresistible taste.',
    author: 'Andrews Opoku',
  },
  {
    quote: 'Best seafood platter and fluffiest pancakes in town. STAIRCASE is now my go-to spot!',
    author: 'Charity',
  },
  {
    quote: 'The Dubai Strawberry Cup and classic vanilla ice cream are out of this world.',
    author: 'Kwame A.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Testimonials() {
  const [activeReview, setActiveReview] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">Happy moments</span>
          <h2>What are they saying about us?</h2>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="testimonial"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="quote">“</div>
              <p>{REVIEWS[activeReview].quote}</p>
              <b>{REVIEWS[activeReview].author}</b>
              <div className="stars">★★★★★</div>
            </motion.div>
          </AnimatePresence>

          <div className="dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={activeReview === i ? 'active' : ''}
                aria-label={`Review ${i + 1}`}
                onClick={() => setActiveReview(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
