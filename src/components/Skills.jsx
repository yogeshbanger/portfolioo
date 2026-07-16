import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, 
  SiPython, 
  SiTailwindcss, 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiMongodb, 
  SiNextdotjs 
} from 'react-icons/si';
import { MdSecurity } from 'react-icons/md';

export default function Home() {
  const skills = [
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'Python', Icon: SiPython },
    { name: 'Tailwind CSS', Icon: SiTailwindcss },
    { name: 'React', Icon: SiReact },
    { name: 'Node.js', Icon: SiNodedotjs },
    { name: 'TypeScript', Icon: SiTypescript },
    { name: 'MongoDB', Icon: SiMongodb },
    { name: 'Security', Icon: MdSecurity },
    { name: 'Next.js', Icon: SiNextdotjs },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20 px-4 font-sans overflow-hidden">
      
      {/* Centered Heading Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20 relative z-10"
      >
        <motion.h1 
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '200% 200%' }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 drop-shadow-[0_0px_15px_rgba(6,182,212,0.4)] cursor-default"
        >
          SKILLS.
        </motion.h1>
        <p className="text-xl md:text-3xl text-gray-400 font-light tracking-[0.2em] uppercase">
          Refined Technological Expertise
        </p>
      </motion.div>

      {/* 3D Animated Skills Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }} 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl w-full perspective-1000"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2 
            }}
            whileHover={{ 
              scale: 1.08, 
              rotateX: 15, 
              rotateY: -15, 
              z: 50,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            whileTap={{ scale: 0.95 }}
            // Changed overflow and background for a sleeker border effect
            className="group relative flex flex-col items-center justify-center p-10 rounded-2xl bg-[#0f0f0f] border-2 border-transparent hover:border-cyan-500/30 cursor-pointer overflow-hidden shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 1. Massive Dual-Color Glow (Behind everything) */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-2xl -z-10"></div>
            
            {/* 2. The Sweeping Glass Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-[800ms] ease-in-out z-0"></div>

            {/* 3. Parallax Inner Container - This is what creates the true 3D pop */}
            <div 
              className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-2"
              style={{ transform: 'translateZ(50px)' }} // Pushes content out toward the user
            >
              {/* Icon */}
              <skill.Icon className="text-7xl mb-6 text-gray-600 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-none group-hover:drop-shadow-[0_0_30px_rgba(217,70,239,1)]" />

              {/* Skill Name */}
              <span className="text-gray-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 font-bold tracking-widest transition-all duration-300 uppercase text-sm group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {skill.name}
              </span>
            </div>

          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}