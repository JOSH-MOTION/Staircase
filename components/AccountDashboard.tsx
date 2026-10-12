'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, PackageOpen } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthForm from './AuthForm';
import { watchMyOrders, type OrderRecord } from '../lib/orders';
import OrderStatusBadge from './OrderStatusBadge';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 },
};

export default function AccountDashboard() {
  const { user, loading, signOutUser } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersError, setOrdersError] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    const unsubscribe = watchMyOrders(
      user.uid,
      (data) => {
        setOrders(data);
        setOrdersLoading(false);
        setOrdersError('');
      },
      (err) => {
        setOrdersError(err.message);
        setOrdersLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <section className="section">
        <div className="container container-narrow">
          <p className="auth-loading">Loading…</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section">
        <div className="container container-narrow">
          <AuthForm />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container container-narrow">
        <motion.div {...reveal} className="account-header">
          <div>
            <span className="eyebrow">Your Account</span>
            <h2>Hi, {user.displayName || user.email}</h2>
          </div>
          <button type="button" className="button red" onClick={signOutUser}>
            <LogOut size={16} /> Sign Out
          </button>
        </motion.div>

        <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.1 }}>
          <h3 className="orders-heading">Your Orders</h3>

          {ordersError && (
            <p className="cart-error">
              Couldn&apos;t load your orders: {ordersError}
            </p>
          )}

          {!ordersError && ordersLoading && <p>Loading your orders…</p>}

          {!ordersError && !ordersLoading && orders.length === 0 && (
            <div className="cart-empty">
              <PackageOpen size={32} />
              <p>No orders yet — place one from the Menu page.</p>
            </div>
          )}

          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <span className="order-date">
                    {order.createdAt
                      ? order.createdAt.toDate().toLocaleString()
                      : 'Just now'}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.key}>
                      {item.qty}x {item.name}
                      {item.optionLabel ? ` (${item.optionLabel})` : ''}
                    </li>
                  ))}
                </ul>
                <div className="order-card-footer">
                  <span>{order.fulfillment}</span>
                  <strong>GH₵ {order.total.toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
