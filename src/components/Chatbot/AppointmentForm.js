import { useState } from "react";
import styles from "./AppointmentForm.module.css"; // Assuming your CSS file is named AppointmentForm.module.css

const AppointmentForm = ({ actionProvider }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New phone number field
  const [dateTime, setDateTime] = useState("");
  const [reason, setReason] = useState("");
  const [selectedService, setSelectedService] = useState(""); // New service selection field

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send appointment data to ActionProvider for confirmation
    actionProvider.handleAppointmentConfirmation({
      fullName,
      email,
      phoneNumber,
      dateTime,
      reason,
      selectedService,
    });
  };

  return (
    <div className={styles.appointmentFormContainer}>
      <div className={styles.formTitle}>Book Your Appointment</div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="^[+]?[0-9]{10,13}$" // Optional: You can validate phone number format
            placeholder="Enter your phone number"
          />
        </label>
        <label>
          Preferred Date/Time:
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </label>
        <label>
          Select Service:
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Select a Service</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Custom Software">Custom Software</option>
            <option value="IT Support">IT Support</option>
          </select>
        </label>
        <label>
          Reason for Appointment:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Appointment</button>
      </form>
      <div className={styles.formFooter}>
        By submitting, you agree to our terms and conditions.
      </div>
    </div>
  );
};

export default AppointmentForm;
