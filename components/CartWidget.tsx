'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { buildWhatsAppOrderLink, useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { placeOrder } from '../lib/orders';

export default function CartWidget() {
  const {
    lines,
    fulfillment,
    setFulfillment,
    isOpen,
    openCart,
    closeCart,
    removeLine,
    setQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!customerName && user?.displayName) {
      setCustomerName(user.displayName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const name = customerName.trim();
    const phone = customerPhone.trim();

    if (!name || !phone) {
      setFormError('Please enter your name and phone number.');
      return;
    }
    setFormError('');

    const link = buildWhatsAppOrderLink(lines, fulfillment, totalPrice, name, phone);
    // Open WhatsApp synchronously within the click handler so browsers
    // don't block it as a popup — the Firestore write happens alongside,
    // not before, so a slow/failed write never blocks the actual order.
    window.open(link, '_blank', 'noopener,noreferrer');

    placeOrder({
      userId: user?.uid ?? null,
      customerName: name,
      customerPhone: phone,
      items: lines,
      fulfillment,
      total: totalPrice,
    }).catch((err) => {
      console.error('Could not save order record:', err);
    });

    clearCart();
    closeCart();
  };

  return (
    <>
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.button
            type="button"
            className="cart-fab"
            onClick={openCart}
            aria-label="View your order"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <ShoppingBag size={20} />
            <span className="cart-fab-count">{totalItems}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />
            <motion.aside
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              role="dialog"
              aria-label="Your order"
            >
              <div className="cart-drawer-header">
                <h3>Your Order</h3>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="cart-close"
                >
                  <X size={20} />
                </button>
              </div>

              {lines.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={32} />
                  <p>Your order is empty. Add dishes from the menu to get started.</p>
                </div>
              ) : (
                <>
                  <div className="cart-lines">
                    {lines.map((line) => (
                      <div key={line.key} className="cart-line">
                        <div className="cart-line-info">
                          <b>{line.name}</b>
                          {line.optionLabel && (
                            <span className="cart-line-option">
                              {line.optionLabel}
                            </span>
                          )}
                          <span className="cart-line-price">
                            GH₵ {(line.unitPrice * line.qty).toFixed(2)}
                          </span>
                        </div>
                        <div className="cart-line-actions">
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span>{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            type="button"
                            className="cart-remove"
                            onClick={() => removeLine(line.key)}
                            aria-label={`Remove ${line.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-fulfillment">
                    <span>How would you like your order?</span>
                    <div className="cart-fulfillment-toggle">
                      {(['Pickup', 'Delivery'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={fulfillment === opt ? 'active' : ''}
                          onClick={() => setFulfillment(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cart-contact-fields">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  {formError && <p className="cart-error">{formError}</p>}

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>GH₵ {totalPrice.toFixed(2)}</strong>
                  </div>

                  <a
                    href="#"
                    onClick={handleCheckout}
                    className="button red cart-checkout"
                  >
                    Order via WhatsApp
                  </a>
                  <p className="cart-note">
                    This sends your order as a WhatsApp message to STAIRCASE —
                    we&apos;ll confirm payment and timing with you directly.
                  </p>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
