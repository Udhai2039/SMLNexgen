'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/nav.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { data: session, status } = useSession();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(`.${styles.userProfile}`)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleAuthClick = () => {
    if (session) {
      signOut({ callbackUrl: "/Careers/Apply" }); // Redirect to /Careers/Apply after logout
    } else {
      signIn("credentials");
    }
    closeMenu();
    closeDropdown();
  };

  return (
    <header className={`${styles.navbarContainer} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.logo}>
        <a href="/Careers">
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
        <a href="/Careers/Apply" onClick={closeMenu}>Apply Now</a>
        <a href="/Careers/RecuirtmentFraud" onClick={closeMenu}>Recruitment fraud alert</a>
        {/* <a href="#About" onClick={closeMenu}>Support</a> */}
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <div
            className={styles.userProfile}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          >
            <span className={styles.userName}>{session.user.name || "User"}</span>
            {session.user.image && (
              <Image src={session.user.image} alt="Profile" width={30} height={30} className={styles.profileImage} />
            )}
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <a href="/Careers/ProfileView" onClick={closeMenu}><FaUser className={styles.dropdownIcon} /> Profile</a>
                <a href="/Careers/JobApplications" onClick={closeMenu}><FaCog className={styles.dropdownIcon} /> My Activity</a>
                <a href="#" onClick={handleAuthClick}><FaSignOutAlt className={styles.dropdownIcon} /> Logout</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/Careers/Login" onClick={handleAuthClick}>Login</a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;