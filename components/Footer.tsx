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
            <strong>Phone:</strong> 0539026605 / 0504075802
            <br />
            <strong>Email:</strong> contact@favoriefoods.com
          </p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href="https://x.com/favoriefoods"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
            >
              X / Twitter
            </a>
            <a
              href="https://snapchat.com/t/StzhqvTn"
              target="_blank"
              rel="noreferrer"
              aria-label="Snapchat"
            >
              Snapchat
            </a>
            <a
              href="https://instagram.com/favorie_"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="copyright">
        © {currentYear} Favorie Foods · All Rights Reserved
      </div>
    </footer>
  );
}
