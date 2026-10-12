'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X, User } from 'lucide-react';
import { useAuth } from './AuthContext';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container header">
        <Link href="/">
          <img className="logo" src="/assets/img/staircase-logo.png" alt="STAIRCASE" />
        </Link>

        <nav className={isOpen ? 'open' : ''}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            href="/account"
            className="account-link"
            aria-label="My account"
          >
            <User size={20} />
            {user && <span className="account-dot" />}
          </Link>

          <button
            className="toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
