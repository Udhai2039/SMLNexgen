"use client";
import { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import AppointmentForm from "./AppointmentForm"; // Import the AppointmentForm component
import styles from "./Chatbot.module.css";

const ChatbotComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // State for form visibility

  const handleToggleChat = () => {
    if (showChat) {
      setAnimateClose(true);
      setTimeout(() => {
        setShowChat(false);
        setAnimateClose(false);
      }, 300); // Match animation duration
    } else {
      setShowChat(true);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Button with Icon */}
      <button className={styles.chatbotButton} onClick={handleToggleChat}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64" fill="white">
          <g>
            <circle cx="32" cy="32" r="28" stroke="black" strokeWidth="2" fill="#06038D" />
            <rect x="20" y="24" width="24" height="4" rx="2" ry="2" fill="white" />
            <rect x="20" y="32" width="24" height="4" rx="2" ry="2" fill="white" />
            <rect x="20" y="40" width="16" height="4" rx="2" ry="2" fill="white" />
            <circle cx="24" cy="20" r="2" fill="white" />
            <circle cx="40" cy="20" r="2" fill="white" />
          </g>
        </svg>
      </button>

      {showChat && (
        <div className={`${styles.chatbotBox} ${animateClose ? styles.hide : styles.show}`}>
          {/* Chat Header */}
          <div className={styles.chatbotHeader}>
            <span>Chat with Us</span>
            <button className={styles.closeButton} onClick={handleToggleChat} aria-label="Close Chat">✖</button>
          </div>

          {/* Chatbot Content */}
          <div className={styles.chatbotContent}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
            {formVisible && <AppointmentForm setState={setState} />} {/* Render form when triggered */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
