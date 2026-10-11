'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What are your opening hours?',
    a: 'We\'re open every day, Monday through Sunday, from 9:00 AM to 11:00 PM.',
  },
  {
    q: 'Do you offer delivery?',
    a: 'Yes. Build your order on our Menu page and send it to us on WhatsApp with your delivery address, and we\'ll confirm the details with you.',
  },
  {
    q: 'Can I order via WhatsApp?',
    a: 'Yes — it\'s our main way of taking orders right now. Add dishes to your order on the Menu page and tap "Order via WhatsApp" to send it straight to us.',
  },
  {
    q: 'Do you take table reservations?',
    a: 'We don\'t currently take table reservations — just walk in and we\'ll seat you.',
  },
  {
    q: 'Do you offer dine-in and takeaway?',
    a: 'Both. Come in and relax with your meal, or order ahead for takeaway.',
  },
  {
    q: 'How many locations do you have?',
    a: 'Two — Nana Adoma Hostel (Engineering Gate) and our New Site (Opposite Evandy Hostel).',
  },
  {
    q: 'Can I pay online?',
    a: 'Online payment is on the way. For now, orders placed via WhatsApp are confirmed with payment on pickup or delivery.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container container-narrow">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">Got questions?</span>
          <h2>Frequently Asked Questions</h2>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                {isOpen && (
                  <motion.p
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {item.a}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
