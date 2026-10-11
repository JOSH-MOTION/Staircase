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
