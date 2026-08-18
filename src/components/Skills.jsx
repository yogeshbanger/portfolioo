import React from "react";
import { Helmet } from "react-helmet-async";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaWordpress,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiFramer,
  SiVite,
} from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "WordPress", icon: FaWordpress, color: "#21759B" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function Skills() {
  // Generate JSON-LD Schema identifying you as an entity with specific skills
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yogesh Banger",
    "jobTitle": "MERN Stack Developer",
    "url": "https://yogeshbanger.vercel.app/skills",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kaithal",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "knowsAbout": skills.map(skill => skill.name)
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-24 text-white overflow-hidden relative">
      <Helmet>
        {/* Core SEO Meta Tags */}
        <title>Technical Skills | Yogesh Banger - MERN Stack Developer</title>
        <meta
          name="description"
          content="Explore the technical arsenal of Yogesh Banger. Highly proficient in MERN Stack (MongoDB, Express, React, Node.js), JavaScript, Tailwind CSS, and WordPress."
        />
        <meta
          name="keywords"
          content="Yogesh Banger Skills, MERN Stack Developer, React Developer Kaithal, Node.js Backend, MongoDB Database, JavaScript Developer, Frontend Engineer Haryana"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://yogeshbanger.vercel.app/skills" />

        {/* Open Graph (Social Media Optimization) */}
        <meta property="og:title" content="Technical Skills | Yogesh Banger - Full Stack Developer" />
        <meta
          property="og:description"
          content="A comprehensive look at the tools and technologies I use to build modern, scalable web applications."
        />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/icon.png" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/skills" />
        <meta property="og:type" content="profile" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Skills | Yogesh Banger" />
        <meta name="twitter:description" content="Discover my tech stack: React, Node.js, Express, MongoDB, and more." />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/icon.png" />

        {/* Dynamic JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Animated background orbs - Fixed Arbitrary Values for Tailwind */}
      <div className="absolute top-[200px] right-[200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-[200px] left-[200px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4 px-6 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm"
          >
            <span className="text-cyan-300 text-xs font-semibold uppercase tracking-widest">
              ⚡ My Arsenal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Technologies I
            </span>
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-cyan-300 bg-clip-text text-transparent ml-2 sm:ml-0">
              Work With
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-slate-300 text-base md:text-lg font-light leading-relaxed"
          >
            Modern tools for building responsive, high-performance web
            applications that users love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <span className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-white/5 text-xs text-slate-400 cursor-default">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              {skills.length} Technologies
            </span>
            <span className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-white/5 text-xs text-slate-400 cursor-default">
              <span className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true" />
              Always Learning
            </span>
          </motion.div>
        </motion.div>

        {/* Skills Grid - Converted to semantic unordered list */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6 m-0 p-0 list-none"
        >
          {skills.map(({ name, icon: Icon, color }) => (
            <motion.li
              key={name}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="group relative flex flex-col items-center justify-center rounded-2xl bg-slate-900/70 backdrop-blur-sm p-6 border border-white/5 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-default"
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500" 
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-5xl"
                  style={{ color }}
                >
                  {/* Accessibility hidden on decorative icons */}
                  <Icon className="drop-shadow-lg" aria-hidden="true" />
                </motion.div>

                <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {name}
                </h3>

                {/* Decorative line */}
                <div 
                  className="mt-2 w-8 h-0.5 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 group-hover:via-cyan-400/80 transition-all duration-500" 
                  aria-hidden="true" 
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500">
            <span className="inline-block mr-2 animate-pulse" aria-hidden="true">✦</span>
            Hover over any skill to see the magic
          </p>
        </motion.div>
      </div>

      {/* --- HIDDEN SEO SECTION FOR CRAWLERS & SCREEN READERS --- */}
      <section className="sr-only" aria-hidden="false">
        <h2>Expert MERN Stack and Frontend Technologies</h2>
        <p>
          Yogesh Banger is a highly skilled MERN Stack Developer based in Kaithal, Haryana. 
          His core technical expertise encompasses the entire JavaScript ecosystem, allowing him 
          to engineer robust, scalable web architectures from front to back.
        </p>
        <p>
          <strong>Frontend Development:</strong> Mastery in HTML5, CSS3, JavaScript (ES6+), and React.js. 
          Specialized in crafting pixel-perfect, responsive user interfaces utilizing Tailwind CSS and 
          animating complex interactions with Framer Motion. Uses Vite for lightning-fast build tooling.
        </p>
        <p>
          <strong>Backend Engineering & Databases:</strong> Architecting secure RESTful APIs using Node.js 
          and Express.js. Managing NoSQL data models, schemas, and aggregations with MongoDB.
        </p>
        <p>
          <strong>Version Control & Tools:</strong> Streamlining deployment and collaboration pipelines 
          using Git and GitHub. Testing and validating secure API endpoints using Postman.
        </p>
        <p>
          <strong>CMS & Marketing:</strong> In addition to full-stack development, Yogesh possesses 
          deep experience in WordPress development, digital marketing funnels, and Technical Search Engine 
          Optimization (SEO), bridging the gap between raw code and organic business growth.
        </p>
      </section>
    </section>
  );
}