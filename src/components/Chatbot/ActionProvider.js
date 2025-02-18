import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  addMessageToState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleAppointmentConfirmation({ fullName, email, phoneNumber, dateTime, reason, selectedService }) {
    const message = this.createChatBotMessage(
      `Your appointment has been successfully booked!\n\n` +
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone Number: ${phoneNumber}\n` +
      `Service: ${selectedService}\n` +
      `Preferred Date/Time: ${dateTime}\n` +
      `Reason: ${reason}\n\n` +
      `We will contact you soon. Thank you!`
    );
    this.addMessageToState(message);
  }
  handleHello() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.addMessageToState(message);
  }

  handleGoodbye() {
    const message = this.createChatBotMessage("Goodbye! Have a great day. Feel free to reach out anytime. 😊");
    this.addMessageToState(message);
  }

  handleAppointmentBooking() {
    const message = this.createChatBotMessage("Let's get started with booking your appointment! Please provide the following details:", {
      widget: "appointmentForm", // Use a custom widget to show the form
    });
    this.addMessageToState(message);
  }

  handleServices() {
    const message = this.createChatBotMessage(
      "We offer Web Development, App Development, Custom Software, and IT Support."
    );
    this.addMessageToState(message);
  }

  handleWebDevelopment() {
    const message = this.createChatBotMessage(
      "We provide frontend, backend, and full-stack web solutions, including React, Next.js, Node.js, and more."
    );
    this.addMessageToState(message);
  }

  handleAppDevelopment() {
    const message = this.createChatBotMessage(
      "We build secure, high-performance mobile and web apps for iOS, Android, and cross-platform solutions."
    );
    this.addMessageToState(message);
  }

  handleCustomSoftwareDevelopment() {
    const message = this.createChatBotMessage(
      "We develop custom software solutions tailored to your business needs, ensuring scalability and efficiency."
    );
    this.addMessageToState(message);
  }

  handleSupport() {
    const message = this.createChatBotMessage(
      "Need help? Contact us at smlnexgenllp@gmail.com or call +91-94870-84117."
    );
    this.addMessageToState(message);
  }

  handleAbout() {
    const message = this.createChatBotMessage(
      "SMLNEXGEN LLP specializes in innovative software solutions, web & app development, and IT support to help businesses grow in the digital age."
    );
    this.addMessageToState(message);
  }

  handleKeywordResponse(keyword) {
    let response = "";

    switch (keyword) {
      case "development":
        response =
          "We specialize in web and app development, offering modern solutions using cutting-edge technologies like React, Next.js, and Node.js.";
        break;

      case "software":
        response =
          "Our software solutions include custom applications, enterprise software, and AI-powered tools to optimize business processes.";
        break;

      case "security":
        response =
          "We ensure top-tier security for your applications with best practices, encryption, and compliance with industry standards.";
        break;

      case "pricing":
        response =
          "Our pricing varies based on project scope and complexity. Contact us for a tailored quote that suits your business needs.";
        break;

      case "support":
        response =
          "We offer 24/7 IT support, troubleshooting, and maintenance to keep your systems running smoothly.";
        break;

      case "contact":
        response =
          "Get in touch with us at smlnexgenllp@gmail.com or call +91-94870-84117 for any inquiries.";
        break;

      default:
        response =
          "I’m not sure I understand. Here are some topics I can help with: Web Development, App Development, Software, IT Support.";
        break;
    }

    const message = this.createChatBotMessage(response);
    this.addMessageToState(message);
  }

  handleDefault(userMessage) {
    const keywords = ["development", "software", "security", "pricing", "support", "contact"];
    const greetings = ["hello", "hi", "hey"];
    const farewellWords = ["bye", "goodbye", "see you", "take care"];

    const lowerMessage = userMessage.toLowerCase();

    // Check if message is a greeting
    if (greetings.some((word) => lowerMessage.includes(word))) {
      this.handleHello();
      return;
    }

    // Check if message is a farewell
    if (farewellWords.some((word) => lowerMessage.includes(word))) {
      this.handleGoodbye();
      return;
    }

    // Check for keywords
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        this.handleKeywordResponse(keyword);
        return;
      }
    }

    // Default response
    const defaultMessage = this.createChatBotMessage(
      "I'm not sure I understand. Can you please provide more details?"
    );
    this.addMessageToState(defaultMessage);
  }
}

export default ActionProvider;
