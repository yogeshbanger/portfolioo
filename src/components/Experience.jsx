import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import SEO from "./SEO";

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
      "Built confidence in students moving from fundamentals toward independent problem solving.",
    ],
  },
];

export default function Experience() {
  return (
    <main className="relative min-h-screen bg-[#F6F1E7] pt-28 pb-24">
      <SEO
        title="Experience | Yogesh Banger"
        description="Work experience of Yogesh Banger as a Computer Instructor and IT Trainer at Hartron Skill Center, Kaithal, Haryana."
        keywords="Yogesh Banger Experience, Hartron Skill Center, IT Trainer, Computer Instructor"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#E4DCC8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <section className="relative max-w-4xl mx-auto px-5 sm:px-8">
        <p className="text-xs tracking-[0.25em] text-[#2F5D50] mb-3 font-mono">EXPERIENCE</p>
        <h1 className="font-['Zilla_Slab',_serif] text-4xl sm:text-5xl text-[#241F1B] mb-14">
          Work Experience
        </h1>

        <div className="relative pl-10">
          <div className="absolute left-[7px] top-2 bottom-2 border-l-2 border-dashed border-[#D9CFB8]" />

          {TIMELINE.map((entry, idx) => (
            <motion.div
              key={entry.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-14 last:mb-0"
            >
              <span className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-[#F6F1E7] border-2 border-[#2F5D50]" />

              <div className="border border-[#E4DCC8] bg-white rounded-lg p-6 sm:p-8">
                <span className="text-[11px] text-[#2F5D50] font-mono">{entry.period}</span>

                <h2 className="font-['Zilla_Slab',_serif] text-xl text-[#241F1B] mt-2">
                  {entry.role}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-[#7A7362] text-sm">
                  <FiBriefcase size={14} className="text-[#2F5D50]" />
                  <span>
                    {entry.org} <span className="text-[#7A7362]/80">— {entry.orgFull}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1 text-[#7A7362] text-sm">
                  <FiMapPin size={14} className="text-[#2F5D50]" />
                  <span>{entry.location}</span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {entry.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#4A453C] leading-relaxed">
                      <span className="text-[#E0A458] shrink-0">•</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}