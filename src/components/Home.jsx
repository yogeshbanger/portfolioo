import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import {
  RiArrowRightUpLine,
  RiBookOpenFill,
  RiCodeSSlashFill,
  RiPhoneFill,
  RiRocket2Fill,
  RiShieldFlashLine,
  RiWindowLine,
} from "react-icons/ri";

const EXPERTISE = [
  {
    name: "MERN Stack Developer",
    description: "React • Node • MongoDB",
    icon: RiCodeSSlashFill,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "React Development",
    description: "Responsive UI & APIs",
    icon: RiWindowLine,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    name: "Cyber Security",
    description: "Secure coding practices",
    icon: RiShieldFlashLine,
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    name: "Computer Science",
    description: "BCA Undergraduate",
    icon: RiBookOpenFill,
    gradient: "from-purple-400 to-pink-500",
  },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.1 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 24, mass: 0.8 },
  },
};

const IMAGE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9, rotateY: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.8 },
  },
};

// JSON-LD Schemas
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yogesh Banger",
  "additionalName": "Yogesh",
  "jobTitle": "MERN Stack Developer",
  "description": "Top MERN Stack Developer and BCA student specializing in React.js, Node.js, MongoDB, and SEO.",
  "url": "https://yogeshbanger.vercel.app/",
  "image": "https://yogeshbanger.vercel.app/images/yogesh-profile.webp",
  "email": "yogeshbanger111@gmail.com",
  "telephone": "+919992540404",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kaithal",
    "addressRegion": "Haryana",
    "addressCountry": "IN",
    "postalCode": "136027"
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "RKSD College",
      "url": "https://rksdcollege.ac.in/"
    },
    {
      "@type": "EducationalOrganization",
      "name": "Hartron Skill Centre",
      "url": "https://hartron.org.in/"
    }
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "BCA"
  },
  "knowsAbout": [
    "MERN Stack",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "JavaScript",
    "HTML5",
    "CSS3",
    "REST APIs",
    "JWT Authentication",
    "Cyber Security",
    "Technical SEO",
    "Digital Marketing",
    "Social Media Optimization"
  ],
  "sameAs": [
    "https://github.com/bangerjaat111-stack",
    "https://www.linkedin.com/in/yogesh-banger/",
    "https://www.instagram.com/yogesh_banger_111/"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance",
    "description": "Freelance MERN Stack Developer"
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "target": "https://yogeshbanger.vercel.app/"
    },
    {
      "@type": "HireAction",
      "target": "https://yogeshbanger.vercel.app/#contact"
    }
  ],
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "MERN Stack Development Services",
      "description": "Full-stack web development using React.js, Node.js, Express.js, and MongoDB.",
      "provider": {
        "@type": "Person",
        "name": "Yogesh Banger"
      },
      "areaServed": ["India", "Worldwide"],
      "serviceType": ["Web Development", "React Development", "Node.js Development"]
    }
  }
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yogesh Banger - MERN Stack Developer",
  "url": "https://yogeshbanger.vercel.app/",
  "logo": "https://yogeshbanger.vercel.app/images/logo.webp",
  "description": "Professional MERN Stack Developer offering web development services in Kaithal, India.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kaithal",
    "addressRegion": "Haryana",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919992540404",
    "email": "yogeshbanger111@gmail.com",
    "contactType": "Sales",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://github.com/bangerjaat111-stack",
    "https://www.linkedin.com/in/yogesh-banger/"
  ]
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yogeshbanger.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Portfolio",
      "item": "https://yogeshbanger.vercel.app/#work"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Contact",
      "item": "https://yogeshbanger.vercel.app/#contact"
    }
  ]
};

const Hero = ({
  profileImage = "/images/yogesh-profile.webp",
  phoneNumber = "+919992540404",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const backgroundAnimation = shouldReduceMotion
    ? undefined
    : {
        scale: [1, 1.12, 1],
        x: [0, 28, 0],
        opacity: [0.2, 0.34, 0.2],
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-slate-300 sm:px-6 lg:px-8"
    >
      <Helmet>
        {/* ===== PRIMARY META TAGS ===== */}
        <title>Yogesh Banger | MERN Stack Developer in Kaithal - Hire Now</title>
        <meta name="google-site-verification" content="b_w75oGvnRYWx0-SUmybiSkyb2c4iTGSYL57nw6-0Bs" />
        <meta
          name="description"
          content="Hire Yogesh Banger, a top MERN Stack Developer in Kaithal, India. Expert in React.js, Node.js, MongoDB, and SEO. Available for freelance, internships, and full-time roles."
        />
        <meta name="author" content="Yogesh Banger" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://yogeshbanger.vercel.app/" />

        {/* ===== KEYWORDS (Optional but helpful) ===== */}
        <meta name="keywords" content="MERN Stack Developer, React Developer, Node.js Developer, MongoDB, Web Developer Kaithal, SEO Expert, Freelance Web Developer, BCA Student" />

        {/* ===== THEME & MOBILE ===== */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Yogesh Banger Portfolio" />

        {/* ===== OPEN GRAPH / SOCIAL MEDIA ===== */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/" />
        <meta property="og:title" content="Yogesh Banger | MERN Stack Developer & SEO Expert" />
        <meta property="og:description" content="Hire a skilled MERN Stack Developer for your next project. Specializing in React, Node.js, MongoDB, and SEO." />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/images/og-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Yogesh Banger - MERN Stack Developer Portfolio" />
        <meta property="og:updated_time" content="2026-08-18T00:00:00+05:30" />
        <meta property="article:modified_time" content="2026-08-18T00:00:00+05:30" />
        <meta property="profile:first_name" content="Yogesh" />
        <meta property="profile:last_name" content="Banger" />
        <meta property="profile:username" content="yogeshbanger" />

        {/* ===== TWITTER CARD ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yogesh Banger | MERN Stack Developer" />
        <meta name="twitter:description" content="Freelance Web Developer & Cyber Security enthusiast specializing in React.js and Node.js." />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/images/og-image.webp" />
        <meta name="twitter:image:alt" content="Yogesh Banger - MERN Stack Developer Portfolio" />
        <meta name="twitter:site" content="@yogeshbanger" />
        <meta name="twitter:creator" content="@yogeshbanger" />

        {/* ===== HREFLANG TAGS ===== */}
        <link rel="alternate" href="https://yogeshbanger.vercel.app/" hreflang="en" />
        <link rel="alternate" href="https://yogeshbanger.vercel.app/" hreflang="x-default" />

        {/* ===== PRECONNECT FOR PERFORMANCE ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ===== JSON-LD STRUCTURED DATA ===== */}
        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify(PERSON_SCHEMA)}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_SCHEMA)}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(BREADCRUMB_SCHEMA)}
        </script>

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Yogesh Banger Portfolio",
            "url": "https://yogeshbanger.vercel.app/",
            "description": "Portfolio of Yogesh Banger - MERN Stack Developer",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yogeshbanger.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>

        {/* Profile Page Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "about": {
              "@type": "Person",
              "name": "Yogesh Banger"
            },
            "dateModified": "2026-08-18"
          })}
        </script>
      </Helmet>

      {/* ===== DECORATIVE BACKGROUND ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={backgroundAnimation}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px] sm:h-115 sm:w-115 sm:blur-[130px]"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.18, 1],
                  y: [0, -30, 0],
                  opacity: [0.18, 0.3, 0.18],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 right-8rem h-80 w-80 rounded-full bg-purple-600/20 blur-[100px] sm:h-520px sm:w-520px sm:blur-[140px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        
        {/* ===== PROFILE VISUAL ===== */}
        <div className="order-2 flex justify-center lg:order-1 lg:-mt-57">
          <motion.div
            variants={IMAGE_VARIANTS}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            whileHover={shouldReduceMotion ? undefined : { rotateX: 4, rotateY: -4, scale: 1.015 }}
            style={{ perspective: 1400, transformStyle: "preserve-3d" }}
            className="group relative aspect-square w-full max-w-85 will-change-transform sm:max-w-107"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-cyan-500/70 via-blue-500/50 to-purple-600/70 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
            <div className="absolute inset-1px rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_60px_rgba(34,211,238,0.18)]">
              <div className="relative h-full w-full rounded-full border border-white/10 bg-slate-900/80 p-3 backdrop-blur-xl">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
                  <img
                    src={profileImage}
                    srcSet={`${profileImage} 1x, ${profileImage.replace('.webp', '@2x.webp')} 2x`}
                    alt="Yogesh Banger - MERN Stack Developer in Kaithal, India"
                    width="430"
                    height="430"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-cyan-400/10" />
                  <div className="absolute inset-x-8 bottom-7 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                        Available for work
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        MERN Stack Developer
                      </p>
                    </div>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="order-1 flex flex-col gap-7 lg:order-2"
        >
          <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
            MERN Developer • React • Node.js
          </motion.div>

          <motion.div variants={ITEM_VARIANTS}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-slate-500">
              Hello, I am
            </p>
            <h1 id="hero-title" className="text-center lg:text-left">
              <span className="block text-5xl font-black text-white sm:text-6xl lg:text-7xl">
                Yogesh
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-5xl font-black text-transparent sm:text-6xl lg:text-7xl">
                Banger
              </span>
              <span className="mt-4 block text-xl font-semibold tracking-wide text-slate-300 sm:text-2xl">
                MERN Stack Developer
              </span>
            </h1>
          </motion.div>

          <motion.div variants={ITEM_VARIANTS} className="max-w-2xl">
            <p className="text-base leading-8 text-slate-400">
              I am a <strong>MERN Stack Developer</strong> and BCA student at
              <strong> RKSD College. </strong>
              I specialize in building fast, highly optimized web
              applications using
              <strong> React.js, Tailwind CSS, Node.js, and MongoDB. </strong>
              Beyond writing clean code, I focus heavily on 
              <strong> Digital Marketing, SEO, </strong> and 
              <strong> Cyber Security </strong> to ensure projects are not just functional, but scalable, discoverable, and secure.
            </p>
          </motion.div>

          <motion.div variants={ITEM_VARIANTS} className="grid gap-3 sm:grid-cols-2">
            {EXPERTISE.map(({ name, description, icon: Icon, gradient }) => (
              <motion.article
                key={name}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/55 p-4 backdrop-blur-md transition-colors duration-300 hover:border-cyan-400/30 hover:bg-slate-900/80"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.07]`}
                />
                <div className="relative flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/0.06 bg-slate-800/80 text-cyan-300 transition duration-300 group-hover:scale-105 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
                      {name}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">{description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={ITEM_VARIANTS}
            className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center"
          >
            <motion.a
              href={'https://mail.google.com/mail/?view=cm&fs=1&to=yogeshbanger111@gmail.com&su=Portfolio%20Contact'}
              aria-label="Send email to Yogesh Banger"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_14px_40px_-18px_rgba(59,130,246,0.9)] transition-shadow hover:shadow-[0_18px_50px_-18px_rgba(168,85,247,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Let&apos;s work together
              <RiRocket2Fill
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>

            <a
              href={`tel:${phoneNumber}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Call Yogesh Banger"
            >
              <RiPhoneFill aria-hidden="true" className="text-cyan-300" />
              Call me
              <RiArrowRightUpLine
                aria-hidden="true"
                className="text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== HIDDEN SEO CONTENT ===== */}
      <section className="sr-only" aria-hidden="true">
        <h2>About Yogesh Banger - Best MERN Stack Developer in Kaithal</h2>
        <p>
          Yogesh Banger is a top MERN Stack Developer and Digital Marketer based in Kaithal, Haryana, India.
          Currently pursuing Bachelor of Computer Applications (BCA) at RKSD College, he engineers high-performance 
          web solutions using React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. 
        </p>
        
        <h3>Technical Expertise & Services</h3>
        <ul>
          <li>MERN Stack Development: MongoDB, Express.js, React.js, Node.js</li>
          <li>Frontend Development: React.js, Tailwind CSS, Framer Motion, Vite</li>
          <li>Backend Development: Node.js, Express.js, REST APIs, JWT Authentication</li>
          <li>Database Management: MongoDB, Mongoose, Data Modeling</li>
          <li>Cybersecurity: Secure coding practices, OTP verification, Data protection</li>
          <li>SEO & Digital Marketing: Technical SEO, On-page SEO, Social Media Optimization</li>
        </ul>

        <h3>Education & Certifications</h3>
        <ul>
          <li>Bachelor of Computer Applications (BCA) - RKSD College, Kaithal</li>
          <li>Cybersecurity Training - Hartron Skill Centre</li>
          <li>Web Development Certification - Various Online Platforms</li>
        </ul>

        <h3>Why Hire Yogesh Banger?</h3>
        <p>
          Yogesh combines robust software engineering with digital marketing expertise, ensuring projects 
          are not only functional but also optimized for search engines and secure against vulnerabilities. 
          He delivers end-to-end digital solutions that drive real-world value.
        </p>

        <h3>Project Experience</h3>
        <ul>
          <li>AutoSyntax - Automotive web application with React, Tailwind CSS, Node.js, MongoDB</li>
          <li>MERN Authentication System - Secure JWT authentication with email OTP verification</li>
          <li>Hartron Skill Centre - Professional education website with WordPress</li>
          <li>Developer Portfolio - Personal brand website with React and Framer Motion</li>
          <li>SEO Landing Page System - Search-friendly page structure with technical SEO</li>
        </ul>

        <h3>Contact Information</h3>
        <p>
          Email: yogeshbanger111@gmail.com<br />
          Phone: +919992540404<br />
          Location: Kaithal, Haryana, India
        </p>
      </section>
    </section>
  );
};

export default memo(Hero);