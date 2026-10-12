'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Check, Plus } from 'lucide-react';
import { parsePrice, useCart } from './CartContext';
import { CATEGORIES, PREMIUM_TOPPINGS, type MenuItem } from '../lib/menu';
import { useMenuItems } from './useMenuItems';

type CategoryId = (typeof CATEGORIES)[number]['id'];

const reveal = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

export function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const displayPrice = item.priceOptions
    ? item.priceOptions[selectedOptionIndex].price
    : item.price;

  const handleAddToOrder = () => {
    const optionLabel = item.priceOptions
      ? item.priceOptions[selectedOptionIndex].label
      : undefined;
    addItem({
      id: item.id,
      name: item.name,
      optionLabel,
      unitPrice: parsePrice(displayPrice),
    });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.06 }}
      className="modern-menu-card"
    >
      {/* Top Image Frame */}
      <div className="card-media">
        {item.badge && <span className="card-badge">{item.badge}</span>}

        {imgError ? (
          <div className="card-fallback">
            <Utensils size={36} />
            <span>{item.name}</span>
          </div>
        ) : (
          <img
            src={`/assets/img/${item.image}`}
            alt={item.name}
            onError={() => setImgError(true)}
            className="card-photo"
          />
        )}
        <div className="card-media-overlay" />
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-header-row">
          <span className="card-category-pill">{item.category}</span>
          {item.highlights && (
            <span className="card-highlight-chip">{item.highlights}</span>
          )}
        </div>

        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">{item.detail}</p>

        {/* Multi-Price Option Tabs if applicable */}
        {item.priceOptions && (
          <div className="portion-selector">
            <span className="portion-label">Select Portion:</span>
            <div className="portion-pills">
              {item.priceOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedOptionIndex(idx)}
                  className={`portion-btn ${selectedOptionIndex === idx ? 'selected' : ''}`}
                >
                  <span>{opt.label}</span>
                  <span className="portion-price-preview">{opt.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Card Footer Price Area */}
        <div className="card-footer">
          <div className="price-display">
            <span className="price-tag-label">Price</span>
            <strong className="price-value">{displayPrice}</strong>
          </div>
          <button
            type="button"
            className="add-to-order-btn"
            onClick={handleAddToOrder}
          >
            <Plus size={15} /> Add to Order
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('All');
  const { items } = useMenuItems();

  const filteredProducts =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section modern-menu-section">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">FOOD • DESSERTS • DRINKS</span>
          <h2>Our Menu</h2>
          <p className="section-subtitle">
            Explore handcrafted culinary dishes, decadent desserts, and signature cocktails.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="menu-filter-nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Premium Toppings Banner (Visible under All or Ice Cream) */}
        {(activeCategory === 'All' || activeCategory === 'Ice Cream') && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-toppings-bar"
          >
            <div className="toppings-intro">
              <div>
                <strong>🍦 Premium Ice Cream Toppings</strong>
                <span>+GH₵12 per extra topping</span>
              </div>
            </div>
            <div className="toppings-list">
              {PREMIUM_TOPPINGS.map((top) => (
                <span key={top} className="topping-chip">
                  <Check size={12} className="topping-check" />
                  {top}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div layout className="modern-menu-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item, i) => (
              <MenuItemCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
