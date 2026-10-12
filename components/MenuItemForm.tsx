'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../lib/menu';
import type { MenuItem, PriceOption } from '../lib/menu';

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c.id !== 'All');
const GROUP_BY_CATEGORY: Record<string, MenuItem['group']> = {
  'Main Dishes': 'Food',
  'Fluffy Pancakes': 'Desserts',
  'Ice Cream': 'Desserts',
  'Strawberry Treats': 'Desserts',
  'Cocktails & Drinks': 'Drinks',
};

const emptyItem = (sortOrder: number): MenuItem => ({
  id: '',
  name: '',
  category: 'Main Dishes',
  group: 'Food',
  detail: '',
  price: '',
  image: '',
  sortOrder,
});

interface MenuItemFormProps {
  initial?: MenuItem;
  nextSortOrder: number;
  onSave: (item: MenuItem) => Promise<void>;
  onCancel: () => void;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function MenuItemForm({
  initial,
  nextSortOrder,
  onSave,
  onCancel,
}: MenuItemFormProps) {
  const [item, setItem] = useState<MenuItem>(initial ?? emptyItem(nextSortOrder));
  const [usePriceOptions, setUsePriceOptions] = useState(
    !!initial?.priceOptions?.length
  );
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>(
    initial?.priceOptions ?? [{ label: '', price: '' }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!initial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!item.name.trim() || !item.price.trim() || !item.detail.trim()) {
      setError('Name, description and price are required.');
      return;
    }

    const id = isEditing ? item.id : slugify(item.name);
    if (!id) {
      setError('Could not generate an id from that name — try a simpler name.');
      return;
    }

    const cleanOptions = usePriceOptions
      ? priceOptions.filter((o) => o.label.trim() && o.price.trim())
      : [];

    setSaving(true);
    try {
      await onSave({
        ...item,
        id,
        name: item.name.trim(),
        detail: item.detail.trim(),
        price: item.price.trim(),
        image: item.image.trim(),
        badge: item.badge?.trim() || undefined,
        highlights: item.highlights?.trim() || undefined,
        priceOptions: cleanOptions.length ? cleanOptions : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save this item.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form menu-item-form" onSubmit={handleSubmit}>
      <input
        required
        placeholder="Dish name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />

      <div className="menu-item-form-row">
        <select
          value={item.category}
          onChange={(e) => {
            const category = e.target.value as MenuItem['category'];
            setItem({
              ...item,
              category,
              group: GROUP_BY_CATEGORY[category] ?? item.group,
            });
          }}
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          placeholder="Image path (e.g. menu/dish.jpg)"
          value={item.image}
          onChange={(e) => setItem({ ...item, image: e.target.value })}
        />
      </div>

      <textarea
        required
        rows={3}
        placeholder="Short description"
        value={item.detail}
        onChange={(e) => setItem({ ...item, detail: e.target.value })}
      />

      <div className="menu-item-form-row">
        <input
          placeholder="Badge (optional, e.g. Chef Special)"
          value={item.badge ?? ''}
          onChange={(e) => setItem({ ...item, badge: e.target.value })}
        />
        <input
          placeholder="Highlight tag (optional)"
          value={item.highlights ?? ''}
          onChange={(e) => setItem({ ...item, highlights: e.target.value })}
        />
      </div>

      <label className="menu-item-form-toggle">
        <input
          type="checkbox"
          checked={usePriceOptions}
          onChange={(e) => setUsePriceOptions(e.target.checked)}
        />
        This item has multiple portion sizes
      </label>

      {!usePriceOptions ? (
        <input
          required
          placeholder="Price (e.g. GH₵ 90)"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
      ) : (
        <div className="price-options-editor">
          {priceOptions.map((opt, i) => (
            <div key={i} className="price-options-row">
              <input
                placeholder="Label (e.g. 6 Pcs)"
                value={opt.label}
                onChange={(e) => {
                  const next = [...priceOptions];
                  next[i] = { ...next[i], label: e.target.value };
                  setPriceOptions(next);
                  if (i === 0) setItem({ ...item, price: next[0].price });
                }}
              />
              <input
                placeholder="Price (e.g. GH₵ 45)"
                value={opt.price}
                onChange={(e) => {
                  const next = [...priceOptions];
                  next[i] = { ...next[i], price: e.target.value };
                  setPriceOptions(next);
                  if (i === 0) setItem({ ...item, price: next[0].price });
                }}
              />
              <button
                type="button"
                className="cart-remove"
                onClick={() =>
                  setPriceOptions(priceOptions.filter((_, idx) => idx !== i))
                }
                aria-label="Remove portion"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-to-order-btn"
            onClick={() => setPriceOptions([...priceOptions, { label: '', price: '' }])}
          >
            <Plus size={14} /> Add portion
          </button>
        </div>
      )}

      {error && <p className="cart-error">{error}</p>}

      <div className="menu-item-form-actions">
        <button type="submit" className="button red" disabled={saving}>
          {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Dish'}
        </button>
        <button type="button" className="menu-item-form-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
