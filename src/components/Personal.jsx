import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    href: "",
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
    href: "https://in.linkedin.com/in/yogesh-banger-9a9695366?trk=people-guest_people_search-card",
  },
  {
    name: "X / Twitter",
    icon: SiX,
    href: "https://www.instagram.com/yogesh_banger_111/",
  },
];

function usePageSEO() {
  useEffect(() => {
    const title = "Contact Yogesh Banger | MERN Stack Developer";
    const description =
      "Contact Yogesh Banger for internships, freelance web development, React projects, MERN applications and collaborations.";

    document.title = title;

    const setMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/contact`;
  }, []);
}

export default function Contact() {
  usePageSEO();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
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
            Let us create something
            <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              useful and memorable
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            I am open to internships, freelance opportunities, collaborations and
            conversations about React, MERN stack development, WordPress and SEO.
          </p>
        </motion.header>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            {contactCards.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-cyan-300/25">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-500">{label}</p>
                    <p className="mt-1 truncate font-bold text-slate-200">{value}</p>
                  </div>
                  {href && (
                    <FaArrowRight className="ml-auto shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                  )}
                </div>
              );

              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-violet-300">
                Find me online
              </p>
              <div className="mt-5 flex gap-3">
                {socials.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/40 text-xl text-slate-300 transition hover:-translate-y-1 hover:border-violet-300/30 hover:text-violet-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
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
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-300">Subject</span>
                <input
                  required
                  type="text"
                  name="subject"
                  placeholder="Internship, freelance project or collaboration"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-300">Message</span>
                <textarea
                  required
                  name="message"
                  rows="6"
                  placeholder="Tell me about your idea..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/5"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 font-black text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-1 sm:w-auto"
              >
                Send message <FaPaperPlane />
              </button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-amber-300/20 bg-amber-300/5 px-4 py-3 text-sm font-semibold text-amber-200"
                >
                  The page design is working. Connect this form to your backend, Formspree
                  or EmailJS to send real messages.
                </motion.p>
              )}
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
