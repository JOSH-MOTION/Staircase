'use client';

import { motion } from 'motion/react';

interface BookingProps {
  onNotify: (message: string) => void;
}

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Booking({ onNotify }: BookingProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNotify(
      'Your booking request was sent. We will call back or send an Email to confirm your reservation. Thank you!'
    );
  };

  return (
    <section id="book" className="section cream">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">Come by and stay a while</span>
          <h2>Book a Table</h2>
        </motion.div>

        <motion.form
          {...reveal}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="form booking"
          onSubmit={handleSubmit}
        >
          <input required placeholder="Your Name" />
          <input required type="email" placeholder="Your Email" />
          <input required type="tel" placeholder="Your Phone" />
          <input required type="date" aria-label="Date" />
          <input required type="time" aria-label="Time" />
          <input required type="number" min="1" placeholder="# of people" />
          <textarea rows={5} placeholder="Message (optional)" />
          <button type="submit" className="button red">
            Book a Table
          </button>
        </motion.form>
      </div>
    </section>
  );
}
