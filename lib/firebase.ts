import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config values are not secret — they identify the project,
// not authorize access (that's what Firebase security rules are for) —
// so it's safe for this to be committed and shipped to the client.
const firebaseConfig = {
  apiKey: 'AIzaSyABanIevxrWG1uy5lz6FlJWfwdGbAAhQk8',
  authDomain: 'staircase-d0575.firebaseapp.com',
  projectId: 'staircase-d0575',
  storageBucket: 'staircase-d0575.firebasestorage.app',
  messagingSenderId: '951612003134',
  appId: '1:951612003134:web:235b8fb8f4ca9fe019126f',
  measurementId: 'G-RSYKZHPRCD',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Emails allowed into /admin. Enforced here for the UI gate AND in
// Firestore security rules (rules are the real enforcement — this
// list alone would not stop someone from reading data directly).
export const ADMIN_EMAILS = ['itscouragej@gmail.com'];
