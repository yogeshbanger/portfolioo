import { useState } from "react";
import { saveLead } from "../utils/leadStore";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLocationDot,
  FaPaperPlane,
} from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";

const contactCards = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "yogeshbanger111@gmail.com",
    href: "mailto:yogeshbanger111@gmail.com",
  },
  {
    icon: FaLocationDot,
    label: "Location",
    value: "Kaithal, Haryana, India",
    href: "https://maps.google.com/?q=Kaithal,Haryana",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "bangerjaat111-stack",
    href: "https://github.com/bangerjaat111-stack",
  },
];

const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/bangerjaat111-stack",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/yogesh_banger_111/",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://in.linkedin.com/in/yogesh-banger-9a9695366?skipRedirect=true",
  },
  {
    name: "X / Twitter",
    icon: SiX,
    href: "https://twitter.com/", // Replace with actual X link if you have one
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Remove alphabets and non-phone characters (keep numbers, +, -, spaces, parentheses)
      const cleanedValue = value.replace(/[^0-9+\s-()]/g, "");
      setFormData({ ...formData, phone: cleanedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    saveLead(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <Helmet>
        {/* Core SEO */}
        <title>Yogesh Banger | MERN Stack Developer in Kaithal</title>
        <meta
          name="description"
          content="Get in touch with Yogesh Banger for freelance web development, React.js projects, Node.js APIs, and full MERN Stack applications. Based in Kaithal, Haryana."
        />
        <meta
          name="keywords"
          content="Contact Yogesh Banger, Hire MERN Stack Developer, React Developer India, Node.js Freelancer, Web Developer Kaithal, Freelance Web Developer"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://yogeshbanger.vercel.app/contact" />

        {/* Open Graph (SMO) */}
        <meta property="og:title" content="Contact Yogesh Banger | Hire a MERN Stack Developer" />
        <meta
          property="og:description"
          content="Available for freelance projects, internships, and MERN stack development collaborations."
        />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/icon.png" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Yogesh Banger" />
        <meta name="twitter:description" content="Hire Yogesh Banger for modern web architectures." />
        <meta name="twitter:image" content="https://yogeshbanger.vercel.app/icon.png" />

        {/* JSON-LD Local Business & Contact Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Yogesh Banger",
            "jobTitle": "MERN Stack Developer",
            "url": "https://yogeshbanger.vercel.app",
            "email": "mailto:yogeshbanger111@gmail.com",
            "telephone": "+91-9992540404",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kaithal",
              "addressRegion": "Haryana",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Freelance Inquiries",
              "email": "yogeshbanger111@gmail.com",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              "https://github.com/bangerjaat111-stack",
              "https://www.linkedin.com/in/yogesh-banger-9a9695366",
              "https://www.instagram.com/yogesh_banger_111/"
            ]
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Contact me
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Yogesh Banger
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Looking for a MERN Stack Developer? I am available for internships, freelance projects,
            React.js development, Node.js backend architectures, portfolio websites, and SEO optimization.
            Let's build something amazing together.
          </p>
        </motion.header>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Contact Cards */}
            <address className="space-y-5 not-italic">
              {contactCards.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-cyan-300/25">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300">
                      <Icon aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-500">{label}</p>
                      <p className="mt-1 truncate font-bold text-slate-200">{value}</p>
                    </div>
                    {href && (
                      <FaArrowRight aria-hidden="true" className="ml-auto shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                    )}
                  </div>
                );

                return href ? (
                  <a 
                    key={label} 
                    href={href} 
                    target={href.startsWith("http") ? "_blank" : undefined} 
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={`${label}: ${value}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-3xl"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </address>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-300">
                Find me online
              </p>
              <ul className="mt-5 flex gap-3 m-0 p-0 list-none">
                {socials.map(({ name, icon: Icon, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Yogesh Banger on ${name}`}
                      className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/40 text-xl text-slate-300 transition hover:-translate-y-1 hover:border-violet-300/30 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-black sm:text-3xl">Send a message</h2>
              <p className="mt-3 leading-7 text-slate-400">
                Share a few details about your opportunity or project and I will respond as
                soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-300">Your name</span>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-300">Email address</span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-300">Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="tel"
                    pattern="[0-9+\s-()]*"
                    placeholder="+91 9992540404"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-300">Subject</span>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship, freelance project or collaboration"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-300">Message</span>
                <textarea
                  required
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your idea..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                />
              </label>

              <button
                type="submit"
                aria-label="Send direct message"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 font-black text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-1 sm:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                Send message <FaPaperPlane aria-hidden="true" />
              </button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-500/10 flex items-center justify-between"
                >
                  <span>✓ Thank you! Your message has been sent successfully. Yogesh will get back to you shortly.</span>
                </motion.p>
              )}
            </form>
          </motion.section>
        </div>
      </div>

      {/* --- HIDDEN SEO SECTION FOR CRAWLERS & SCREEN READERS --- */}
      <section className="sr-only" aria-hidden="false">
        <h2>Contact Information for Yogesh Banger</h2>
        <p>
          Need a reliable web developer in Kaithal or for remote work? Contact Yogesh Banger to discuss 
          freelance MERN Stack development, React.js frontend design, secure Node.js APIs, or Technical 
          SEO consulting. 
        </p>
        <p>
          You can reach Yogesh directly via email at yogeshbanger111@gmail.com, or connect professionally 
          on LinkedIn and GitHub. Available for corporate internships, contract work, and full-time 
          engineering roles in India and globally.
        </p>
      </section>
    </main>
  );
}