'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Check } from 'lucide-react';

export interface PriceOption {
  label: string;
  price: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Main Dishes' | 'Fluffy Pancakes' | 'Ice Cream' | 'Strawberry Treats' | 'Cocktails & Drinks';
  group: 'Food' | 'Desserts' | 'Drinks';
  detail: string;
  price: string;
  priceOptions?: PriceOption[];
  image: string;
  badge?: string;
  highlights?: string;
}

const CATEGORIES = [
  { id: 'All', label: 'All Menu' },
  { id: 'Main Dishes', label: 'Main Dishes' },
  { id: 'Fluffy Pancakes', label: 'Fluffy Pancakes' },
  { id: 'Ice Cream', label: 'Ice Cream' },
  { id: 'Strawberry Treats', label: 'Strawberry Treats' },
  { id: 'Cocktails & Drinks', label: 'Cocktails & Drinks' },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

const PRODUCTS: MenuItem[] = [
  // MAIN DISHES (FOOD)
  {
    id: 'seafood-premium',
    name: 'Seafood Premium Dish',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Chef special premium assorted seafood platter seasoned with aromatic herbs & spices.',
    price: 'GH₵ 130',
    image: 'menu/seafood-premium.jpg',
    badge: 'Chef Special',
    highlights: 'Fresh Catch',
  },
  {
    id: 'jollof-goat',
    name: 'Jollof with Goat',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Signature smoky Ghanaian jollof rice served with tender seasoned goat meat and shito dip.',
    price: 'GH₵ 90',
    image: 'menu/jollof-goat.jpg',
    badge: 'Most Popular',
    highlights: 'Tender Goat Meat',
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Savory stir-fried rice seasoned with fresh garden vegetables, eggs, spices and pepper relish.',
    price: 'GH₵ 90',
    image: 'menu/fried-rice.jpg',
    highlights: 'Aromatic Wok Fried',
  },
  {
    id: 'banku-tilapia',
    name: 'Banku & Tilapia',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Freshly grilled seasoned tilapia served with hot banku, spicy pepper sauce & sliced garnishes.',
    price: 'GH₵ 90',
    image: 'menu/seafood-premium.jpg',
    highlights: 'Hot & Fresh',
  },
  {
    id: 'seasonal-rice',
    name: 'Seasonal Jollof / Fried Rice',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Special single portion of our signature authentic jollof or fried rice.',
    price: 'GH₵ 45',
    image: 'menu/fried-rice.jpg',
    highlights: 'Quick Bite',
  },

  // FLUFFY PANCAKES (DESSERTS)
  {
    id: 'pancakes-nutella',
    name: 'Nutella Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Warm, golden fluffy pancakes generously drizzled with rich velvety Nutella chocolate.',
    price: 'GH₵ 45',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 45' },
      { label: '12 Pcs', price: 'GH₵ 75' },
    ],
    image: 'menu/waffles.png',
    highlights: 'Fluffy & Warm',
  },
  {
    id: 'pancakes-honey',
    name: 'Honey Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Light, cloud-soft fluffy pancake stack glazed with pure natural golden honey.',
    price: 'GH₵ 40',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 40' },
      { label: '12 Pcs', price: 'GH₵ 65' },
    ],
    image: 'menu/waffles.png',
    highlights: 'Pure Honey Glaze',
  },
  {
    id: 'pancakes-nutella-strawberry',
    name: 'Nutella & Strawberry Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Fluffy pancakes layered with rich Nutella and topped with fresh sliced sweet strawberries.',
    price: 'GH₵ 55',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 55' },
      { label: '12 Pcs', price: 'GH₵ 90' },
    ],
    image: 'menu/waffles.png',
    badge: 'Customer Favorite',
    highlights: 'Fresh Berries',
  },

  // ICE CREAM (DESSERTS)
  {
    id: 'icecream-vanilla',
    name: 'Classic Vanilla Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: '4.8 oz rich and creamy Madagascar vanilla scoop. Includes 2 regular toppings of your choice.',
    price: 'GH₵ 30',
    image: 'menu/icecream.png',
    highlights: 'Includes 2 Toppings',
  },
  {
    id: 'icecream-strawberry',
    name: 'Strawberry Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Crafted with ripe strawberries and creamy swirl for an irresistible berry sensation.',
    price: 'GH₵ 30',
    image: 'hero-ice.png',
    badge: 'Signature',
    highlights: 'STAIRCASE Recipe',
  },
  {
    id: 'icecream-biscoff',
    name: 'Lotus Biscoff Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Velvety ice cream infused with crunchy caramelized Lotus Biscoff biscuit crumbles & sauce.',
    price: 'GH₵ 40',
    image: 'menu/cakeincup.png',
    badge: 'Top Pick',
    highlights: 'Caramelized Crunch',
  },
  {
    id: 'icecream-chocolate',
    name: 'Chocolate Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Intense, silky smooth dark cocoa scoop crafted for the true chocolate enthusiast.',
    price: 'GH₵ 40',
    image: 'menu/cakeincup.png',
    highlights: 'Rich Cocoa',
  },

  // STRAWBERRY TREATS (DESSERTS)
  {
    id: 'strawberry-sticks',
    name: 'Strawberry Sticks',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Freshly skewered hand-picked strawberries dipped in rich warm Belgian melted chocolate.',
    price: 'GH₵ 35',
    image: 'menu/cupcake.png',
    highlights: 'Fresh Skewers',
  },
  {
    id: 'dubai-strawberry-cup',
    name: 'Dubai Strawberry Cup',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Gourmet dessert cup with fresh strawberries, velvety cream and nutty pistachio drizzle.',
    price: 'GH₵ 50',
    image: 'hero-ice.png',
    badge: 'Viral Dubai Trend',
    highlights: 'Pistachio Cream',
  },
  {
    id: 'dubai-chocolate-cup',
    name: 'Dubai Chocolate Cup',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Decadent Dubai cup layered with crisp toasted knafeh and luscious melted chocolate ganache.',
    price: 'GH₵ 50',
    image: 'menu/cakeincup.png',
    badge: 'Trending',
    highlights: 'Crisp Knafeh & Choc',
  },

  // COCKTAILS & DRINKS (DRINKS)
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    category: 'Cocktails & Drinks',
    group: 'Drinks',
    detail: 'Chilled, silky smooth yogurt shake freshly blended with sweet ripe tropical mangoes.',
    price: 'GH₵ 35',
    image: 'menu/piranha.jpg',
    highlights: 'Refreshing & Chilled',
  },
  {
    id: 'piranha',
    name: 'Piranha Cocktail',
    category: 'Cocktails & Drinks',
    group: 'Drinks',
    detail: 'Vibrant layered house cocktail with tropical citrus zest, fruit punch, and fresh orange garnish.',
    price: 'GH₵ 40',
    image: 'menu/piranha.jpg',
    badge: 'House Special',
    highlights: 'Tropical Sunset Layer',
  },
];

const PREMIUM_TOPPINGS = ['Strawberry', 'Kiwi', 'Nutella', 'Biscoff', 'Pistachio'];

const reveal = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const displayPrice = item.priceOptions
    ? item.priceOptions[selectedOptionIndex].price
    : item.price;

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
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('All');

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeCategory);

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


