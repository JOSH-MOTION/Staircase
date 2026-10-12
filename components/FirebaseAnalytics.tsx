'use client';

import { useEffect } from 'react';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseApp } from '../lib/firebase';

export default function FirebaseAnalytics() {
  useEffect(() => {
    isSupported()
      .then((supported) => {
        if (supported) getAnalytics(firebaseApp);
      })
      .catch(() => {
        // Analytics isn't supported in this environment (e.g. blocked
        // storage/cookies) — fail silently, it's non-critical.
      });
  }, []);

  return null;
}
