"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights/page";
import OurProjects from "@/components/OurProjects";
// import Proj2 from "@/app/Proj2/page";
import LogoGrid from "@/components/ClientSection";

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
      <Hero />  
      <Insights />
      <OurProjects />
      {/* <Proj2 /> */}
      <LogoGrid />
    </main>
  );
}
