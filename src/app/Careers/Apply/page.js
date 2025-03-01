"use client";
import React, { useState, useEffect } from "react";
import styles from "./apply.module.css";
import Openings from "../components/Openings";

const ApplyPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup file URL on component unmount
  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      if (fileURL) URL.revokeObjectURL(fileURL); // Cleanup previous URL
      setSelectedFile(file);
      setFileURL(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileURL) URL.revokeObjectURL(fileURL);
    setFileURL(null);
    const fileInput = document.getElementById("resume");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      // Example API call (uncomment and replace with actual endpoint):
      // await fetch('/api/submit-application', {
      //   method: 'POST',
      //   body: formData,
      // });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.apply__page}>
      <header className={styles.apply__header}>
        <p className={styles.apply__subheading}>
        &quot;Join a Team That&apos;s Redefining Technology&quot;
        </p>
      </header>

      <section>
        <h2 className={styles.apply__sectionHeader}>Current Openings</h2>
        <Openings />
      </section>

      <section className={styles.apply__applicationForm}>
        <h2 className={styles.apply__sectionHeader}>Apply Now</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.apply__formGrid}>
            <div className={styles.apply__formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
              />
            </div>

            <div className={styles.apply__formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="xyz@example.com"
              />
            </div>

            <div className={styles.apply__formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+91 (923) 000-0000"
              />
            </div>

            <div className={styles.apply__formGroup}>
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                required
                placeholder="Select Position"
              />
            </div>
          </div>

          <div className={styles.apply__formGroup}>
            <label htmlFor="experience">Professional Experience</label>
            <textarea
              id="experience"
              name="experience"
              rows="4"
              required
              placeholder="Tell us about your relevant experience..."
            ></textarea>
          </div>

          <div className={styles.apply__formGroup}>
            <label htmlFor="resume">Resume/CV</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              required
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className={styles.apply__filePreview}>
              <p>
                <strong>Uploaded File:</strong>{" "}
                <a href={fileURL} target="_blank" rel="noopener noreferrer">
                  {selectedFile.name}
                </a>
              </p>
              <div className={styles.apply__fileActions}>
                <button
                  type="button"
                  className={styles.apply__fileButton}
                  onClick={() => window.open(fileURL, "_blank")}
                >
                  Preview PDF
                </button>
                <button
                  type="button"
                  className={styles.apply__fileButton}
                  onClick={handleRemoveFile}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={styles.apply__submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ApplyPage;