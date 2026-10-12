import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

export interface PriceOption {
  label: string;
  price: string;
}

export type MenuCategory =
  | 'Main Dishes'
  | 'Fluffy Pancakes'
  | 'Ice Cream'
  | 'Strawberry Treats'
  | 'Cocktails & Drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  group: 'Food' | 'Desserts' | 'Drinks';
  detail: string;
  price: string;
  priceOptions?: PriceOption[];
  image: string;
  badge?: string;
  highlights?: string;
  sortOrder?: number;
}

export const CATEGORIES = [
  { id: 'All', label: 'All Menu' },
  { id: 'Main Dishes', label: 'Main Dishes' },
  { id: 'Fluffy Pancakes', label: 'Fluffy Pancakes' },
  { id: 'Ice Cream', label: 'Ice Cream' },
  { id: 'Strawberry Treats', label: 'Strawberry Treats' },
  { id: 'Cocktails & Drinks', label: 'Cocktails & Drinks' },
] as const;

// The menu this site shipped with — used both as the seed data for
// Firestore (written once by an admin from /admin) and as a fallback
// so the site still renders a full menu before that seeding happens
// or if Firestore is briefly unreachable.
export const DEFAULT_PRODUCTS: MenuItem[] = [
  // MAIN DISHES (FOOD)
  {
    id: 'seafood-premium',
    name: 'Seafood Premium Dish',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Chef special premium assorted seafood platter seasoned with aromatic herbs & spices.',
    price: 'GH₵ 130',
    image: 'menu/seafood-premium.jpg',
    badge: 'Chef Special',
    highlights: 'Fresh Catch',
    sortOrder: 0,
  },
  {
    id: 'jollof-goat',
    name: 'Jollof with Goat',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Signature smoky Ghanaian jollof rice served with tender seasoned goat meat and shito dip.',
    price: 'GH₵ 90',
    image: 'menu/jollof-goat.jpg',
    badge: 'Most Popular',
    highlights: 'Tender Goat Meat',
    sortOrder: 1,
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Savory stir-fried rice seasoned with fresh garden vegetables, eggs, spices and pepper relish.',
    price: 'GH₵ 90',
    image: 'menu/fried-rice.jpg',
    highlights: 'Aromatic Wok Fried',
    sortOrder: 2,
  },
  {
    id: 'banku-tilapia',
    name: 'Banku & Tilapia',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Freshly grilled seasoned tilapia served with hot banku, spicy pepper sauce & sliced garnishes.',
    price: 'GH₵ 90',
    image: 'menu/seafood-premium.jpg',
    highlights: 'Hot & Fresh',
    sortOrder: 3,
  },
  {
    id: 'seasonal-rice',
    name: 'Seasonal Jollof / Fried Rice',
    category: 'Main Dishes',
    group: 'Food',
    detail: 'Special single portion of our signature authentic jollof or fried rice.',
    price: 'GH₵ 45',
    image: 'menu/fried-rice.jpg',
    highlights: 'Quick Bite',
    sortOrder: 4,
  },

  // FLUFFY PANCAKES (DESSERTS)
  {
    id: 'pancakes-nutella',
    name: 'Nutella Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Warm, golden fluffy pancakes generously drizzled with rich velvety Nutella chocolate.',
    price: 'GH₵ 45',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 45' },
      { label: '12 Pcs', price: 'GH₵ 75' },
    ],
    image: 'menu/waffles.png',
    highlights: 'Fluffy & Warm',
    sortOrder: 5,
  },
  {
    id: 'pancakes-honey',
    name: 'Honey Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Light, cloud-soft fluffy pancake stack glazed with pure natural golden honey.',
    price: 'GH₵ 40',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 40' },
      { label: '12 Pcs', price: 'GH₵ 65' },
    ],
    image: 'menu/waffles.png',
    highlights: 'Pure Honey Glaze',
    sortOrder: 6,
  },
  {
    id: 'pancakes-nutella-strawberry',
    name: 'Nutella & Strawberry Pancakes',
    category: 'Fluffy Pancakes',
    group: 'Desserts',
    detail: 'Fluffy pancakes layered with rich Nutella and topped with fresh sliced sweet strawberries.',
    price: 'GH₵ 55',
    priceOptions: [
      { label: '6 Pcs', price: 'GH₵ 55' },
      { label: '12 Pcs', price: 'GH₵ 90' },
    ],
    image: 'menu/waffles.png',
    badge: 'Customer Favorite',
    highlights: 'Fresh Berries',
    sortOrder: 7,
  },

  // ICE CREAM (DESSERTS)
  {
    id: 'icecream-vanilla',
    name: 'Classic Vanilla Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: '4.8 oz rich and creamy Madagascar vanilla scoop. Includes 2 regular toppings of your choice.',
    price: 'GH₵ 30',
    image: 'menu/icecream.png',
    highlights: 'Includes 2 Toppings',
    sortOrder: 8,
  },
  {
    id: 'icecream-strawberry',
    name: 'Strawberry Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Crafted with ripe strawberries and creamy swirl for an irresistible berry sensation.',
    price: 'GH₵ 30',
    image: 'hero-ice.png',
    badge: 'Signature',
    highlights: 'STAIRCASE Recipe',
    sortOrder: 9,
  },
  {
    id: 'icecream-biscoff',
    name: 'Lotus Biscoff Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Velvety ice cream infused with crunchy caramelized Lotus Biscoff biscuit crumbles & sauce.',
    price: 'GH₵ 40',
    image: 'menu/cakeincup.png',
    badge: 'Top Pick',
    highlights: 'Caramelized Crunch',
    sortOrder: 10,
  },
  {
    id: 'icecream-chocolate',
    name: 'Chocolate Ice Cream',
    category: 'Ice Cream',
    group: 'Desserts',
    detail: 'Intense, silky smooth dark cocoa scoop crafted for the true chocolate enthusiast.',
    price: 'GH₵ 40',
    image: 'menu/cakeincup.png',
    highlights: 'Rich Cocoa',
    sortOrder: 11,
  },

  // STRAWBERRY TREATS (DESSERTS)
  {
    id: 'strawberry-sticks',
    name: 'Strawberry Sticks',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Freshly skewered hand-picked strawberries dipped in rich warm Belgian melted chocolate.',
    price: 'GH₵ 35',
    image: 'menu/cupcake.png',
    highlights: 'Fresh Skewers',
    sortOrder: 12,
  },
  {
    id: 'dubai-strawberry-cup',
    name: 'Dubai Strawberry Cup',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Gourmet dessert cup with fresh strawberries, velvety cream and nutty pistachio drizzle.',
    price: 'GH₵ 50',
    image: 'hero-ice.png',
    badge: 'Viral Dubai Trend',
    highlights: 'Pistachio Cream',
    sortOrder: 13,
  },
  {
    id: 'dubai-chocolate-cup',
    name: 'Dubai Chocolate Cup',
    category: 'Strawberry Treats',
    group: 'Desserts',
    detail: 'Decadent Dubai cup layered with crisp toasted knafeh and luscious melted chocolate ganache.',
    price: 'GH₵ 50',
    image: 'menu/cakeincup.png',
    badge: 'Trending',
    highlights: 'Crisp Knafeh & Choc',
    sortOrder: 14,
  },

  // COCKTAILS & DRINKS (DRINKS)
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    category: 'Cocktails & Drinks',
    group: 'Drinks',
    detail: 'Chilled, silky smooth yogurt shake freshly blended with sweet ripe tropical mangoes.',
    price: 'GH₵ 35',
    image: 'menu/piranha.jpg',
    highlights: 'Refreshing & Chilled',
    sortOrder: 15,
  },
  {
    id: 'piranha',
    name: 'Piranha Cocktail',
    category: 'Cocktails & Drinks',
    group: 'Drinks',
    detail: 'Vibrant layered house cocktail with tropical citrus zest, fruit punch, and fresh orange garnish.',
    price: 'GH₵ 40',
    image: 'menu/piranha.jpg',
    badge: 'House Special',
    highlights: 'Tropical Sunset Layer',
    sortOrder: 16,
  },
];

export const PREMIUM_TOPPINGS = ['Strawberry', 'Kiwi', 'Nutella', 'Biscoff', 'Pistachio'];

const MENU_COLLECTION = 'menu';

export function watchMenu(
  onData: (items: MenuItem[]) => void,
  onError: (err: Error) => void
) {
  const q = query(collection(db, MENU_COLLECTION), orderBy('sortOrder', 'asc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem)));
    },
    onError
  );
}

export async function saveMenuItem(item: MenuItem) {
  const { id, ...data } = item;
  await setDoc(doc(db, MENU_COLLECTION, id), data);
}

export async function deleteMenuItem(id: string) {
  await deleteDoc(doc(db, MENU_COLLECTION, id));
}

export async function seedMenuFromDefaults() {
  const batch = writeBatch(db);
  DEFAULT_PRODUCTS.forEach((item) => {
    const { id, ...data } = item;
    batch.set(doc(db, MENU_COLLECTION, id), data);
  });
  await batch.commit();
}

export async function updateMenuItemField(
  id: string,
  patch: Partial<MenuItem>
) {
  await updateDoc(doc(db, MENU_COLLECTION, id), patch);
}
