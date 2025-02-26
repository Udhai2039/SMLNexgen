"use client";

import { FaMapMarkerAlt, FaPhone, FaEnvelopeOpen, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        {/* CTA Section */}
        <div className={styles.footerCta}>
          <div className={styles.singleCta}>
            <FaMapMarkerAlt className={styles.icon} />
            <div className={styles.ctaText}>
              <h4>Find us</h4>
              <span>
                <a
                  href="https://maps.app.goo.gl/FriRZh1HgECXED12A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3B 2nd floor JPS TOWER, Thally main road, Hosur, Tamil Nadu, India, 635109
                </a>
              </span>
            </div>
          </div>
          <div className={styles.singleCta}>
            <FaPhone className={styles.icon} />
            <div className={styles.ctaText}>
              <h4>Call us</h4>
              <span>
                <a href="tel:+919487084117">
                  +91-94870-84117
                </a>
              </span>
            </div>
          </div>
          <div className={styles.singleCta}>
            <FaEnvelopeOpen className={styles.icon} />
            <div className={styles.ctaText}>
              <h4>Mail us</h4>
              <span>
                <a href="mailto:smlnexgenllp@gmail.com">
                  smlnexgenllp@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className={styles.footerContent}>
          {/* Logo & Social Links */}
          <div className={styles.footerWidget}>
            <Link href="/">
              <Image
                src="/sml-logo.png"
                width={100}
                height={50}
                alt="logo"
                className={styles.footerLogo}
              />
            </Link>
            <p>We are a tech-driven company dedicated to delivering innovative software solutions tailored to your business needs.</p>

            <div className={styles.footerSocial}>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </Link>
              <Link href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div className={styles.footerLinks}>
            <h3>Useful Links</h3>
            <ul>
              {["Home", "About", "Services", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>© 2025, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;