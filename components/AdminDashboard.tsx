'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthForm from './AuthForm';
import {
  updateOrderStatus,
  watchAllOrders,
  type OrderRecord,
  type OrderStatus,
} from '../lib/orders';
import OrderStatusBadge from './OrderStatusBadge';

const STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
  'cancelled',
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 },
};

export default function AdminDashboard() {
  const { user, loading, isAdmin, signOutUser } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersError, setOrdersError] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    setOrdersLoading(true);
    const unsubscribe = watchAllOrders(
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
  }, [isAdmin]);

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

  if (!isAdmin) {
    return (
      <section className="section">
        <div className="container container-narrow">
          <div className="cart-empty">
            <ShieldAlert size={32} />
            <p>
              This account ({user.email}) doesn&apos;t have admin access.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <motion.div {...reveal} className="account-header">
          <div>
            <span className="eyebrow">Admin</span>
            <h2>All Orders</h2>
          </div>
          <button type="button" className="button red" onClick={signOutUser}>
            <LogOut size={16} /> Sign Out
          </button>
        </motion.div>

        {ordersError && (
          <p className="cart-error">Couldn&apos;t load orders: {ordersError}</p>
        )}

        {!ordersError && ordersLoading && <p>Loading orders…</p>}

        {!ordersError && !ordersLoading && orders.length === 0 && (
          <p>No orders yet.</p>
        )}

        <div className="admin-orders-table">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              {...reveal}
              transition={{ duration: 0.4 }}
              className="order-card admin-order-card"
            >
              <div className="order-card-header">
                <div>
                  <b>{order.customerName}</b>
                  <span className="order-phone">{order.customerPhone}</span>
                </div>
                <span className="order-date">
                  {order.createdAt
                    ? order.createdAt.toDate().toLocaleString()
                    : 'Just now'}
                </span>
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
              <div className="admin-order-status">
                <OrderStatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value as OrderStatus)
                  }
                >
                  {STATUS_FLOW.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
