"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function JobAlertsPage() {
  const [jobAlerts, setJobAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobAlerts = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://192.168.0.197:5000";
        const response = await fetch(`${backendUrl}/api/job-alerts`);
        if (!response.ok) {
          throw new Error("Failed to fetch job alerts");
        }
        const data = await response.json();
        setJobAlerts(data);
      } catch (err) {
        console.error("Error fetching job alerts:", err);
        setError("Error fetching job alerts.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobAlerts();
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
        Back to Dashboard
      </Link>
      <h1>Job Alerts</h1>
      {loading ? (
        <p>Loading job alerts...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : jobAlerts.length === 0 ? (
        <p>No job alerts found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {jobAlerts.map((alert, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{alert.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
