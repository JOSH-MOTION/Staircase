import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { CartLine, Fulfillment } from '../components/CartContext';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderRecord {
  id: string;
  userId: string | null;
  customerName: string;
  customerPhone: string;
  items: CartLine[];
  fulfillment: Fulfillment;
  total: number;
  status: OrderStatus;
  createdAt: Timestamp | null;
}

interface PlaceOrderInput {
  userId: string | null;
  customerName: string;
  customerPhone: string;
  items: CartLine[];
  fulfillment: Fulfillment;
  total: number;
}

const ORDERS_COLLECTION = 'orders';

export async function placeOrder(input: PlaceOrderInput): Promise<string> {
  const ref = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...input,
    status: 'pending' as OrderStatus,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function watchMyOrders(
  userId: string,
  onData: (orders: OrderRecord[]) => void,
  onError: (err: Error) => void
) {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderRecord))
      );
    },
    onError
  );
}

export function watchAllOrders(
  onData: (orders: OrderRecord[]) => void,
  onError: (err: Error) => void
) {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderRecord))
      );
    },
    onError
  );
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await updateDoc(doc(db, ORDERS_COLLECTION, orderId), { status });
}
