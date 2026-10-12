'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Fulfillment = 'Pickup' | 'Delivery';

export interface CartLine {
  key: string;
  id: string;
  name: string;
  optionLabel?: string;
  unitPrice: number;
  qty: number;
}

interface AddItemInput {
  id: string;
  name: string;
  optionLabel?: string;
  unitPrice: number;
}

interface CartContextValue {
  lines: CartLine[];
  fulfillment: Fulfillment;
  setFulfillment: (f: Fulfillment) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: AddItemInput) => void;
  removeLine: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const WHATSAPP_NUMBER = '233549920071';

export function parsePrice(price: string): number {
  const match = price.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [fulfillment, setFulfillment] = useState<Fulfillment>('Pickup');
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: AddItemInput) => {
    const key = `${item.id}__${item.optionLabel ?? 'default'}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { key, qty: 1, ...item }];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const totalPrice = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    fulfillment,
    setFulfillment,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeLine,
    setQty,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function buildWhatsAppOrderLink(
  lines: CartLine[],
  fulfillment: Fulfillment,
  total: number,
  customerName: string,
  customerPhone: string
): string {
  const itemLines = lines
    .map(
      (l) =>
        `• ${l.qty}x ${l.name}${l.optionLabel ? ` (${l.optionLabel})` : ''} — GH₵ ${(
          l.qty * l.unitPrice
        ).toFixed(2)}`
    )
    .join('\n');

  const message = [
    `Hi STAIRCASE! I'd like to place an order (${fulfillment}):`,
    '',
    itemLines,
    '',
    `Total: GH₵ ${total.toFixed(2)}`,
    '',
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    fulfillment === 'Delivery' ? 'Delivery address: ' : '',
  ]
    .filter((l) => l !== '')
    .join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
