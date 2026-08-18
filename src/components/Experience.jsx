import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const TIMELINE = [
  {
    role: "Computer Instructor / IT Trainer",
    org: "Hartron Skill Center",
    orgFull: "Haryana State Electronics Development Corporation Limited",
    period: "2025 – 2026 · Present",
    location: "Kaithal, Haryana",
    points: [
      "Taught computer operations and basic programming concepts to students of varying skill levels.",
      "Guided learners through hands-on exercises, breaking down technical topics into practical steps.",
      "Supported day-to-day web development practice alongside classroom training.",
      "Built confidence in students moving from fundamentals toward independent problem-solving.",
    ],
  }
];

export default function Experience() {
  return (
    <main className="relative min-h-screen bg-[#F6F1E7] pt-28 pb-24">
      <Helmet>
        {/* Basic SEO */}
        <title>Work Experience | Yogesh Banger | MERN Stack Developer & IT Trainer</title>
        <meta name="google-site-verification" content="b_w75oGvnRYWx0-SUmybiSkyb2c4iTGSYL57nw6-0Bs" />
        <meta
          name="description"
          content="Explore the professional experience of Yogesh Banger. Currently serving as an IT Trainer at Hartron Skill Center, Kaithal, bridging the gap between education and MERN Stack development."
        />

        <meta
          name="keywords"
          content="Yogesh Banger, Work Experience, MERN Stack Developer, IT Trainer, Computer Instructor, Hartron Skill Center Kaithal, React Developer, Node.js Developer, Web Developer Kaithal, Haryana State Electronics Development Corporation Limited"
        />

        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="Yogesh Banger" />
        <meta name="theme-color" content="#F6F1E7" />

        {/* Canonical */}
        <link rel="canonical" href="https://yogeshbanger.vercel.app/experience" />

        {/* Open Graph (SMO) */}
        <meta property="og:title" content="Work Experience | Yogesh Banger - MERN Stack Developer" />
        <meta
          property="og:description"
          content="Professional experience of Yogesh Banger, combining IT Training at Hartron with modern MERN Stack web development."
        />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/icon.png" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/experience" />
        <meta property="og:site_name" content="Yogesh Banger Portfolio" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work Experience | Yogesh Banger" />
        <meta
          name="twitter:description"
          content="Professional work experience of Yogesh Banger, MERN Stack Developer and IT Trainer in Kaithal."
        />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/icon.png" />

        {/* Advanced JSON-LD Structured Data for Local & Career SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Yogesh Banger",
            "jobTitle": "Computer Instructor & MERN Stack Developer",
            "url": "https://yogeshbanger.vercel.app",
            "email": "mailto:yogeshbanger111@gmail.com",
            "worksFor": {
              "@type": "Organization",
              "name": "Hartron Skill Center",
              "legalName": "Haryana State Electronics Development Corporation Limited",
              "location": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kaithal",
                  "addressRegion": "Haryana",
                  "addressCountry": "IN"
                }
              }
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kaithal",
              "addressRegion": "Haryana",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://github.com/bangerjaat111-stack",
              "https://www.linkedin.com/in/yogesh-banger/"
            ]
          })}
        </script>
      </Helmet>

      {/* Decorative Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#E4DCC8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      <section className="relative max-w-4xl mx-auto px-5 sm:px-8">
        <p className="text-xs tracking-[0.25em] text-[#2F5D50] mb-3 font-mono">EXPERIENCE</p>
        <h1 className="font-['Zilla_Slab',_serif] text-4xl sm:text-5xl text-[#241F1B] mb-14">
          Work Experience
        </h1>

        <div className="relative pl-10">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[7px] top-2 bottom-2 border-l-2 border-dashed border-[#D9CFB8]" aria-hidden="true" />

          {TIMELINE.map((entry, idx) => (
            <motion.div
              key={entry.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-14 last:mb-0"
            >
              {/* Timeline Dot */}
              <span 
                className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-[#F6F1E7] border-2 border-[#2F5D50]" 
                aria-hidden="true"
              />

              <div className="border border-[#E4DCC8] bg-white rounded-lg p-6 sm:p-8 hover:shadow-md transition-shadow duration-300">
                <span className="text-[11px] text-[#2F5D50] font-mono">{entry.period}</span>

                <h2 className="font-['Zilla_Slab',_serif] text-xl text-[#241F1B] mt-2 font-bold">
                  {entry.role}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-[#7A7362] text-sm">
                  <FiBriefcase size={14} className="text-[#2F5D50]" aria-hidden="true" />
                  <span>
                    <strong className="font-medium text-[#4A453C]">{entry.org}</strong> 
                    <span className="text-[#7A7362]/80 hidden sm:inline"> — {entry.orgFull}</span>
                  </span>
                </div>

                {/* Mobile only full org name to maintain clean layout */}
                <div className="text-[#7A7362]/80 text-xs sm:hidden mt-0.5">
                  {entry.orgFull}
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-[#7A7362] text-sm">
                  <FiMapPin size={14} className="text-[#2F5D50]" aria-hidden="true" />
                  <span>{entry.location}</span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {entry.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#4A453C] leading-relaxed">
                      <span className="text-[#E0A458] shrink-0" aria-hidden="true">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- HIDDEN SEO SECTION FOR SCREEN READERS & CRAWLERS --- */}
      <section className="sr-only" aria-hidden="false">
        <h2>Professional Employment and Teaching Experience</h2>
        <p>
          Yogesh Banger serves as an IT Trainer and Computer Instructor at the Hartron Skill Center 
          (Haryana State Electronics Development Corporation Limited) in Kaithal. In this role, he merges 
          his deep understanding of Full Stack Development with education, teaching foundational computer science 
          and advanced web development principles.
        </p>
        <p>
          By mentoring students in practical programming concepts, Yogesh continually reinforces his own 
          mastery over modern technologies like React.js, Node.js, and software architecture. His ability to 
          break down complex digital marketing and coding concepts into digestible, hands-on lessons makes 
          him a uniquely communicative and team-oriented MERN Stack Developer.
        </p>
      </section>
    </main>
  );
}