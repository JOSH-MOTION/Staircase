'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../lib/menu';
import { useMenuItems } from './useMenuItems';
import { parsePrice } from './CartContext';

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Pricing() {
  const categories = CATEGORIES.filter((c) => c.id !== 'All');
  const { items: PRODUCTS } = useMenuItems();

  return (
    <section className="section cream">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">What it costs</span>
          <h2>Pricing</h2>
          <p className="section-subtitle">
            Straightforward pricing by category — see the full menu for every
            dish, portion size and topping option.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {categories.map((cat, i) => {
            const items = PRODUCTS.filter((p) => p.category === cat.id);
            const prices = items.flatMap((item) =>
              item.priceOptions
                ? item.priceOptions.map((o) => parsePrice(o.price))
                : [parsePrice(item.price)]
            );
            const min = Math.min(...prices);
            const max = Math.max(...prices);

            return (
              <motion.div
                key={cat.id}
                {...reveal}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="pricing-card"
              >
                <h3>{cat.label}</h3>
                <p className="pricing-range">
                  GH₵ {min}
                  {max !== min ? ` – ${max}` : ''}
                </p>
                <span className="pricing-count">
                  {items.length} item{items.length === 1 ? '' : 's'}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pricing-cta"
        >
          <Link href="/menu" className="button red">
            View Full Menu <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
