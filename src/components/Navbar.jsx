import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiInstagramLine, 
  RiLinkedinBoxFill, 
  RiYoutubeFill, 
  RiMenu3Line, 
  RiCloseLine,
  RiSendPlaneFill
} from 'react-icons/ri';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add shadow/shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { 
      icon: <RiLinkedinBoxFill size={20} />, 
      href: "https://www.linkedin.com/in/yogesh-banger-9a9695366/?skipRedirect=true", 
      color: "group-hover:text-[#0077b5]",
      bg: "hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10"
    },
    { 
      icon: <RiInstagramLine size={20} />, 
      href: "https://instagram.com/yogesh_banger_111", 
      color: "group-hover:text-[#e4405f]",
      bg: "hover:border-[#e4405f]/50 hover:bg-[#e4405f]/10"
    },
    { 
      icon: <RiYoutubeFill size={20} />, 
      href: "https://youtube.com/@yogeshbanger11?si=Ymo4QiGiuZ0YF1Ug", 
      color: "group-hover:text-[#ff0000]",
      bg: "hover:border-[#ff0000]/50 hover:bg-[#ff0000]/10"
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-4 sm:p-6 flex justify-center pointer-events-none font-sans">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full max-w-6xl pointer-events-auto transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between ${
          scrolled 
            ? 'bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-slate-950/40 backdrop-blur-md border border-slate-700/30'
        }`}
      >
        {/* ============================================================ */}
        {/* 3D EXTRUDED LOGO & DUAL-COLOR NAME AREA */}
        {/* ============================================================ */}
        <div className="flex items-center gap-4 cursor-pointer">
          
          {/* Interactive 3D YB Logo */}
          <motion.div 
            className="relative text-4xl font-black tracking-tighter w-14 h-10 flex items-center justify-center"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            {/* 3D Depth Layer 3 (Deepest) */}
            <motion.span 
              variants={{ rest: { x: 3, y: 3 }, hover: { x: 6, y: 6 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-[#3b0764] z-[1]"
            >
              YB
            </motion.span>

            {/* 3D Depth Layer 2 */}
            <motion.span 
              variants={{ rest: { x: 2, y: 2 }, hover: { x: 4, y: 4 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-[#7e22ce] z-[2]"
            >
              YB
            </motion.span>

            {/* 3D Depth Layer 1 */}
            <motion.span 
              variants={{ rest: { x: 1, y: 1 }, hover: { x: 2, y: 2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-[#a855f7] z-[3]"
            >
              YB
            </motion.span>

            {/* Top Face Layer (Dual Color Gradient) */}
            <motion.span 
              variants={{ rest: { x: 0, y: 0 }, hover: { x: -2, y: -2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 z-[4] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            >
              YB
            </motion.span>
          </motion.div>
          
          {/* Full Name Text (Now Dual-Color) */}
          <span className="text-2xl font-extrabold tracking-tight hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Yogesh Banger
          </span>
          
        </div>
        {/* ============================================================ */}

        {/* Right Corner: Social Icons & Action */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-5">
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 ${social.bg}`}
              >
                <span className={`transition-colors duration-300 ${social.color}`}>
                  {social.icon}
                </span>
              </motion.a>
            ))}
          </div>
          
          {/* Call Button */}
          <motion.a 
            href="tel:9992540404"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            Let's Talk 
            <RiSendPlaneFill size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors pointer-events-auto"
        >
          {isOpen ? <RiCloseLine size={26}/> : <RiMenu3Line size={26}/>}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[120%] left-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 p-6 md:hidden flex flex-col gap-6 shadow-2xl shadow-black rounded-3xl pointer-events-auto"
            >
              <div className="flex flex-col gap-4 items-center">
                {/* Mobile Call Button */}
                <motion.a
                  href="tel:9992540404"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl text-lg font-bold text-white flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <RiSendPlaneFill /> Let's Talk
                </motion.a>
              </div>
              
              {/* Mobile Socials */}
              <div className="flex gap-4 pt-6 border-t border-slate-800">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-cyan-400 flex-1 flex justify-center border border-slate-700 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}