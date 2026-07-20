import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  RiArrowRightUpLine,
  RiBookOpenFill,
  RiCodeSSlashFill,
  RiPhoneFill,
  RiRocket2Fill,
  RiShieldFlashLine,
  RiWindowLine,
} from "react-icons/ri";

const EXPERTISE = [
  {
    name: "Full Stack",
    description: "MERN development",
    icon: RiCodeSSlashFill,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Web Design",
    description: "Modern responsive UI",
    icon: RiWindowLine,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    name: "Cyber Security",
    description: "Secure web practices",
    icon: RiShieldFlashLine,
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    name: "BCA Student",
    description: "Continuous learner",
    icon: RiBookOpenFill,
    gradient: "from-purple-400 to-pink-500",
  },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
      mass: 0.8,
    },
  },
};

const IMAGE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9, rotateY: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      duration: 0.8,
    },
  },
};

const Hero = ({
  profileImage = "/images/yogesh-profile.webp",
  phoneNumber = "+919992540404",
  contactHref = "#contact",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const backgroundAnimation = shouldReduceMotion
    ? undefined
    : {
        scale: [1, 1.12, 1],
        x: [0, 28, 0],
        opacity: [0.2, 0.34, 0.2],
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-slate-300 sm:px-6 lg:px-8"
    >
      {/* Lightweight decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        <motion.div
          animate={backgroundAnimation}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px] sm:h-[460px] sm:w-[460px] sm:blur-[130px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.18, 1],
                  y: [0, -30, 0],
                  opacity: [0.18, 0.3, 0.18],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 right-[-8rem] h-80 w-80 rounded-full bg-purple-600/20 blur-[100px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Profile visual */}
        <div className="order-2 flex justify-center lg:order-1">
          <motion.div
            variants={IMAGE_VARIANTS}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { rotateX: 4, rotateY: -4, scale: 1.015 }
            }
            style={{ perspective: 1400, transformStyle: "preserve-3d" }}
            className="group relative aspect-square w-full max-w-[340px] will-change-transform sm:max-w-[430px]"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-cyan-500/70 via-blue-500/50 to-purple-600/70 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />

            <div className="absolute inset-[-1px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-px shadow-[0_0_60px_rgba(34,211,238,0.18)]">
              <div className="relative h-full w-full rounded-full border border-white/10 bg-slate-900/80 p-3 backdrop-blur-xl">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
                  <img
                    src={profileImage}
                    alt="Yogesh Banger, MERN stack developer"
                    width="430"
                    height="430"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-cyan-400/10" />
                  <div className="absolute inset-x-8 bottom-7 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                        Available for work
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        MERN Stack Developer
                      </p>
                    </div>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main content */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="order-1 flex flex-col gap-7 lg:order-2"
        >
          <motion.div
            variants={ITEM_VARIANTS}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
            Building useful digital experiences
          </motion.div>

          <motion.div variants={ITEM_VARIANTS}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-slate-500">
              Hello, I am
            </p>
            <h1
              id="hero-title"
              className="text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl xl:text-[6.5rem]"
            >
              YOGESH
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                BANGER
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={ITEM_VARIANTS}
            className="max-w-2xl text-base font-medium leading-8 text-slate-400 sm:text-lg"
          >
            I am a <strong className="font-semibold text-white">MERN stack developer</strong>{" "}
            and BCA student at{" "}
            <strong className="font-semibold text-cyan-300">RKSD College</strong>. I create fast,
            responsive web experiences and continuously explore{" "}
            <strong className="font-semibold text-purple-300">cyber security</strong> to build safer
            products.
          </motion.p>

          <motion.div
            variants={ITEM_VARIANTS}
            className="grid gap-3 sm:grid-cols-2"
          >
            {EXPERTISE.map(({ name, description, icon: Icon, gradient }) => (
              <motion.article
                key={name}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/55 p-4 backdrop-blur-md transition-colors duration-300 hover:border-cyan-400/30 hover:bg-slate-900/80"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.07]`}
                />
                <div className="relative flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.06] bg-slate-800/80 text-cyan-300 transition duration-300 group-hover:scale-105 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
                      {name}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">{description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={ITEM_VARIANTS}
            className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center"
          >
            <motion.a
              href={contactHref}
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_14px_40px_-18px_rgba(59,130,246,0.9)] transition-shadow hover:shadow-[0_18px_50px_-18px_rgba(168,85,247,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Let&apos;s work together
              <RiRocket2Fill
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>

            <a
              href={`tel:${phoneNumber}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Call Yogesh Banger"
            >
              <RiPhoneFill aria-hidden="true" className="text-cyan-300" />
              Call me
              <RiArrowRightUpLine
                aria-hidden="true"
                className="text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);