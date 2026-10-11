'use client';

import { useState } from 'react';
import Contact from './Contact';
import Notice from './Notice';

export default function ContactPageClient() {
  const [notice, setNotice] = useState('');

  return (
    <>
      <Contact onNotify={setNotice} />
      <Notice message={notice} onClose={() => setNotice('')} />
    </>
  );
}
