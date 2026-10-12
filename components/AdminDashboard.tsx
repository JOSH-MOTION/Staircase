'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from './AuthContext';
import AuthForm from './AuthForm';
import AdminOrders from './AdminOrders';
import AdminMenuManager from './AdminMenuManager';

const reveal = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const TABS = [
  { id: 'orders', label: 'Orders' },
  { id: 'menu', label: 'Menu' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function AdminDashboard() {
  const { user, loading, isAdmin, signOutUser } = useAuth();
  const [tab, setTab] = useState<TabId>('orders');

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
            <p>This account ({user.email}) doesn&apos;t have admin access.</p>
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
            <h2>Dashboard</h2>
          </div>
          <button type="button" className="button red" onClick={signOutUser}>
            <LogOut size={16} /> Sign Out
          </button>
        </motion.div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' ? <AdminOrders /> : <AdminMenuManager />}
      </div>
    </section>
  );
}
