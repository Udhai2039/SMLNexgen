"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
// import AboutUs from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Insights from "@/components/Insights/page";
import OurProjects from "@/components/OurProjects";
import LogoGrid from "@/components/ClientSection";
// import ContactForm from "@/components/ContactForm";
import ChatbotComponent from "@/components/Chatbot/Chatbot";
// import Footer from "@/components/Footer/Footer";
import SocialMedia from "@/components/SocialMedia";

export default function Home() {
  const [theme, setTheme] = useState("dark"); // Default theme for other sections is 'dark' (black icons)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 0.8) {
        setTheme("light");  // Hero section → White icons
      } else {
        setTheme("dark");  // Other sections → Black icons
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {/* Show SocialMedia in Hero with white icons */}
      <Hero />  
      
      {/* Show SocialMedia with the current theme (dark or light) */}
      {/* <SocialMedia theme={theme} />   */}
      
      {/* <AboutUs /> */}
      {/* <Portfolio /> */}
      <Insights />
      <OurProjects />
      <LogoGrid />

      {/* <ContactForm /> */}
      {/* <ChatbotComponent /> */}
      {/* <Footer /> */}
    </main>
  );
}
