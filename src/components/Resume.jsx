import { useEffect } from "react";
import { motion } from "framer-motion";
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
    subtitle: "BCA Student",
    period: "Currently pursuing",
    description:
      "Studying programming, databases, software engineering, web development, computer networks and core computer application subjects.",
  },
];

const experience = [
  {
    title: "MERN Stack Developer",
    subtitle: "Project-based learning",
    period: "Current focus",
    description:
      "Building full stack applications with React, Node.js, Express and MongoDB, including authentication, email OTP, APIs and responsive dashboards.",
  },
  {
    title: "WordPress and SEO Projects",
    subtitle: "Independent practice",
    period: "Ongoing",
    description:
      "Designing education and business pages, improving metadata, page hierarchy, responsive layouts and search-friendly content structure.",
  },
];

const skillColumns = [
  {
    title: "Development",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT", "Nodemailer"],
  },
  {
    title: "Other",
    items: ["Git", "GitHub", "Postman", "WordPress", "SEO", "Digital Marketing"],
  },
];

function usePageSEO() {
  useEffect(() => {
    const title = "Resume | Yogesh Banger - BCA and MERN Developer";
    const description =
      "View the resume of Yogesh Banger, a BCA student with skills in React, MERN stack development, WordPress, SEO and digital marketing.";

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
    canonical.href = `${window.location.origin}/resume`;
  }, []);
}

export default function Resume() {
  usePageSEO();

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
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
            download
            className="inline-flex w-fit items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 font-black text-slate-950 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-1"
          >
            <FaDownload /> Download resume
          </a>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3"
        >
          <div className="bg-slate-900 p-6">
            <FaUser className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Name</p>
            <p className="mt-1 text-lg font-black">Yogesh Banger</p>
          </div>
          <div className="bg-slate-900 p-6">
            <FaLaptopCode className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Professional focus</p>
            <p className="mt-1 text-lg font-black">MERN Stack Development</p>
          </div>
          <div className="bg-slate-900 p-6">
            <FaLocationDot className="text-2xl text-cyan-300" />
            <p className="mt-4 text-sm text-slate-500">Location</p>
            <p className="mt-1 text-lg font-black">Kaithal, Haryana, India</p>
          </div>
        </motion.section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">
                  <FaGraduationCap />
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

            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-400/10 text-2xl text-violet-300">
                  <FaLaptopCode />
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
            <section className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Technical skills
              </p>
              <h2 className="mt-2 text-2xl font-black">Core toolkit</h2>

              <div className="mt-8 space-y-7">
                {skillColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="font-black text-white">{column.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {column.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-300">
                Career objective
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                To begin my career in a growth-focused development team where I can use my
                MERN stack knowledge, improve through real projects and contribute to
                reliable, user-friendly products.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
