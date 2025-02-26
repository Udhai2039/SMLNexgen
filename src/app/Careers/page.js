"use client";
import { useEffect } from "react";
import styles from "./styles/career.module.css";
import Footer from "./components/footer";

const ScrollIcon = () => {
  const handleClick = () => {
    const target = document.getElementById('slide');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.scrollIcon} onClick={handleClick}></div>
  );
};

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className={`${styles.landingPage} ${styles.section}`}>
        <section className={styles.sectionContent}>
          <h1><span>Careers</span></h1>
          <p><span>Let&apos;s Build the Future Together.</span></p>
          <p><span>Since 2024</span></p>
        </section>
        <div id="smlname" className={styles.smlname}>
          <p>SML</p>
        </div>
        <div id="ScrollDown" className={styles.scrollDown}>
          <ScrollIcon />
        </div>
      </div>

      <div className={`${styles.slide1} ${styles.section}`}>
        <div id="slide" className={styles.slide}>
          <h1>Lets Grow Together!</h1>
          <p>At SML NexGen, we believe in pushing boundaries and creating next-generation solutions that drive innovation. We are a team of passionate professionals committed to excellence, creativity, and continuous learning. If you’re looking for an exciting career where your ideas matter, your skills are valued, and your growth is prioritized, you’ve come to the right place.</p>
        </div>
        <div id="ImageContainer" className={styles.imageContainer}>
          <img src="/grow.jpg" alt="Grow Together" />
        </div>
      </div>

      <div className={`${styles.slide2} ${styles.section}`}>
        <div id="ImageContainer" className={styles.imageContainer}>
          <img src="/Careers/why.png" alt="Why SMLNEXGEN" />
        </div>
        <div id="slide" className={styles.slide}>
          <h1>Why SMLNEXGEN?</h1>
          <p>Life at SML NexGen is about innovation, teamwork, and growth. We work together to create a space where everyone can succeed. We welcome new ideas and support each other as a team. Learning is important to us, so we offer training, workshops, and mentorship. Hard work is always appreciated and rewarded. We value diversity because different ideas make us better. We also make time for fun with team outings and activities. With flexible work options, we help maintain a good work-life balance, making SML NexGen a great place to work.</p>
        </div>
      </div>

      <div className={`${styles.slide3} ${styles.section}`}>
        <div id="slide" className={styles.slide}>
          <h1>Life at SMLNEXGEN</h1>
          <p>At SML NexGen, we focus on innovation, teamwork, and growth. We welcome new ideas and use the latest technology to stay ahead. Working together is key to our success, helping everyone do their best. We support learning through training, workshops, and mentorship to help careers grow. Hard work is always noticed, and we celebrate achievements. We value diversity, as different ideas bring creativity. Our workplace is fun with team outings and activities. With flexible work options, we ensure a good work-life balance, making SML NexGen a great place to grow and succeed.</p>
        </div>
        <div id="ImageContainer" className={styles.imageContainer}>
          <img src="Careers/life3.png" alt="life of smlnexgen" />
        </div>
      </div>
      <div className={`${styles.slide4} ${styles.section}`} id="target-section">
        <div id="ImageContainer" className={styles.imageContainer}>
          <img src="/hiring.jpg" alt="Hiring Process" />
        </div>
        <div id="slide" className={styles.slide}>
          <h1>Hiring Process</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deleniti quo odit dolorum laudantium aut magnam impedit. Placeat magni at culpa ex.</p>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}