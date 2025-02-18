"use client";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Home from "./Home";
import Gallery from "./Gallary";
import styles from "./Page.module.css"; // Updated CSS Module
import "./404.module.css";
import Link from "next/link";
import Portfolio from "@/components/Portfolio";

// Portfolio Data
const boxData = {
  "1": {
    title: "Web Development",
    description:
      "SMLNEXGEN LLP provides comprehensive web development services to create responsive, SEO-friendly, and highly secure websites. Our expert team ensures a seamless, user-centric experience tailored to your business needs.",
    image: "/vi.gif",
  },
  "2": {
    title: "App Development",
    description:
      "We design and develop cutting-edge, user-friendly mobile and web applications tailored to your business needs, ensuring seamless functionality and scalability.",
    image: "/vi2.gif",
  },
  "4": {
    title: "Software Development",
    description:
      "We specialize in designing and developing high-performance mobile and web applications using the latest technologies.",
    image: "/vi4.gif",
  },
  "5": {
    title: "Business Automations",
    description:
      "Optimize workflows and enhance productivity with AI-driven business automation solutions from SMLNEXGEN LLP.",
    image: "/vi5.gif",
  },
  "6": {
    title: "Business Solutions",
    description:
      "Boost efficiency with our intelligent automation solutions, designed to eliminate repetitive tasks and enhance workflow optimization.",
    image: "/vi6.gif",
  },
};

export default function PortfolioPage() {
  const { id } = useParams();
  const box = boxData[id];
  const contentRef = useRef(null);

  // Scroll to the content on page load
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id]); // Re-run when the ID changes

  if (!box) {
    return (
      <section className={styles.page_404}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col_sm_12}>
              <div className={`${styles.col_sm_10} ${styles.text_center}`}>
                <div className={styles.four_zero_four_bg}>
                  <h1>404</h1>
                </div>
                <div className={styles.contant_box_404}>
                  <h3>{"Looks like you're lost"}</h3>
                  <p>The page you are looking for is not available!</p>
                  <Link href="/" className={styles.link_404}>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Portfolio />

      {/* Scroll target */}
      <div ref={contentRef} className={styles.contentWrapper}>
        {/* Responsive Content Layout */}
        <div className={styles.flexContainer}>
          {/* Left Side - Image/GIF */}
          <div className={styles.imageContainer}>
            <Image
              src={box.image}
              alt={box.title}
              width={500}
              height={350}
              className={styles.responsiveImage}
              priority
              unoptimized
            />
          </div>

          {/* Right Side - Text Content */}
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{box.title}</h1>
            <p className={styles.description}>{box.description}</p>
          </div>
        </div>

        {/* Include Gallery & Home Content */}
        <div className={styles.galleryWrapper}>
          <Gallery />
          <Home />
        </div>
      </div>
    </>
  );
}
