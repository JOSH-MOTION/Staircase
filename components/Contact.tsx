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
            title="Favorie Foods Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.790443317469!2d-1.5658154264945927!3d6.672867621412632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb95b09e004b97%3A0xcfef7dcfcf76769c!2sFavorie%20Foods!5e0!3m2!1sen!2sgh!4v1735408101800!5m2!1sen!2sgh"
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
                <b>Call Us</b>
                <p>
                  <a href="tel:0539026605">0539026605</a> /{' '}
                  <a href="tel:0504075802">0504075802</a>
                </p>
              </div>
            </div>

            <div>
              <Mail />
              <div>
                <b>Email Us</b>
                <p>
                  <a href="mailto:contact@favoriefoods.com">
                    contact@favoriefoods.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <Clock />
              <div>
                <b>Opening Hours</b>
                <p>
                  <strong>Everyday:</strong> 10AM – 12AM
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
