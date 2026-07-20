import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaCar,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLock,
  FaWordpress,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";


const categories = ["All", "MERN", "React", "WordPress", "SEO"];

const projects = [
  {
    title: "AutoSyntax",
    category: "MERN",
    type: "Automotive web application",
    description:
      "A modern car platform with responsive pages, dark/light themes, registration, OTP verification, user profiles and product discovery.",
    icon: FaCar,
    tags: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Framer Motion"],
    github: "https://github.com/bangerjaat111-stack",
    live: "",
    gradient: "from-rose-500/20 via-orange-400/10 to-transparent",
  },
  {
    title: "Hartron Skill Centre",
    category: "WordPress",
    type: "Education and training website",
    description:
      "A professional education website featuring course pages, internship information, placements, branch details and conversion-focused content.",
    icon: FaGraduationCap,
    tags: ["WordPress", "Elementor", "Responsive Design", "SEO"],
    github: "",
    live: "https://banger.hartronadvanceskillcentrekaithal.com/",
    gradient: "from-blue-500/20 via-cyan-400/10 to-transparent",
  },
  {
    title: "MERN Authentication System",
    category: "MERN",
    type: "Secure user authentication flow",
    description:
      "Registration, form validation, email OTP, resend timer, JWT authentication, profile upload and protected backend APIs.",
    icon: FaLock,
    tags: ["Express", "MongoDB", "JWT", "Nodemailer", "Cloudinary"],
    github: "https://github.com/bangerjaat111-stack",
    live: "",
    gradient: "from-violet-500/20 via-fuchsia-400/10 to-transparent",
  },
  {
    title: "Developer Portfolio",
    category: "React",
    type: "Personal brand website",
    description:
      "A fast, animated and responsive portfolio designed to present skills, projects, education and contact details with page-level SEO.",
    icon: FaLaptopCode,
    tags: ["React", "React Router", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/bangerjaat111-stack",
    live: "",
    gradient: "from-cyan-500/20 via-blue-400/10 to-transparent",
  },
  {
    title: "SEO Landing Page System",
    category: "SEO",
    type: "Search-friendly page structure",
    description:
      "Reusable landing page approach with semantic headings, metadata, schema-ready sections, internal links and mobile-first performance.",
    icon: FaSearch,
    tags: ["Technical SEO", "On-page SEO", "Schema", "Content"],
    github: "",
    live: "",
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
  },
  {
    title: "Course Showcase Pages",
    category: "WordPress",
    type: "Responsive course catalogue",
    description:
      "Premium course layouts for digital marketing, cyber security, AI, data analytics and full stack development programs.",
    icon: FaWordpress,
    tags: ["WordPress", "Tailwind-style UI", "UX Writing", "Responsive"],
    github: "",
    live: "https://banger.hartronadvanceskillcentrekaithal.com/",
    gradient: "from-sky-500/20 via-indigo-400/10 to-transparent",
  },
];

function usePageSEO() {
  useEffect(() => {
    const title = "Projects | Yogesh Banger - MERN and React Portfolio";
    const description =
      "View projects by Yogesh Banger including React applications, MERN authentication systems, WordPress websites and SEO-focused pages.";

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
    canonical.href = `${window.location.origin}/projects`;
  }, []);
}

export default function Projects() {
  usePageSEO();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

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
            My work
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            Projects where ideas become
            <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              useful digital products
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            These projects represent my learning across frontend development, backend
            systems, WordPress, SEO and digital product design.
          </p>
        </motion.header>

        <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Project filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/15"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;

              return (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-7 transition hover:-translate-y-2 hover:border-cyan-300/25"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${project.gradient}`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-5">
                      <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-slate-950/70 text-3xl text-cyan-300 backdrop-blur">
                        <Icon />
                      </div>
                      <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-bold text-slate-300 backdrop-blur">
                        {project.category}
                      </span>
                    </div>

                    <p className="mt-8 text-sm font-semibold text-violet-300">{project.type}</p>
                    <h2 className="mt-2 text-2xl font-black">{project.title}</h2>
                    <p className="mt-4 min-h-32 leading-7 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-6 flex min-h-16 flex-wrap content-start gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="h-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition hover:border-cyan-300/30 hover:text-cyan-300"
                        >
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-1"
                        >
                          Live project <FaArrowUpRightFromSquare />
                        </a>
                      )}
                      {!project.github && !project.live && (
                        <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-500">
                          Case study coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}