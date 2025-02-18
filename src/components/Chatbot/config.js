import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import AppointmentForm from "./AppointmentForm";  // Import the AppointmentForm component

const config = {
  botName: "SMLBot",
  initialMessages: [
    createChatBotMessage("Hello! Welcome to SMLNEXGEN LLP. How can I assist you today?", {
      widget: "options", // Trigger options menu
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          { label: "Services", action: "handleServices" },
          { label: "Web Development", action: "handleWebDevelopment" },
          { label: "App Development", action: "handleAppDevelopment" },
          { label: "Custom Software", action: "handleCustomSoftwareDevelopment" },
          { label: "About Us", action: "handleAbout" },
          { label: "Support", action: "handleSupport" },
          { label: "Book an Appointment", action: "handleAppointmentBooking" }, // Added appointment option
        ],
      },
    },
    {
      widgetName: "appointmentForm",
      widgetFunc: (props) => <AppointmentForm {...props} />, // Your custom appointment form component
    },
  ],
};

export default config;
