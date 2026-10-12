import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config values are not secret — they identify the project,
// not authorize access (that's what Firebase security rules are for) —
// so it's safe for this to be committed and shipped to the client.
const firebaseConfig = {
  apiKey: 'AIzaSyA8O37ODL0VNSbYiavP3fT_wAgAJK955Tg',
  authDomain: 'staircase-73aaf.firebaseapp.com',
  projectId: 'staircase-73aaf',
  storageBucket: 'staircase-73aaf.firebasestorage.app',
  messagingSenderId: '366521379078',
  appId: '1:366521379078:web:bcc553dc7af0aeb5795687',
  measurementId: 'G-NY13P017T8',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Emails allowed into /admin. Enforced here for the UI gate AND in
// Firestore security rules (rules are the real enforcement — this
// list alone would not stop someone from reading data directly).
export const ADMIN_EMAILS = ['itscouragej@gmail.com'];
