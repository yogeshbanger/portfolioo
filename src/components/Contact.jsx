import { useEffect } from "react";
import { motion } from "framer-motion";
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
    subtitle: "BCA Student",
    description:
      "Building a strong foundation in programming, databases, computer networks, software development and web technologies.",
    icon: FaUserGraduate,
  },
  {
    year: "Learning",
    title: "MERN Stack Development",
    subtitle: "React, Node.js, Express and MongoDB",
    description:
      "Creating complete web applications with responsive interfaces, REST APIs, authentication, validation and database integration.",
    icon: FaCode,
  },
  {
    year: "Growing",
    title: "SEO and Digital Marketing",
    subtitle: "Search-focused web development",
    description:
      "Learning technical SEO, content structure, metadata, performance, search intent and digital marketing fundamentals.",
    icon: FaRocket,
  },
];

const values = [
  {
    icon: FaLightbulb,
    title: "Curiosity",
    text: "I enjoy understanding how systems work and continuously experiment with better ways to solve problems.",
  },
  {
    icon: FaCode,
    title: "Clean execution",
    text: "I focus on responsive layouts, readable code, reusable logic and thoughtful user experiences.",
  },
  {
    icon: FaBookOpen,
    title: "Continuous learning",
    text: "Technology changes quickly, so I keep improving through projects, documentation and hands-on practice.",
  },
];

function usePageSEO() {
  useEffect(() => {
    const title = "About Yogesh Banger | BCA Student and MERN Developer";
    const description =
      "Learn about Yogesh Banger, a BCA student focused on MERN stack development, responsive UI design, SEO and digital marketing.";

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
    setMeta('meta[property="og:type"]', { property: "og:type", content: "profile" });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/about`;
  }, []);
}

export default function About() {
  usePageSEO();

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
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
                I am <strong className="text-white">Yogesh Banger</strong>, a Bachelor of
                Computer Applications student with a strong interest in full stack web
                development. My main focus is the MERN stack: MongoDB, Express, React and
                Node.js.
              </p>
              <p>
                I enjoy designing modern interfaces, building backend APIs, connecting
                databases and creating complete user flows. I also study SEO and digital
                marketing so the websites I build are not only attractive, but also
                discoverable and useful.
              </p>
              <p>
                My goal is to begin my professional career as a developer, contribute to
                meaningful products and keep growing through real-world challenges.
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
                  <Icon />
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
                  <Icon />
                </div>
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
