'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MenuItemCard } from './Menu';
import { useMenuItems } from './useMenuItems';

const FEATURED_IDS = ['seafood-premium', 'jollof-goat', 'icecream-strawberry'];

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function HomeHighlights() {
  const { items } = useMenuItems();

  let featured = FEATURED_IDS.map((id) =>
    items.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  // If the preferred picks were removed/renamed via admin, fall back to
  // whichever items currently carry a badge so Home never looks empty.
  if (featured.length < 3) {
    const fallback = items.filter((p) => p.badge && !featured.includes(p));
    featured = [...featured, ...fallback].slice(0, 3);
  }

  return (
    <section id="menu" className="section modern-menu-section">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">Fan Favorites</span>
          <h2>Crowd-Pleasers</h2>
          <p className="section-subtitle">
            A few of the dishes people keep coming back for.
          </p>
        </motion.div>

        <div className="modern-menu-grid">
          {featured.map((item, i) => (
            <MenuItemCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pricing-cta"
        >
          <Link href="/menu" className="button yellow">
            View Full Menu <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
