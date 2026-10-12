'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  CATEGORIES,
  deleteMenuItem,
  saveMenuItem,
  seedMenuFromDefaults,
  watchMenu,
  type MenuItem,
} from '../lib/menu';
import MenuItemForm from './MenuItemForm';

export default function AdminMenuManager() {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [editing, setEditing] = useState<MenuItem | 'new' | null>(null);

  useEffect(() => {
    const unsubscribe = watchMenu(
      (data) => {
        setItems(data);
        setError('');
      },
      (err) => setError(err.message)
    );
    return unsubscribe;
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedMenuFromDefaults();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not seed the menu.');
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the menu?`)) return;
    try {
      await deleteMenuItem(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete this item.');
    }
  };

  if (error) {
    return <p className="cart-error">Couldn&apos;t load the menu: {error}</p>;
  }

  if (items === null) {
    return <p>Loading menu…</p>;
  }

  if (items.length === 0 && editing !== 'new') {
    return (
      <div className="cart-empty">
        <p>
          The live menu is empty — the site is currently showing the built-in
          defaults instead. Seed Firestore with those defaults to start
          managing the menu from here.
        </p>
        <button type="button" className="button red" onClick={handleSeed} disabled={seeding}>
          {seeding ? 'Seeding…' : 'Seed Menu From Defaults'}
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <MenuItemForm
        initial={editing === 'new' ? undefined : editing}
        nextSortOrder={items.length}
        onCancel={() => setEditing(null)}
        onSave={async (item) => {
          await saveMenuItem(item);
          setEditing(null);
        }}
      />
    );
  }

  const categories = CATEGORIES.filter((c) => c.id !== 'All');

  return (
    <div>
      <div className="admin-menu-toolbar">
        <button type="button" className="button red" onClick={() => setEditing('new')}>
          <Plus size={16} /> Add Dish
        </button>
      </div>

      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat.id);
        if (catItems.length === 0) return null;
        return (
          <div key={cat.id} className="admin-menu-category">
            <h3>{cat.label}</h3>
            <div className="admin-menu-items">
              {catItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="admin-menu-item"
                >
                  <div>
                    <b>{item.name}</b>
                    <span>{item.price}</span>
                    {item.badge && <em>{item.badge}</em>}
                  </div>
                  <div className="admin-menu-item-actions">
                    <button
                      type="button"
                      onClick={() => setEditing(item)}
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => handleDelete(item.id, item.name)}
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
