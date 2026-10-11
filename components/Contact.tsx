'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactProps {
  onNotify: (message: string) => void;
}

const reveal = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
};

export default function Contact({ onNotify }: ContactProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNotify('Your message has been sent. Thank you!');
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div {...reveal} className="section-title">
          <span className="eyebrow">We&apos;d love to hear from you</span>
          <h2>Contact Us</h2>
        </motion.div>

        {/* Google Maps Location Embed */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="map-container"
        >
          <iframe
            title="STAIRCASE Location Map"
            src="https://www.google.com/maps?q=Nana+Adoma+Hostel+Engineering+Gate+Ghana&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <div className="contact-grid">
          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="details"
          >
            <div>
              <MapPin />
              <div>
                <b>Locations</b>
                <p>
                  Nana Adoma Hostel, Engineering Gate.
                  <br />
                  New Site, Opposite Evandy Hostel
                </p>
              </div>
            </div>

            <div>
              <Phone />
              <div>
                <b>Call / WhatsApp</b>
                <p>
                  <a href="tel:0549920071">0549 920 071</a>
                </p>
              </div>
            </div>

            <div>
              <Mail />
              <div>
                <b>Email Us</b>
                <p>
                  <a href="mailto:itscouragej@gmail.com">
                    itscouragej@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <Clock />
              <div>
                <b>Opening Hours</b>
                <p>
                  <strong>Monday – Sunday:</strong> 9:00 AM – 11:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            {...reveal}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="form contact-form"
            onSubmit={handleSubmit}
          >
            <div>
              <input required placeholder="Your Name" />
              <input required type="email" placeholder="Your Email" />
            </div>
            <input required placeholder="Subject" />
            <textarea required rows={6} placeholder="Message" />
            <button type="submit" className="button red">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
