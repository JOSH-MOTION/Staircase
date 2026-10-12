'use client';

import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import CartWidget from './CartWidget';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartWidget />
      </CartProvider>
    </AuthProvider>
  );
}
