import "./globals.css";
import ShadowCursor from '@/components/Cursor/index';
import Navbar from "@/components/Navbar";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer/Footer";
import ChatbotComponent from "@/components/Chatbot/Chatbot";

// Metadata for the website
export const metadata = {
  title: "Custom Software & AI Solution | SML NexGen",
  description: "SML NEXGEN WEBSITE",
  robots: { index: true, follow: true },
  authors: [{ name: "SMLNEXGEN-LLP" }],
  openGraph: {
    title: "SMLNEXGEN LLP | Leading Digital Solutions for Web, Mobile & Marketing",
    description: "SMLNEXGEN LLP is a leading provider of innovative digital solutions, specializing in website development, mobile app creation, custom software, and digital marketing. Based in Hosur, Tamil Nadu, we help businesses navigate the digital landscape with ease and efficiency.",
    url: "https://your-website-url.com",
    images: [
      {
        url: 'https://your-website-url.com/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SMLNEXGEN",
    title: "SMLNEXGEN LLP | Leading Digital Solutions for Web, Mobile & Marketing",
    description: "SMLNEXGEN LLP is a leading provider of innovative digital solutions, specializing in website development, mobile app creation, custom software, and digital marketing. Based in Hosur, Tamil Nadu, we help businesses navigate the digital landscape with ease and efficiency.",
    images: ['https://your-website-url.com/og-image.jpg'],
  },
  // Keywords would typically not be part of metadata in this format, but you can add them here if needed
  // keywords: ["SMLNEXGEN LLP, digital solutions, website development, mobile app development, custom software development, digital marketing, strategic digital marketing, SEO services, eCommerce development, mobile app design, software solutions, digital transformation, IT consulting, web design, website redesign, mobile application solutions, IT Company Hosur,IT Bengaluru, Hosur, Tamil Nadu, India"],
};

export default function RootLayout({ children }) {

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SMLNEXGEN LLP",
    "url": "https://your-website-url.com",
    "logo": "https://your-website-url.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/your-company",
      "https://twitter.com/your-company",
      "https://www.linkedin.com/company/your-company"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": " (+91) 94870-84117",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Hosur",
      "addressRegion": "Tamil Nadu",
      "postalCode": "635109",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Global SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        <meta name="description" content="SML NexGen LLP - AI-driven software, cloud solutions, & IT consulting. Future-proof your business with innovative technology. Contact us today!" />
        <meta
          name="keywords"
          content="SMLNEXGEN LLP, digital solutions, website development, mobile app development, custom software development, digital marketing, strategic digital marketing, SEO services, eCommerce development, mobile app design, software solutions, digital transformation, IT consulting, web design, website redesign, mobile application solutions, IT Company Hosur,IT Bengaluru, Hosur, Tamil Nadu, India"
        />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://your-website-url.com" />

        {/* Schema Markup for Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

        {/* Link to preload resources */}
        <link
          rel="preload"
          href="/hero_use_case.riv"
          as="fetch"
          crossOrigin="anonymous"
        />
        
        {/* Font Link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <body>
        <Navbar />
        <ShadowCursor />
        <SocialMedia />
        {children}
        <ChatbotComponent />
        <Footer />
      </body>
    </html>
  );
}