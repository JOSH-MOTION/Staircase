'use client';

import { CartProvider } from './CartContext';
import CartWidget from './CartWidget';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartWidget />
    </CartProvider>
  );
}
