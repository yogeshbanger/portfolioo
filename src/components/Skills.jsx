import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBootstrap,
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  
  SiCloudinary,
  SiExpress,
  SiFramer,
  SiJsonwebtokens,
  SiMongodb,
  SiPostman,
  SiReactrouter,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { MdOutlineAnalytics, MdOutlineSearch } from "react-icons/md";

const skillGroups = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible and interactive interfaces.",
    skills: [
      { name: "HTML5", icon: FaHtml5, level: 90 },
      { name: "CSS3", icon: FaCss3Alt, level: 86 },
      { name: "JavaScript", icon: FaJs, level: 82 },
      { name: "React", icon: FaReact, level: 84 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 88 },
      { name: "React Router", icon: SiReactrouter, level: 82 },
      { name: "Framer Motion", icon: SiFramer, level: 78 },
      { name: "Bootstrap", icon: FaBootstrap, level: 74 },
      { name: "Vite", icon: SiVite, level: 82 },
    ],
  },
  {
    title: "Backend and Database",
    description: "Developing APIs, authentication flows and database-powered features.",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 80 },
      { name: "Express.js", icon: SiExpress, level: 80 },
      { name: "MongoDB", icon: SiMongodb, level: 78 },
      { name: "REST API", icon: SiPostman, level: 82 },
      { name: "JWT Auth", icon: SiJsonwebtokens, level: 76 },
      { name: "Cloudinary", icon: SiCloudinary, level: 70 },
    ],
  },
  {
    title: "Tools and Workflow",
    description: "Using practical tools to design, test, version and ship projects.",
    skills: [
      { name: "Git", icon: FaGitAlt, level: 78 },
      { name: "GitHub", icon: FaGithub, level: 82 },
      { name: "Postman", icon: SiPostman, level: 80 },
      { name: "Figma", icon: FaFigma, level: 68 },
    
      { name: "WordPress", icon: FaWordpress, level: 82 },
    ],
  },
  {
    title: "SEO and Marketing",
    description: "Improving visibility, search structure and user-focused content.",
    skills: [
      { name: "On-page SEO", icon: MdOutlineSearch, level: 80 },
      { name: "Technical SEO", icon: MdOutlineSearch, level: 74 },
      { name: "Keyword Research", icon: MdOutlineAnalytics, level: 78 },
      { name: "Digital Marketing", icon: MdOutlineAnalytics, level: 75 },
    ],
  },
];

function usePageSEO() {
  useEffect(() => {
    const title = "Skills | Yogesh Banger - React and MERN Developer";
    const description =
      "Explore Yogesh Banger's frontend, backend, database, WordPress, SEO, design and development skills.";

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
    canonical.href = `${window.location.origin}/skills`;
  }, []);
}

export default function Skills() {
  usePageSEO();

  return (
    <main className="min-h-screen bg-slate-950 px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            My capabilities
          </p>
          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Skills that help me build
            <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              complete web experiences
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            I combine development, design and SEO knowledge to create websites that are
            responsive, functional, maintainable and ready to grow.
          </p>
        </motion.header>

        <div className="mt-16 space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.section
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: groupIndex * 0.05 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60"
            >
              <div className="border-b border-white/10 px-6 py-7 sm:px-8">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
                      Category {String(groupIndex + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">{group.title}</h2>
                  </div>
                  <p className="max-w-xl leading-7 text-slate-400">{group.description}</p>
                </div>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {group.skills.map(({ name, icon: Icon, level }, index) => (
                  <motion.article
                    key={name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="group bg-slate-950/90 p-6 transition hover:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300 transition group-hover:scale-110">
                          <Icon />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{name}</h3>
                          <p className="mt-1 text-xs text-slate-500">Practical knowledge</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-400">{level}%</span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[2rem] border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 px-6 py-10 text-center sm:px-10"
        >
          <h2 className="text-3xl font-black">Currently improving every day</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-400">
            These percentages represent my current confidence, not a finish line. I keep
            strengthening each skill through new projects, debugging and regular practice.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
