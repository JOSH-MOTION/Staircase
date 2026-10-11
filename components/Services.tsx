'use client';

import { motion } from 'motion/react';
import { UtensilsCrossed, ShoppingBag, Bike, MessageCircle } from 'lucide-react';

const SERVICES = [
  {
    icon: UtensilsCrossed,
    title: 'Dine-In',
    description:
      'Relax and enjoy your meal at STAIRCASE. Great for quick lunches, catching up with friends, or unwinding with a chilled drink.',
  },
  {
    icon: ShoppingBag,
    title: 'Takeaway',
    description:
      'Order ahead and pick up your food on the go — the same quality and taste, ready when you are.',
  },
  {
    icon: Bike,
    title: 'Delivery',
    description:
      'Can\'t make it in? We deliver. Message us your order and location on WhatsApp and we\'ll get it to you.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Ordering',
    description:
      'Build your order right from our menu page and send it straight to us on WhatsApp — fast, simple, no app to download.',
  },
];

const FOOD_CATEGORIES = [
  'Local Meals',
  'Rice Dishes',
  'Seafood',
  'Grills',
  'Ice Cream',
  'Pancakes',
  'Desserts',
  'Snacks',
  'Refreshing Drinks',
];

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">What we offer</span>
          <h2>Our Services</h2>
          <p className="section-subtitle">
            Staircase Restaurant serves delicious local and continental meals,
            ice creams, desserts, and refreshing drinks — offering quality
            food and excellent customer service through dine-in and takeaway.
          </p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                {...reveal}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="service-card"
              >
                <div className="service-icon">
                  <Icon size={26} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="service-categories"
        >
          <h3>What We Serve</h3>
          <div className="service-category-list">
            {FOOD_CATEGORIES.map((cat) => (
              <span key={cat} className="service-category-chip">
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
