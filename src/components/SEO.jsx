// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
  const title = "Yogesh Banger | MERN Stack Developer";
  const description = "Yogesh Banger is a MERN Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, responsive web development, and cyber security.";
  const url = "https://yogeshbanger.vercel.app/";
  const image = "https://yogeshbanger.vercel.app/images/yogesh-profile.webp";

  // JSON-LD for Google Rich Results
  const structuredJSON = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yogesh Banger",
    "jobTitle": "MERN Stack Developer",
    "url": url,
    "image": image,
    "sameAs": [
      "https://www.linkedin.com/in/yogesh-banger/",
      "https://www.instagram.com/yogesh_banger_111/",
      "https://github.com/bangerjaat111-stack"
    ],
    "knowsAbout": [
      "MERN Stack",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cyber Security",
      "Web Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kaithal",
      "addressCountry": "IN"
    }
  };

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Yogesh Banger, MERN Stack Developer, React Developer, Node.js, Express.js, MongoDB, JavaScript, Full Stack Developer, Portfolio, Best developer in kaithal" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / LinkedIn / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Crucial for Local SEO & Name Searches) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredJSON)}
      </script>
    </Helmet>
  );
}