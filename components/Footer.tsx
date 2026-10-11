import Link from 'next/link';

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <img className="logo" src="/assets/img/staircase-logo.png" alt="STAIRCASE" />
          <p>Irresistible taste.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <div className="footer-links">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Locations</h3>
          <p>
            Nana Adoma Hostel, Engineering Gate.
            <br />
            New Site, Opposite Evandy Hostel
          </p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <strong>Phone / WhatsApp:</strong> 0549 920 071
            <br />
            <strong>Email:</strong> itscouragej@gmail.com
          </p>
        </div>
      </div>

      <div className="copyright">
        © {currentYear} STAIRCASE · All Rights Reserved
      </div>
    </footer>
  );
}
