"use client";
import { useEffect, useState } from "react";

// Import React Icons
import { FaUser, FaComment } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import styles from "@/styles/contact.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Lazy-load @google/model-viewer only when component mounts
    import("@google/model-viewer");
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required."; // Added validation
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div id="contact" className={styles.contactPage}>
      <h1 className={styles.title}>REACH US</h1>
      {/* Contact description */}
      <p className={styles.contactDescription}>
        Get in touch with SML NexGen LLP for AI, Cloud and Custom Software
        solutons. Let&apos;s innovate together - Schedule a free consultation today.
      </p>

      <div className={styles.contactContainer}>
        {/* Left side: Laptop animation */}
        <div className={styles.laptopContainer}>
          <model-viewer
            className={styles.model}
            alt="Laptop Model"
            src="/models/laptop.glb"
            shadow-intensity="1"
            camera-controls
            touch-action="pan-y"
            // environment-image="/models/dancing_hall_2k.hdr"
            exposure="1.5"
            disable-zoom
            disable-tap
            camera-orbit="-30deg 70deg 10m"
            field-of-view="35deg"
            interaction-prompt="auto"  // Helps guide mobile users
            ar  // Enable AR for mobile
            autoplay
            loading="eager"
          ></model-viewer>
        </div>

        {/* Right side: Minimal form */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <FaUser />
              </span>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}

            {/* Email */}
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <MdEmail />
              </span>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}

            {/* Phone */}
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <BsTelephone />
              </span>
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            {errors.phone && (
              <p className={styles.errorMessage}>{errors.phone}</p>
            )}

            {/* Message */}
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <FaComment /> {/* Replace this with the appropriate icon */}
              </span>
              <textarea
                id="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
              ></textarea>
            </div>
            {errors.message && (
              <p className={styles.errorMessage}>{errors.message}</p>
            )}

            {/* Buttons in a row */}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
