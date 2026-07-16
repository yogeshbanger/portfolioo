import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, CheckCircle2, Code2, Database, Globe } from 'lucide-react';

const WorkExperience = () => {
  // 1. Create a reference to the main section container
  const containerRef = useRef(null);

  // 2. Track the scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // Starts drawing when top hits center, finishes when bottom hits center
  });

  // 3. Map the scroll progress (0 to 1) to a scale value (0 to 1) for the line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experiences = [
    {
      title: "Node.js Developer",
      company: "Tech Innovations Inc.",
      type: "Full-time",
      period: "2025 - Present",
      location: "Kaithal",
      description: "Developed and maintained web applications using modern technologies.",
      skills: ["Express.js", "Nodemailer", "MongoDB", "Dotenv"],
      highlights: [
        "Successfully delivered a client-based frontend project (Wisky Hub) with a responsive and modern user interface.",
        "Integrated RESTful APIs using Express.js and Axios for seamless communication."
      ],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions LLC",
      type: "Full-time",
      period: "2025 - 2026",
      location: "Kaithal, Haryana",
      description: "Created responsive and interactive user interfaces for various clients. Collaborated with UX designers.",
      skills: ["React.js", "Tailwind CSS", "React Router", "Framer Motion", "Lucide React"],
      highlights: [
        "Improved user experience by creating a responsive layout compatible across multiple devices.",
        "Designed and built reusable React components to ensure scalable frontend architecture."
      ],
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Backend Developer",
      company: "Data Systems Corp",
      type: "Contract",
      period: "2025 - 2026",
      location: "Kaithal, Haryana",
      description: "Built robust backend systems and APIs. Optimized database performance and implemented security.",
      skills: ["Node.js", "Axios", "MongoDB", "JWT", "Express.js"],
      highlights: [
        "Implemented a secure email OTP system using Node.js and Nodemailer.",
        "Developed a full-stack MERN application with complete authentication functionality."
      ],
      icon: <Code2 className="w-6 h-6" />
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-[#0a0a0a] py-20 px-6 font-sans overflow-hidden"
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 drop-shadow-[0_0px_15px_rgba(6,182,212,0.4)]"
          >
            EXPERIENCE.
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-widest uppercase text-sm">
            Professional Journey & Architecture
          </p>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-6xl mx-auto relative perspective-1000">
        
        {/* The Base Track Line (Dimmed, always visible) */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-800 rounded-full" />

        {/* The Glowing Animated Line (Draws on scroll) */}
        <motion.div 
          className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] rounded-full origin-top"
          style={{ scaleY }}
        />

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full group">
              
              {/* Timeline Center Dot (Animated) */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-14 h-14 bg-[#0a0a0a] border-4 border-cyan-400 rounded-full z-20 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:border-fuchsia-500 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.8)] transition-all duration-500"
              >
                <span className="text-cyan-400 group-hover:text-fuchsia-500 transition-colors duration-500">
                  {exp.icon}
                </span>
              </motion.div>

              {/* Layout spacer for alternating sides */}
              <div className="hidden md:block w-[45%]" />

              {/* Content Card container - Alternates left/right on desktop */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`w-full pl-20 pr-6 md:px-0 md:w-[45%] ${
                  index % 2 === 0 ? 'md:order-last' : 'md:order-first md:text-right'
                }`}
              >
                {/* 3D Glassmorphism Card */}
                <div className="relative p-8 rounded-3xl bg-[#0f0f0f]/80 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-500 overflow-hidden group/card z-10">
                  
                  {/* Dynamic Hover Background Glow */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-600/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                  <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-start md:items-end'} mb-6`}>
                    <h3 className="text-3xl font-black text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-cyan-400 group-hover/card:to-fuchsia-400 transition-all duration-300">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <p className="text-fuchsia-400 font-bold uppercase text-sm tracking-widest">
                        {exp.company}
                      </p>
                      <span className="text-gray-500">•</span>
                      <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center text-gray-400 text-sm mb-6 ${index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                    <MapPin className="w-4 h-4 mr-1 text-cyan-500" /> {exp.location}
                  </div>

                  <p className={`text-gray-300 mb-6 leading-relaxed ${index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                    {exp.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-4 mb-8">
                    {exp.highlights.map((item, i) => (
                      <div key={i} className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row md:flex-row-reverse'}`}>
                        <CheckCircle2 className={`w-5 h-5 text-cyan-400 shrink-0 mt-0.5 ${index % 2 === 0 ? 'mr-3' : 'mr-3 md:mr-0 md:ml-3'}`} />
                        <span className={`text-gray-400 text-sm ${index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Pills */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-bold uppercase tracking-wider bg-[#1a1a1a] text-gray-400 px-4 py-2 rounded-xl border border-gray-800 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-fuchsia-600 hover:text-white hover:border-transparent transition-all duration-300 hover:shadow-[0_5px_15px_rgba(217,70,239,0.4)] hover:-translate-y-1 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;