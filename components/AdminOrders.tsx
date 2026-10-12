'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersError, setOrdersError] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (ordersError) {
    return <p className="cart-error">Couldn&apos;t load orders: {ordersError}</p>;
  }

  if (ordersLoading) {
    return <p>Loading orders…</p>;
  }

  if (orders.length === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div className="admin-orders-table">
      {orders.map((order) => (
        <motion.div key={order.id} {...reveal} className="order-card admin-order-card">
          <div className="order-card-header">
            <div>
              <b>{order.customerName}</b>
              <span className="order-phone">{order.customerPhone}</span>
            </div>
            <span className="order-date">
              {order.createdAt ? order.createdAt.toDate().toLocaleString() : 'Just now'}
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
              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
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
  );
}
