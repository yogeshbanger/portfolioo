import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaDownload,
  FaGraduationCap,
  FaLaptopCode,
  FaLocationDot,
  FaUser,
} from "react-icons/fa6";

const education = [
  {
    title: "Bachelor of Computer Applications",
    subtitle: "RKSD College",
    period: "Currently pursuing",
    description:
      "Studying advanced programming, Data Structures, software engineering, modern web development, computer networks, and core computer application subjects.",
  },
];

const experience = [
  {
    title: "MERN Stack Developer",
    subtitle: "Project-based learning & Freelance",
    period: "Current focus",
    description:
      "Architecting full-stack applications with React.js, Node.js, Express, and MongoDB. Implementing secure JWT authentication, email OTP, RESTful APIs, and responsive UI dashboards.",
  },
  {
    title: "WordPress & Technical SEO",
    subtitle: "Independent practice",
    period: "Ongoing",
    description:
      "Designing conversion-focused education and business platforms. Improving metadata, keyword clustering, core web vitals, and search-friendly content architectures.",
  },
];

const skillColumns = [
  {
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & Database",
    items: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT Auth", "Nodemailer"],
  },
  {
    title: "Tools & Optimization",
    items: ["Git / GitHub", "Postman", "WordPress", "Technical SEO", "Digital Marketing", "SMO"],
  },
];

export default function Resume() {
  // Generate JSON-LD Schema for the Resume page
  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yogesh Banger",
    "jobTitle": "MERN Stack Developer",
    "url": "https://yogeshbanger.vercel.app/resume",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kaithal",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "RKSD College"
      }
    ],
    "knowsAbout": [
      "MERN Stack",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Technical SEO",
      "WordPress Development"
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <Helmet>
        {/* Core SEO Meta Tags */}
        <title>Resume & Skills | Yogesh Banger - MERN Stack Developer</title>
        <meta
          name="description"
          content="View the professional resume of Yogesh Banger, a MERN Stack Developer and BCA student based in Kaithal. Highly skilled in React.js, Node.js, MongoDB, WordPress, and SEO."
        />
        <meta
          name="keywords"
          content="Yogesh Banger Resume, Hire MERN Stack Developer, React Developer Resume, Node.js Developer Kaithal, BCA Student Resume, Freelance Web Developer CV"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://yogeshbanger.vercel.app/resume" />

        {/* Open Graph / SMO */}
        <meta property="og:title" content="Resume | Yogesh Banger - MERN Stack Developer" />
        <meta
          property="og:description"
          content="Explore the technical skills, education, and development experience of Yogesh Banger."
        />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/icon.png" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/resume" />
        <meta property="og:type" content="profile" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resume | Yogesh Banger" />
        <meta name="twitter:description" content="MERN Stack Developer Resume & Technical Skills." />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/icon.png" />

        {/* Dynamic JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(resumeSchema)}
        </script>
      </Helmet>

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-7 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Resume
            </p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">My education and experience</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              A quick overview of my technical focus, education, project experience and
              current development skills.
            </p>
          </div>

          <a
            href="/Yogesh-Banger-Resume.pdf"
            download="Yogesh_Banger_Resume.pdf"
            aria-label="Download Yogesh Banger's Resume as PDF"
            className="inline-flex w-fit items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 font-black text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <FaDownload aria-hidden="true" /> Download resume
          </a>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3"
        >
          <div className="bg-slate-900 p-6 transition hover:bg-slate-800/80">
            <FaUser aria-hidden="true" className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Name</p>
            <p className="mt-1 text-lg font-black">Yogesh Banger</p>
          </div>
          <div className="bg-slate-900 p-6 transition hover:bg-slate-800/80">
            <FaLaptopCode aria-hidden="true" className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Professional focus</p>
            <p className="mt-1 text-lg font-black">MERN Stack Development</p>
          </div>
          <div className="bg-slate-900 p-6 transition hover:bg-slate-800/80">
            <FaLocationDot aria-hidden="true" className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Location</p>
            <p className="mt-1 text-lg font-black">Kaithal, Haryana, India</p>
          </div>
        </motion.section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            {/* Education Section */}
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">
                  <FaGraduationCap aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Education
                  </p>
                  <h2 className="mt-1 text-2xl font-black">Academic background</h2>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {education.map((item) => (
                  <article key={item.title} className="border-l border-cyan-300/30 pl-6">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-xl font-black">{item.title}</h3>
                        <p className="mt-1 font-semibold text-cyan-300">{item.subtitle}</p>
                      </div>
                      <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-400/10 text-2xl text-violet-300">
                  <FaLaptopCode aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-300">
                    Experience
                  </p>
                  <h2 className="mt-1 text-2xl font-black">Practical development work</h2>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                {experience.map((item) => (
                  <article key={item.title} className="border-l border-violet-300/30 pl-6">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-xl font-black">{item.title}</h3>
                        <p className="mt-1 font-semibold text-violet-300">{item.subtitle}</p>
                      </div>
                      <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            {/* Skills Section */}
            <section className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Technical skills
              </p>
              <h2 className="mt-2 text-2xl font-black">Core toolkit</h2>

              <div className="mt-8 space-y-7">
                {skillColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="font-black text-white">{column.title}</h3>
                    {/* Converted to semantic unordered list for SEO & Screen Readers */}
                    <ul className="mt-3 flex flex-wrap gap-2 m-0 p-0 list-none">
                      {column.items.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-300 cursor-default"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Objective Section */}
            <section className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-300">
                Career objective
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                To begin my career in a growth-focused engineering team where I can leverage my
                MERN stack expertise, scale my knowledge through complex real-world architectures, 
                and contribute to reliable, high-performance web products.
              </p>
            </section>
          </aside>
        </div>
      </div>

      {/* --- HIDDEN SEO SECTION FOR CRAWLERS & SCREEN READERS --- */}
      <section className="sr-only" aria-hidden="false">
        <h2>Hire Yogesh Banger - Expert MERN Stack Developer in India</h2>
        <p>
          Are you looking to hire a dedicated frontend or backend developer? Yogesh Banger is an ambitious 
          MERN Stack Developer (MongoDB, Express.js, React.js, Node.js) currently pursuing his Bachelor of 
          Computer Applications (BCA) at RKSD College in Kaithal, Haryana.
        </p>
        <p>
          Yogesh possesses a modern technical toolkit, excelling in creating responsive web applications with 
          Tailwind CSS and Framer Motion, designing secure REST APIs, implementing JWT authentication, and 
          optimizing websites for Google Search (Technical SEO). Download his CV to learn more about his 
          freelance projects, WordPress expertise, and readiness for tech internships and full-time Junior 
          Developer roles worldwide.
        </p>
      </section>
    </main>
  );
}