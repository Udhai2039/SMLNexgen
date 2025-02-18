'use client';

import React, { useRef, useEffect } from 'react';
import styles from './page.module.css';

function Card({ image }) {
  const cardRef = useRef(null);
  const boundsRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const rotateToMouse = (e) => {
      if (!boundsRef.current) return;
      const bounds = boundsRef.current;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;

      const glow = card.querySelector(`.${styles.glow}`);
      if (glow) {
        glow.style.backgroundImage = `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #ffffff55,
            #0000000f
          )
        `;
      }
    };

    const handleMouseEnter = () => {
      boundsRef.current = card.getBoundingClientRect();
      document.addEventListener('mousemove', rotateToMouse);
    };

    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', rotateToMouse);
      card.style.transform = '';
      const glow = card.querySelector(`.${styles.glow}`);
      if (glow) {
        glow.style.backgroundImage = '';
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', rotateToMouse);
    };
  }, []);

  return (
    <div
      className={styles.card}
      ref={cardRef}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.glow} />
    </div>
  );
}

export default function Insights() {
  return (
    <div id='blog' className={styles.page}>
      <h1 className={styles.heading}>INSIGHTS</h1>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          <div className={styles.cardWrapper}>
            <Card image="/ai.jpg" />
            <div className={styles.cardDate}>
              15 Aug 2024 | Tech Innovations | Technology
            </div>
            <div className={styles.cardTitle}>
              How AI is Transforming Industries
            </div>
            <div className={styles.cardDescription}>
              {"Discover the latest advancements in AI and how they're reshaping the landscape across various sectors. From automation to predictive analytics, AI is a game-changer."}
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card image="/datasecurity.jpg" />
            <div className={styles.cardDate}>
              23 Aug 2024 | Digital Transformation | Business
            </div>
            <div className={styles.cardTitle}>
              The Future of Digital Transformation
            </div>
            <div className={styles.cardDescription}>
              {"As businesses increasingly adopt digital strategies, learn about the trends and technologies that are driving this evolution and what to expect in the coming years."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
