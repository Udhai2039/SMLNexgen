'use client';
import { useRouter, useParams } from 'next/navigation'; // App Router
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import DynamicTable from '../components/DynamicTable'; // Adjust path
import Link from 'next/link';
import styles from '../dashboard.module.css'; // Adjust path

export default function DashboardSlug() {
  const router = useRouter();
  const { slug } = useParams(); // App Router uses useParams for dynamic params

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      router.push('/Admin');
    }
  }, [router]);

  const dataTypeMap = {
    Bookings: 'booking',
    Contacts: 'contact',
  };

  const dataType = dataTypeMap[slug] || null;

  const authToken = Cookies.get('authToken');
  if (!authToken) {
    return <div>Loading...</div>;
  }

  if (!dataType && slug) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <h1 className={styles.dashboardTitle}>Invalid Section</h1>
          <Link href="/Admin/Dashboard" className={styles.backLink}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.header}>
          <h1 className={styles.dashboardTitle}>
            {slug === 'bookings' ? 'Bookings' : 'Contacts'}
          </h1>
          {/* <button
            onClick={() => {
              Cookies.remove('authToken');
              router.push('/Admin/Login');
            }}
            className={styles.logoutButton}
          >
            Logout
          </button> */}
        </div>
        <Link href="/Admin/Dashboard" className={styles.backLink}>
          Back to Dashboard
        </Link>
        {dataType && <DynamicTable dataType={dataType} />}
      </div>
    </div>
  );
}