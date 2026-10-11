'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from './CartContext';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

export default function HomeCta() {
  return (
    <section className="cta-band">
      <div className="container">
        <motion.div {...reveal}>
          <h2>Hungry already?</h2>
          <p>Order on WhatsApp or get in touch — we&apos;re open every day, 9AM to 11PM.</p>
          <div className="cta-band-actions">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="button yellow"
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
            <Link href="/contact" className="button red">
              Get in Touch <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
