import React from 'react';
import Link from 'next/link';
import styles from '../styles/OurProjects.module.css';

const cards = [
  {
    title: 'Mr.Monitor',
    copy: 'An advanced ERP solution tailored for B2B businesses.',
    image: '/mr-monitor.png',
    link: 'https://mr-monitor.com/' // Update with the actual Next.js route
  },
  {
    title: 'Fechzo',
    copy: 'A one-stop destination for a wide range of products including groceries, electronics, fresh food, and household items.',
    image: '/fechzo.png'
  },
  {
    title: 'AkashKrish Toyota',
    copy: "We developed a comprehensive web platform for AkashKrish Toyota.",
    image: '/toyota.png'
  },
  {
    title: 'Ticketing System',
    copy: 'An efficient platform for customers to report and track issues in real-time.',
    image: '/ticket.png'
  }
];

export default function OurProjects() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>OUR PROJECTS</h1>
      <main className={styles.pageContent}>
        {cards.map((card, index) => (
          card.link ? (
            <Link 
              key={index} 
              href={card.link} 
              className={styles.card}
              style={{ "--bg-image": `url(${card.image})` }}
            >
              <div className={styles.content}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.copy}>{card.copy}</p>
              </div>
            </Link>
          ) : (
            <div 
              key={index} 
              className={styles.card} 
              style={{ "--bg-image": `url(${card.image})` }}
            >
              <div className={styles.content}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.copy}>{card.copy}</p>
              </div>
            </div>
          )
        ))}
      </main>
    </div>
  );
}