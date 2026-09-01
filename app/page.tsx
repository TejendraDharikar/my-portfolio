"use client";

import { motion, useMotionValue, useSpring, useScroll, useVelocity, useTransform, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileDownload,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { GiSpiderWeb, GiSpiderMask, GiHangingSpider, GiSpiderBot } from "react-icons/gi";
import { Bebas_Neue, Inter } from "next/font/google";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const swingIn: Variants = {
  hidden: { opacity: 0, rotateZ: -10, y: -40, transformOrigin: "top left" },
  visible: {
    opacity: 1, rotateZ: 0, y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 }
  }
};

const spiderSense: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  hover: {
    x: [0, -3, 3, -3, 3, 0],
    textShadow: [
      "0px 0px 0px rgba(193,39,45,0)",
      "-2px 0px 8px rgba(193,39,45,0.9), 2px 0px 8px rgba(41,128,185,0.9)",
      "2px 0px 8px rgba(193,39,45,0.9), -2px 0px 8px rgba(41,128,185,0.9)",
      "-2px 0px 8px rgba(193,39,45,0.9), 2px 0px 8px rgba(41,128,185,0.9)",
      "0px 0px 0px rgba(193,39,45,0)",
    ],
    transition: { duration: 0.4 }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ---------- Background web layer: draws once on load, sits behind everything ---------- */
function WebBackdrop() {
  const strands = [
    "M -50 120 C 200 40, 500 200, 900 60 S 1400 140, 1600 80",
    "M -80 400 C 150 340, 420 480, 760 380 S 1250 420, 1650 460",
    "M -60 700 C 220 640, 480 820, 820 700 S 1300 760, 1620 640",
    "M 100 -50 C 180 200, 140 500, 220 900",
    "M 700 -50 C 640 250, 720 550, 660 950",
    "M 1300 -50 C 1360 260, 1280 560, 1350 980",
    "M -50 950 C 300 900, 600 1000, 950 920 S 1400 980, 1650 900",
  ];

  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full -z-10 opacity-[0.16]"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {strands.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#c1272d"
          strokeWidth={1.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ---------- Cursor web-trail ---------- */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 25, stiffness: 200 });
  const sy = useSpring(y, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 -z-10 hidden md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 260,
        height: 260,
        background:
          "radial-gradient(circle, rgba(193,39,45,0.10) 0%, rgba(193,39,45,0) 70%)",
        borderRadius: "50%",
      }}
    />
  );
}

/* ---------- Angular "pinned poster" card shape ---------- */
const clipCard = "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)";

/* ---------- Spiderman Animations ---------- */
function SpidermanSwing() {
  return (
    <motion.div
      className="fixed -top-10 right-[8%] md:right-[15%] z-0 pointer-events-none origin-top opacity-70 flex flex-col items-center"
      initial={{ rotate: -25 }}
      animate={{ rotate: 25 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <div className="w-[1.5px] h-[200px] md:h-[350px] bg-white/20" />
      <div className="transform -translate-y-4">
        <GiSpiderMask size={70} className="text-[#c1272d]" />
      </div>
    </motion.div>
  );
}

function HangingSpider() {
  return (
    <motion.div
      className="fixed -top-5 left-[5%] md:left-[10%] z-0 pointer-events-none opacity-80 flex flex-col items-center"
      initial={{ y: -400 }}
      animate={{ y: [ -400, 0, -50, -30, -400 ] }}
      transition={{ duration: 7, repeat: Infinity, repeatDelay: 12, ease: "easeInOut" }}
    >
      <div className="w-[1px] h-[300px] bg-white/30" />
      <div className="transform -translate-y-1">
        <GiHangingSpider size={40} className="text-[#c1272d]" />
      </div>
    </motion.div>
  );
}

function ScrollWebs() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const topWebY = useTransform(scrollVelocity, [100, 3000], [-350, 0]);
  const smoothTopWebY = useSpring(topWebY, { damping: 20, stiffness: 150 });

  const bottomWebY = useTransform(scrollVelocity, [-100, -3000], [350, 0]);
  const smoothBottomWebY = useSpring(bottomWebY, { damping: 20, stiffness: 150 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full flex justify-around pointer-events-none z-40 opacity-70"
        style={{ y: smoothTopWebY }}
      >
        <WebShooter direction="top" delay={0} />
        <WebShooter direction="top" delay={1} />
        <WebShooter direction="top" delay={2} />
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 w-full flex justify-around pointer-events-none z-40 opacity-70"
        style={{ y: smoothBottomWebY }}
      >
        <WebShooter direction="bottom" delay={0} />
        <WebShooter direction="bottom" delay={1} />
        <WebShooter direction="bottom" delay={2} />
      </motion.div>
    </>
  );
}

function WebShooter({ direction, delay }: { direction: "top" | "bottom", delay: number }) {
  const heights = ["h-40", "h-56", "h-48"];
  const hClass = heights[delay];
  
  if (direction === "top") {
    return (
      <div className="flex flex-col items-center">
         <div className={`w-[2px] ${hClass} bg-gradient-to-b from-transparent to-white/60`} />
         <GiSpiderWeb size={70} className="text-white/60 transform -translate-y-1/2" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
         <GiSpiderWeb size={70} className="text-white/60 transform translate-y-1/2" />
         <div className={`w-[2px] ${hClass} bg-gradient-to-b from-white/60 to-transparent`} />
      </div>
    );
  }
}

function CornerWebs() {
  return (
    <>
      <div className="fixed top-0 left-0 pointer-events-none opacity-30 -z-10">
        <GiSpiderWeb size={350} className="text-white/20 transform -translate-x-1/4 -translate-y-1/4" />
      </div>
      <div className="fixed bottom-0 right-0 pointer-events-none opacity-30 -z-10">
        <GiSpiderWeb size={350} className="text-white/20 transform translate-x-1/4 translate-y-1/4" />
      </div>
    </>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = ["Me", "Skills", "Experience", "Projects", "Contact"];

  return (
    <div
      className={`${display.variable} ${body.variable} font-body bg-[#0b0b10] text-[#eae7e2] min-h-screen relative`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <WebBackdrop />
      <CornerWebs />
      <ScrollWebs />
      <SpidermanSwing />
      <HangingSpider />
      <CursorGlow />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#0b0b10]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-3xl tracking-wide text-[#eae7e2]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TEJENDRA <span className="text-[#c1272d]">DHARIKAR</span>
          </h1>

          <ul className="hidden md:flex space-x-9 text-base">
            {nav.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-[#c8c6c1] hover:text-[#eae7e2] transition-colors group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#c1272d] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-2xl text-[#eae7e2]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden bg-[#0b0b10] border-t border-white/10 flex flex-col px-6 py-4 space-y-4"
          >
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#c8c6c1]"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Intro */}
      <section id="me" className="min-h-screen flex items-center px-6 pt-24">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#c1272d] text-sm tracking-widest mb-4"
          >
            Fullstack developer — Nepal, open to remote
          </motion.p>
          <motion.h2
            variants={spiderSense}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-7xl md:text-9xl leading-[0.9] mb-8 text-left cursor-crosshair"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BUILDING THINGS
            <br />
            THAT <span className="text-[#c1272d]">HOLD TOGETHER</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl max-w-xl text-[#c8c6c1] leading-relaxed mb-10"
          >
            I work across TypeScript, Next.js, Express.js, Prisma, and
            PostgreSQL — building APIs and interfaces that stay solid under real
            traffic. I've shipped a full production site for a paying client,
            and I currently build features at SkillPrompt.
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(193,39,45,0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block px-8 py-3 border border-[#c1272d] text-[#eae7e2] hover:bg-[#c1272d] transition-colors"
          >
            Get in touch
          </motion.a>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 border-t border-white/10 px-6 relative overflow-hidden">
        <motion.div
          initial={{ x: "-10vw", y: 20 }}
          whileInView={{ x: "110vw", y: [20, -10, 30, -5, 20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 text-[#c1272d] opacity-20 pointer-events-none z-0"
        >
          <GiSpiderBot size={40} />
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl mb-14 text-[#c1272d]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Skills
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                items: [
                  "React.js",
                  "Next.js",
                  "TypeScript",
                  "TailwindCSS",
                  "React Query",
                  "Zustand",
                  "React Hook Form",
                ],
              },
              {
                title: "Backend",
                items: [
                  "Node.js & Express.js",
                  "Prisma ORM",
                  "Zod Validation",
                  "REST APIs",
                  "ts-rest",
                ],
              },
              {
                title: "Databases & Tools",
                items: ["PostgreSQL", "MongoDB", "MySQL", "Git & GitHub"],
              },
            ].map((skill) => (
              <motion.div
                key={skill.title}
                variants={swingIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative group bg-[#17171f] border border-white/10 p-8 transition-shadow hover:shadow-[0_0_30px_-8px_rgba(193,39,45,0.5)] overflow-hidden"
                style={{ clipPath: clipCard }}
              >
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-15 transform translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none">
                  <GiSpiderWeb size={180} className="text-[#c1272d]" />
                </div>

                <h3
                  className="text-2xl mb-6 text-[#eae7e2] border-b border-white/10 pb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {skill.title}
                </h3>
                <ul className="space-y-3 text-[#c8c6c1]">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm flex items-center group/item">
                      <GiSpiderWeb className="text-[#c1272d]/40 group-hover/item:text-[#c1272d] mr-3 transition-colors" size={14} />
                      <span className="group-hover/item:text-[#eae7e2] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 border-t border-white/10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl mb-14 text-[#c1272d]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experience
          </motion.h2>

          <div className="relative border-l-2 border-white/10 pl-8 md:pl-12 space-y-12 ml-4 md:ml-0">
            {/* First Experience Item */}
            <div className="relative">
              {/* Timeline Web Dot */}
              <div className="absolute top-6 -left-[2.8rem] md:-left-[3.8rem] w-10 h-10 bg-[#0b0b10] rounded-full flex items-center justify-center text-[#c1272d] border border-white/20 z-10 shadow-[0_0_15px_rgba(193,39,45,0.3)]">
                <GiSpiderWeb size={20} />
              </div>
              
              {/* Connecting Web Line */}
              <div className="absolute top-10 -left-[2.8rem] md:-left-[3.8rem] w-[2.8rem] md:w-[3.8rem] h-[1.5px] bg-white/10 z-0" />

              <motion.div
                variants={swingIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="relative group bg-[#17171f] border border-white/10 p-8 md:p-10 transition-all hover:border-[#c1272d]/50 overflow-hidden"
                style={{ clipPath: clipCard }}
              >
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-15 transform translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none">
                  <GiSpiderWeb size={250} className="text-[#c1272d]" />
                </div>
                
                <div className="flex flex-wrap justify-between items-baseline mb-2">
                  <h3 className="text-2xl text-[#eae7e2]" style={{ fontFamily: "var(--font-display)" }}>
                    Fullstack Developer Intern — SkillPrompt
                  </h3>
                  <span className="text-[#8b8b93] text-sm tracking-wider">Jun 2026 – Present</span>
                </div>
                <p className="text-[#c1272d] text-sm italic mb-5 tracking-wide">Project: yourOSHC</p>
                <ul className="text-[#c8c6c1] space-y-3 list-disc list-inside text-sm leading-relaxed">
                  <li>Built and maintained REST APIs using Express.js and Prisma ORM</li>
                  <li>Developed new frontend pages and features with Next.js and TypeScript</li>
                  <li>Identified and fixed bugs across a live production application</li>
                  <li>Collaborated with a cross-functional development team</li>
                </ul>
              </motion.div>
            </div>

            {/* Second Experience Item */}
            <div className="relative">
              {/* Timeline Web Dot */}
              <div className="absolute top-6 -left-[2.8rem] md:-left-[3.8rem] w-10 h-10 bg-[#0b0b10] rounded-full flex items-center justify-center text-[#c1272d] border border-white/20 z-10 shadow-[0_0_15px_rgba(193,39,45,0.3)]">
                <GiSpiderWeb size={20} />
              </div>
              
              {/* Connecting Web Line */}
              <div className="absolute top-10 -left-[2.8rem] md:-left-[3.8rem] w-[2.8rem] md:w-[3.8rem] h-[1.5px] bg-white/10 z-0" />

              <motion.div
                variants={swingIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="relative group bg-[#17171f] border border-white/10 p-8 md:p-10 transition-all hover:border-[#c1272d]/50 overflow-hidden"
                style={{ clipPath: clipCard }}
              >
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-15 transform translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none">
                  <GiSpiderWeb size={250} className="text-[#c1272d]" />
                </div>
                
                <div className="flex flex-wrap justify-between items-baseline mb-2">
                  <h3 className="text-2xl text-[#eae7e2]" style={{ fontFamily: "var(--font-display)" }}>
                    Freelance Fullstack Developer
                  </h3>
                  <span className="text-[#8b8b93] text-sm tracking-wider">Jun 2026</span>
                </div>
                <p className="text-[#c1272d] text-sm italic mb-5 tracking-wide">
                  Client: Manjushree Clinic —{" "}
                  <a href="https://manjushreeayurvediccenter.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#eae7e2]">manjushreeayurvediccenter.com</a>
                </p>
                <ul className="text-[#c8c6c1] space-y-3 list-disc list-inside text-sm leading-relaxed">
                  <li>Independently designed, built, and deployed a full production website with a public site and private admin panel</li>
                  <li>Built the admin panel with complete CRUD for doctors and appointments</li>
                  <li>Used TypeScript, Next.js, Express.js, Prisma ORM, and PostgreSQL end-to-end; handled deployment and delivery solo</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 border-t border-white/10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl mb-14 text-[#c1272d]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Manjushree Clinic",
                desc: "Full production website + admin dashboard for a healthcare clinic client — public site, appointment booking, admin CRUD for doctors and appointments.",
                stack: "Next.js · Express.js · Prisma · PostgreSQL",
                live: "https://manjushreeayurvediccenter.com/",
                github: null as string | null,
              },
              {
                title: "Campus Mate",
                desc: "Student management system web app for handling student records and administrative workflows.",
                stack: "TypeScript",
                live: null as string | null,
                github: "https://github.com/TejendraDharikar/campusMate",
              },
              {
                title: "Chautari",
                desc: "Mini social media platform with a feed and user interaction features.",
                stack: "TypeScript",
                live: null as string | null,
                github: "https://github.com/TejendraDharikar/chautari",
              },
              {
                title: "UniHub",
                desc: "Platform for university students to collaborate and share resources.",
                stack: "TypeScript",
                live: null as string | null,
                github: null as string | null,
              },
            ].map((proj) => (
              <motion.div
                key={proj.title}
                variants={swingIn}
                whileHover={{ scale: 1.02, rotateZ: 1, y: -4 }}
                className="relative group bg-[#17171f] border border-white/10 p-8 transition-shadow hover:shadow-[0_0_30px_-8px_rgba(193,39,45,0.5)] overflow-hidden"
                style={{ clipPath: clipCard }}
              >
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transform translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none">
                  <GiSpiderWeb size={200} className="text-[#c1272d]" />
                </div>
                <h3
                  className="text-2xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {proj.title}
                </h3>
                <p className="text-[#c8c6c1] mb-4 leading-relaxed">
                  {proj.desc}
                </p>
                <p className="text-xs text-[#8b8b93] mb-5 tracking-wide">
                  {proj.stack}
                </p>
                <div className="flex gap-5">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c1272d] hover:text-[#eae7e2] text-sm flex items-center gap-1.5 transition-colors"
                    >
                      Live site <FaExternalLinkAlt size={11} />
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c1272d] hover:text-[#eae7e2] text-sm flex items-center gap-1.5 transition-colors"
                    >
                      GitHub <FaGithub size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 border-t border-white/10 px-6">
        <div className="max-w-3xl mx-auto text-left">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl mb-6 text-[#c1272d]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-[#c8c6c1] mb-8"
          >
            Open to remote fullstack and backend roles. Reach out.
          </motion.p>

          <motion.a
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 mb-10 px-7 py-3 border border-[#c1272d] text-[#eae7e2] hover:bg-[#c1272d] transition-colors"
          >
            <FaFileDownload /> Download resume
          </motion.a>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <motion.a
              variants={fadeInUp}
              href="mailto:tejendradharikar@gmail.com"
              className="p-3 border border-white/15 hover:border-[#c1272d] hover:text-[#c1272d] transition-colors"
            >
              <FaEnvelope size={22} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              href="https://github.com/TejendraDharikar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/15 hover:border-[#c1272d] hover:text-[#c1272d] transition-colors"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              href="https://www.linkedin.com/in/tejendra-dharikar/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/15 hover:border-[#c1272d] hover:text-[#c1272d] transition-colors"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10 text-center text-[#8b8b93] text-sm">
        © {new Date().getFullYear()} Tejendra Dharikar
      </footer>
    </div>
  );
}
