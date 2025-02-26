'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // App Router
import Cookies from 'js-cookie';
import styles from './dashboard.module.css'; // Adjust path if needed

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      router.push('/Admin');
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    router.push('/Admin');
  };

  const authToken = Cookies.get('authToken');
  if (!authToken) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.header}>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>

        <div className={styles.dashboardGrid}>
          <Link href="/Admin/Dashboard/Bookings" className={styles.dashboardBox}>
            Booking
          </Link>
          <Link href="/Admin/Dashboard/Contacts" className={styles.dashboardBox}>
            Contact
          </Link>
          <div className={styles.dashboardBox}>Job Applications</div>
          <Link href="/Admin/Job-postings" className={styles.dashboardBox}>
            Job Postings
          </Link>
        </div>
      </div>
    </div>
  );
}