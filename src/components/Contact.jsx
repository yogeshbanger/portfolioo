import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaBookOpen,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaUserGraduate,
} from "react-icons/fa";

const timeline = [
  {
    year: "Present",
    title: "Bachelor of Computer Applications",
    subtitle: "RKSD College",
    description:
      "Building a robust foundation in Data Structures, Computer Graphics, networking, and core software engineering principles to architect scalable applications.",
    icon: FaUserGraduate,
  },
  {
    year: "Learning",
    title: "MERN Stack & Cyber Security",
    subtitle: "React, Node.js, Express, MongoDB & Security",
    description:
      "Creating highly optimized web applications with secure REST APIs, authentication, and database integrations while implementing secure coding practices learned through specialized training.",
    icon: FaCode,
  },
  {
    year: "Growing",
    title: "SEO & Digital Marketing",
    subtitle: "Search-Focused Web Architectures",
    description:
      "Mastering technical SEO, keyword clustering, search intent, and Social Media Optimization (SMO) to ensure the applications I build dominate search rankings.",
    icon: FaRocket,
  },
];

const values = [
  {
    icon: FaLightbulb,
    title: "Curiosity",
    text: "I enjoy dissecting how complex systems work, continuously experimenting with new architectures to solve problems efficiently.",
  },
  {
    icon: FaCode,
    title: "Clean Execution",
    text: "I focus on responsive layouts, readable code, reusable logic, and flawless user experiences that convert.",
  },
  {
    icon: FaBookOpen,
    title: "Continuous Learning",
    text: "Technology evolves rapidly. I stay ahead by diving into documentation, building real-world projects, and embracing cross-disciplinary skills.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <Helmet>
        {/* Basic SEO */}
        <title>About Yogesh Banger | MERN Stack Developer & SEO Expert in Kaithal</title>

        <meta
          name="description"
          content="Learn about Yogesh Banger, a MERN Stack Developer, Digital Marketer, and BCA student from Kaithal passionate about React.js, Node.js, Cyber Security, and Technical SEO."
        />

        <meta
          name="keywords"
          content="Yogesh Banger, About Yogesh Banger, MERN Stack Developer, React Developer, Node.js Developer, Digital Marketer, Cyber Security, BCA Student, Kaithal Haryana, Best Developer in Kaithal"
        />

        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="Yogesh Banger" />
        <meta name="theme-color" content="#0f172a" />

        {/* Canonical */}
        <link rel="canonical" href="https://yogeshbanger.vercel.app/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Yogesh Banger | MERN Stack Developer" />
        <meta
          property="og:description"
          content="Discover the journey of Yogesh Banger: Blending MERN Stack Development, Digital Marketing, and Cyber Security to build exceptional digital experiences."
        />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/icon.png" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/about" />
        <meta property="og:site_name" content="Yogesh Banger Portfolio" />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Yogesh" />
        <meta property="profile:last_name" content="Banger" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Yogesh Banger | MERN Stack Developer" />
        <meta
          name="twitter:description"
          content="MERN Stack Developer, Digital Marketer, and BCA Student building modern, secure, and SEO-optimized web applications."
        />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/icon.png" />

        {/* Advanced Structured Data (Knowledge Graph Optimization) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Yogesh Banger",
            "jobTitle": "MERN Stack Developer & Digital Marketer",
            "url": "https://yogeshbanger.vercel.app",
            "email": "mailto:yogeshbanger111@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kaithal",
              "addressRegion": "Haryana",
              "addressCountry": "India"
            },
            "alumniOf": [
              {
                "@type": "CollegeOrUniversity",
                "name": "RKSD College"
              },
              {
                "@type": "EducationalOrganization",
                "name": "Hartron"
              },
              {
                "@type": "CollegeOrUniversity",
                "name": "Indira Gandhi National Open University"
              }
            ],
            "knowsAbout": [
              "MERN Stack",
              "React.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Technical SEO",
              "Digital Marketing",
              "Cyber Security",
              "Social Media Optimization"
            ],
            "sameAs": [
              "https://github.com/bangerjaat111-stack",
              "https://www.linkedin.com/in/yogesh-banger-9a9695366",
              "https://www.instagram.com/yogesh_banger_111/"
            ]
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
        >
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">
                About me
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                I turn learning into
                <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  real projects.
                </span>
              </h1>
            </div>

            <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                I am <strong className="text-white">Yogesh Banger</strong>, a passionate web developer 
                with a unique blend of technical expertise and marketing acumen. My core engineering 
                focus lies in the MERN stack: MongoDB, Express.js, React, and Node.js.
              </p>
              <p>
                Beyond writing clean code and designing modern interfaces, I deeply value the entire product 
                lifecycle. By integrating my background in <strong>Cyber Security</strong> and 
                <strong> Digital Marketing</strong>, I ensure the applications I architect are not just visually 
                appealing, but aggressively optimized for search engines and fortified against vulnerabilities.
              </p>
              <p>
                My goal is to deliver end-to-end digital solutions that drive real-world value, 
                blending flawless technical execution with strategic organic growth.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="py-24">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-violet-300">
              My journey
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Learning, building and improving
            </h2>
          </div>

          <div className="relative space-y-6 before:absolute before:bottom-10 before:left-7 before:top-10 before:w-px before:bg-gradient-to-b before:from-cyan-300/50 before:to-violet-400/20 sm:before:left-9">
            {timeline.map(({ year, title, subtitle, description, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative grid grid-cols-[3.5rem_1fr] gap-5 sm:grid-cols-[4.5rem_1fr]"
              >
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/20 bg-slate-900 text-xl text-cyan-300 shadow-xl shadow-cyan-500/5 sm:h-16 sm:w-16">
                  <Icon aria-hidden="true" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/20 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-black">{title}</h3>
                      <p className="mt-1 font-semibold text-cyan-300">{subtitle}</p>
                    </div>
                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
                      {year}
                    </span>
                  </div>
                  <p className="mt-5 max-w-4xl leading-7 text-slate-400">{description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">
              What guides me
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">My working values</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950 p-7"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-400/10 text-2xl text-violet-300">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* --- HIDDEN SEO SECTION FOR SCREEN READERS & CRAWLERS --- */}
        <section className="sr-only" aria-hidden="false">
          <h2>Detailed Professional Background of Yogesh Banger</h2>
          <p>
            Yogesh Banger is highly regarded as one of the best MERN Stack Developers and Digital Marketing 
            strategists in Kaithal, Haryana, India. Currently pursuing his BCA at RKSD College, Yogesh holds 
            a multidisciplinary academic background, including specialized Cyber Security training from Hartron 
            and an Arts degree from Indira Gandhi National Open University (IGNOU).
          </p>
          <p>
            Operating at the intersection of robust software engineering and digital brand growth, he excels in 
            building scalable React.js and Node.js architectures, securing web infrastructure, and deploying 
            advanced Technical SEO and Social Media Optimization (SMO) funnels. Whether architecting database 
            schemas in MongoDB or clustering high-ranking keywords for digital campaigns, Yogesh transforms 
            complex technical challenges into streamlined user experiences.
          </p>
        </section>
      </div>
    </main>
  );
}