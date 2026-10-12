'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_PRODUCTS, watchMenu, type MenuItem } from '../lib/menu';

// Live Firestore menu data once it's available; falls back to the
// site's built-in defaults while loading, on error, or if the admin
// hasn't seeded Firestore yet — the menu is never empty/broken.
export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(DEFAULT_PRODUCTS);
  const [source, setSource] = useState<'default' | 'firestore'>('default');

  useEffect(() => {
    const unsubscribe = watchMenu(
      (data) => {
        if (data.length > 0) {
          setItems(data);
          setSource('firestore');
        } else {
          setItems(DEFAULT_PRODUCTS);
          setSource('default');
        }
      },
      () => {
        setItems(DEFAULT_PRODUCTS);
        setSource('default');
      }
    );
    return unsubscribe;
  }, []);

  return { items, source };
}
