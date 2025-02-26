'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/nav.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Optional: Close menu when a nav link is clicked
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`${styles.navbarContainer} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.logo}>
        <a href="#wrapper">
          <Image src="/sml-logo.png" alt="logo" width={100} height={100} />
        </a>
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <a href="#Studio" onClick={closeMenu}>Apply Now</a>
        <a href="#Works" onClick={closeMenu}>Recruitment fraud alert</a>
        <a href="#About" onClick={closeMenu}>Support</a>
        <a href="#codeby" onClick={closeMenu}>Login</a>
      </nav>
    </header>
  );
};

export default Navbar;
