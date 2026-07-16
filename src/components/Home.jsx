import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiCodeSSlashFill, 
  RiWindowLine, 
  RiShieldFlashLine, 
  RiBookOpenFill, 
  RiPhoneFill,
  RiRocket2Fill 
} from 'react-icons/ri';

const Hero = () => {
  const expertise = [
    { icon: <RiCodeSSlashFill size={20}/>, name: "Full Stack", color: "from-cyan-400 to-blue-500" },
    { icon: <RiWindowLine size={20}/>, name: "Web Design", color: "from-blue-400 to-indigo-500" },
    { icon: <RiShieldFlashLine size={20}/>, name: "Cyber Security", color: "from-indigo-400 to-purple-500" },
    { icon: <RiBookOpenFill size={20}/>, name: "BCA Student", color: "from-purple-400 to-pink-500" },
  ];

  // 1. Main container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // 2. NEW: Dedicated text animation variants for the cinematic blur reveal
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.6 }
    }
  };

  const textWord = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center px-6 pt-28 pb-12 overflow-hidden font-sans">
      
      {/* 3D BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-cyan-600/30 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] right-[5%] w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full" 
        />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* LEFT SIDE: 3D Holographic Profile Frame */}
        <div className="flex justify-center order-2 lg:order-1" style={{ perspective: 2000 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            whileHover={{ rotateX: 10, rotateY: -10, scale: 1.02 }}
            className="relative w-80 h-80 sm:w-[450px] sm:h-[450px] group transform-style-3d cursor-grab active:cursor-grabbing"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-700 animate-spin-slow" />
            <div className="relative z-10 w-full h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-full p-3 shadow-[0_0_40px_rgba(6,182,212,0.2)] flex items-center justify-center transform translate-z-10 group-hover:border-cyan-500/50 transition-colors duration-500">
              <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden border-4 border-slate-800 relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img 
                  src="" 
                  alt="Yogesh Banger"
                  className="w-full h-145 object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-out scale-110 group-hover:scale-100"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Content & Interactive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 order-1 lg:order-2"
        >
          {/* Header & Contact */}
          <div className="flex justify-between items-start">
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                YOGESH<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  BANGER
                </span>
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants} className="hidden sm:flex flex-col items-end gap-2 text-right mt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/70">Secure Line</span>
              <a href="tel:+919992540404" className="group flex items-center gap-2 text-white font-bold hover:text-cyan-400 transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                <RiPhoneFill className="text-cyan-400 group-hover:rotate-12 transition-transform"/>
                Call Me
              </a>
            </motion.div>
          </div>

          {/* ========================================= */}
          {/* UPGRADED: Cinematic About Me Text           */}
          {/* ========================================= */}
          <motion.div 
            variants={itemVariants} 
            className="max-w-xl"
          >
            <motion.div 
              variants={textContainer}
              initial="hidden"
              animate="show"
              className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed flex flex-wrap gap-x-2 gap-y-1"
            >
              <motion.span variants={textWord}>Hi, I am a</motion.span>
              
              <motion.span variants={textWord} className="relative inline-block group cursor-default">
                <span className="absolute -inset-1 bg-cyan-500/20 blur-lg rounded-lg group-hover:bg-cyan-500/40 transition-all duration-500"></span>
                <span className="relative text-white font-bold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-cyan-300 transition-colors">Web Developer</span>
              </motion.span>
              
              <motion.span variants={textWord}>and a BCA student at</motion.span>
              
              <motion.span variants={textWord} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-black tracking-widest uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                RKSD COLLEGE.
              </motion.span>

              <motion.div variants={textWord} className="w-full mt-2">
                Extremely passionate about creating dynamic web experiences and the world of
                <span className="relative inline-block group ml-2 cursor-default">
                  <span className="absolute -inset-1 bg-purple-500/20 blur-lg rounded-lg group-hover:bg-purple-500/50 transition-all duration-500"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-black drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover:from-cyan-400 group-hover:to-purple-500 transition-colors duration-500">cyber security</span>.
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3D Expertise Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 perspective-1000">
            {expertise.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02, rotateX: 5, rotateY: -5, boxShadow: "0 20px 40px -10px rgba(6, 182, 212, 0.15)" }}
                className="group flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl transition-all cursor-pointer hover:border-cyan-500/50 overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative p-3 bg-slate-800 text-slate-300 rounded-xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors shadow-inner">
                  {item.icon}
                </div>
                <span className="relative text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] group border border-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Team Up <RiRocket2Fill size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;