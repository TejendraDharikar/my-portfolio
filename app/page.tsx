"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileDownload,
} from "react-icons/fa";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiBookOpen,
  FiBox,
  FiBriefcase,
  FiChevronDown,
  FiCode,
  FiMenu,
  FiMoon,
  FiServer,
  FiSun,
  FiX,
  FiZap,
} from "react-icons/fi";
import {
  SiExpress,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiReacthookform,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Bebas_Neue, Inter } from "next/font/google";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

/* ---------- Motion variants ---------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ---------- Theme persistence ---------- */
const themeStorageKey = "portfolio-theme";
const themeChangeEvent = "portfolio-theme-change";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function getThemeSnapshot(): "dark" | "light" {
  return window.localStorage.getItem(themeStorageKey) === "light"
    ? "light"
    : "dark";
}

function getServerThemeSnapshot(): "dark" | "light" {
  return "dark";
}

/* ---------- Scroll spy ---------- */
const sectionIds = ["me", "skills", "experience", "projects", "contact"];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* ---------- Tracks whether the page has scrolled past the top ---------- */
function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/* ---------- Scroll progress bar ---------- */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
      }}
    />
  );
}

/* ---------- Ambient background: grid + drifting gradient glows ---------- */
function BackgroundAtmosphere({ theme }: { theme: "dark" | "light" }) {
  const glowA =
    theme === "dark" ? "rgba(129,140,248,0.26)" : "rgba(79,70,229,0.13)";
  const glowB =
    theme === "dark" ? "rgba(99,102,241,0.24)" : "rgba(67,56,202,0.12)";
  const glowC =
    theme === "dark" ? "rgba(67,56,202,0.22)" : "rgba(55,48,163,0.1)";

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundSize: "44px 44px",
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full blur-[120px]"
        style={{ background: glowA }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-48 w-[640px] h-[640px] rounded-full blur-[130px]"
        style={{ background: glowB }}
        animate={{ x: [0, -40, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[560px] h-[560px] rounded-full blur-[110px]"
        style={{ background: glowC }}
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 left-1/2 w-[480px] h-[480px] rounded-full blur-[120px]"
        style={{ background: glowA }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- Subtle film-grain texture for depth ---------- */
function NoiseOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.04] mix-blend-overlay"
      aria-hidden
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ---------- Soft cursor glow that follows the pointer ---------- */
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
        width: 340,
        height: 340,
        background:
          "radial-gradient(circle, var(--accent-soft) 0%, var(--accent-2-soft) 45%, transparent 72%)",
        borderRadius: "50%",
      }}
    />
  );
}

/* ---------- Magnetic hover wrapper for primary CTAs ---------- */
type MagneticProps = React.ComponentPropsWithoutRef<typeof motion.a> & {
  strength?: number;
};

function Magnetic({
  children,
  className,
  strength = 16,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) / strength);
    y.set((e.clientY - rect.top - rect.height / 2) / strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

/* ---------- Card with a mouse-tracked spotlight glow ---------- */
type AccentTint = "accent" | "accent-2" | "accent-3";

type SpotlightCardProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  tint?: AccentTint;
};

function SpotlightCard({
  className = "",
  children,
  tint = "accent",
  style,
  ...rest
}: SpotlightCardProps) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      className={`spotlight-card ${className}`}
      style={{ ...style, ["--accent-soft" as never]: `var(--${tint}-soft)` }}
      {...rest}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* ---------- Thin gradient ring wrapper for premium card borders ---------- */
const tintGradient: Record<AccentTint, string> = {
  accent: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
  "accent-2":
    "linear-gradient(135deg, var(--accent-2) 0%, var(--accent-3) 100%)",
  "accent-3": "linear-gradient(135deg, var(--accent-3) 0%, var(--accent) 100%)",
};

function GradientBorder({
  children,
  tint = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tint?: AccentTint;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-[1.5px] opacity-80 hover:opacity-100 transition-opacity duration-300 ${className}`}
      style={{ backgroundImage: tintGradient[tint] }}
    >
      {children}
    </div>
  );
}

/* ---------- Infinite scrolling row of tech marks ---------- */
function TechMarquee({
  items,
}: {
  items: { name: string; icon: IconType; color: string }[];
}) {
  const loop = [...items, ...items];
  return (
    <div
      className="relative mt-14 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="flex w-max gap-10 animate-marquee">
        {loop.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm text-[var(--text-muted)]"
          >
            <t.icon style={{ color: t.color }} size={18} />
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Tech pill whose icon/background colors swap on hover ---------- */
function TechChip({
  name,
  icon: Icon,
  color,
  fill,
  className = "",
}: {
  name: string;
  icon: IconType;
  color: string;
  fill?: string;
  className?: string;
}) {
  return (
    <span
      className={`swap-chip inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] ${className}`}
      style={{ ["--chip-fill" as never]: fill ?? color }}
    >
      <Icon className="swap-icon" style={{ color }} size={14} />
      <span className="swap-label">{name}</span>
    </span>
  );
}

/* ---------- Data ---------- */
const heroTech: { name: string; icon: IconType; color: string }[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, color: "var(--text)" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "var(--text)" },
  { name: "Prisma", icon: SiPrisma, color: "var(--text)" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

const stats: { label: string; value: string; tint: AccentTint }[] = [
  { label: "Projects shipped", value: "4+", tint: "accent" },
  { label: "Production client site", value: "1", tint: "accent-2" },
  { label: "Core technologies", value: "16+", tint: "accent-3" },
  { label: "Open to", value: "Remote", tint: "accent" },
];

const skillCategories: {
  title: string;
  description: string;
  tint: AccentTint;
  items: { name: string; icon: IconType; color: string; fill?: string }[];
}[] = [
  {
    title: "Frontend",
    description: "Interfaces that feel fast and stay maintainable.",
    tint: "accent-2",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB", fill: "#0e7490" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--text)" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "React Query", icon: SiReactquery, color: "#FF4154" },
      { name: "React Hook Form", icon: SiReacthookform, color: "#EC5990" },
      { name: "Zustand", icon: FiBox, color: "var(--accent)" },
    ],
  },
  {
    title: "Backend",
    description: "APIs and services built to hold up under real traffic.",
    tint: "accent",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "var(--text)" },
      { name: "Prisma ORM", icon: SiPrisma, color: "var(--text)" },
      { name: "Zod Validation", icon: SiZod, color: "var(--text)" },
      { name: "REST APIs", icon: FiServer, color: "var(--accent)" },
      { name: "ts-rest", icon: FiCode, color: "var(--accent)" },
    ],
  },
  {
    title: "Databases & Tools",
    description: "Storage, versioning, and the tools that keep teams in sync.",
    tint: "accent-3",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Git & GitHub", icon: SiGithub, color: "var(--text)" },
    ],
  },
];

const experience: {
  role: string;
  org: string;
  type: string;
  icon: IconType;
  project: string;
  projectLinkText: string;
  projectHref?: string;
  period: string;
  tint: AccentTint;
  current?: boolean;
  points: string[];
}[] = [
  {
    role: "Fullstack Developer",
    org: "SkillPrompt",
    type: "Full-time",
    icon: FiBriefcase,
    project: "Project",
    tint: "accent",
    current: true,
    projectLinkText: "yourOSHC",
    period: "Jun 2026 – Present",
    points: [
      "Built and maintained REST APIs using Express.js and Prisma ORM",
      "Developed new frontend pages and features with Next.js and TypeScript",
      "Identified and fixed bugs across a live production application",
      "Collaborated with a cross-functional development team",
    ],
  },
  {
    role: "Freelance Fullstack Developer",
    org: "Manjushree Clinic",
    type: "Freelance",
    icon: FiZap,
    project: "Live site",
    tint: "accent-2",
    projectLinkText: "manjushreeayurvediccenter.com",
    projectHref: "https://manjushreeayurvediccenter.com/",
    period: "Jun 2026",
    points: [
      "Independently designed, built, and deployed a full production website with a public site and private admin panel",
      "Built the admin panel with complete CRUD for doctors and appointments",
      "Used TypeScript, Next.js, Express.js, Prisma ORM, and PostgreSQL end-to-end; handled deployment and delivery solo",
    ],
  },
  {
    role: "Fullstack Developer Intern",
    org: "SkillPrompt",
    type: "Internship",
    icon: FiBookOpen,
    project: "Project",
    tint: "accent-3",
    projectLinkText: "yourOSHC",
    period: "Jan 2026 – May 2026",
    points: [
      "Onboarded onto the yourOSHC codebase and contributed under senior engineer guidance",
      "Built UI components with Next.js and TypeScript as part of the frontend team",
      "Learned REST API development patterns using Express.js and Prisma ORM",
      "Participated in code reviews and sprint planning",
    ],
  },
];

const techIconMap: Record<
  string,
  { icon: IconType; color: string; fill?: string }
> = {
  "Next.js": { icon: SiNextdotjs, color: "var(--text)" },
  "Express.js": { icon: SiExpress, color: "var(--text)" },
  Prisma: { icon: SiPrisma, color: "var(--text)" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
};

const projects = [
  {
    title: "Manjushree Clinic",
    desc: "Full production website + admin dashboard for a healthcare clinic client — public site, appointment booking, admin CRUD for doctors and appointments.",
    stack: ["Next.js", "Express.js", "Prisma", "PostgreSQL"],
    live: "https://manjushreeayurvediccenter.com/",
    github: null as string | null,
  },
  {
    title: "Campus Mate",
    desc: "Student management system web app for handling student records and administrative workflows.",
    stack: ["TypeScript"],
    live: null as string | null,
    github: "https://github.com/TejendraDharikar/campusMate",
  },
  {
    title: "Chautari",
    desc: "Mini social media platform with a feed and user interaction features.",
    stack: ["TypeScript"],
    live: null as string | null,
    github: "https://github.com/TejendraDharikar/chautari",
  },
  {
    title: "UniHub",
    desc: "Platform for university students to collaborate and share resources.",
    stack: ["TypeScript"],
    live: null as string | null,
    github: null as string | null,
  },
];

const nav = ["Me", "Skills", "Experience", "Projects", "Contact"];

/* ---------- Page ---------- */
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const active = useScrollSpy(sectionIds);
  const scrolled = useScrolled();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  const cardBase =
    "bg-[var(--surface)] backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-[0_0_50px_-14px_var(--accent-soft-strong)]";

  return (
    <div
      data-theme={theme}
      className={`${display.variable} ${body.variable} font-body bg-[var(--bg)] text-[var(--text)] min-h-screen relative overflow-x-hidden`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <ScrollProgressBar />
      <BackgroundAtmosphere theme={theme} />
      <NoiseOverlay />
      <CursorGlow />

      {/* Navbar */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 transition-[padding] duration-300 ease-out"
        style={{ paddingTop: scrolled ? "0.625rem" : "1.25rem" }}
      >
        <div className="relative w-full max-w-5xl">
          <div
            className="rounded-full p-[1px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.45)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, color-mix(in srgb, var(--accent) 45%, transparent), color-mix(in srgb, var(--accent-2) 55%, transparent), color-mix(in srgb, var(--accent-3) 45%, transparent))",
            }}
          >
            <nav className="rounded-full bg-[var(--nav-bg)] backdrop-blur-xl">
              <div
                className={`flex items-center justify-between gap-4 px-3 md:px-4 transition-all duration-300 ${
                  scrolled ? "py-2" : "py-2.5"
                }`}
              >
                <a href="#me" className="flex items-center gap-2.5 shrink-0">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white shrink-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--accent), var(--accent-3))",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    TD
                  </span>
                  <span
                    className="hidden sm:inline text-lg tracking-wide text-[var(--text)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    TEJENDRA{" "}
                    <span
                      className="bg-clip-text text-transparent animate-gradient-shift"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent-2), var(--accent))",
                      }}
                    >
                      DHARIKAR
                    </span>
                  </span>
                </a>

                <ul className="hidden md:flex items-center gap-1 text-sm">
                  {nav.map((item) => {
                    const id = item.toLowerCase();
                    const isActive = active === id;
                    return (
                      <li key={item} className="relative">
                        <a
                          href={`#${id}`}
                          className={`relative z-10 block px-4 py-2 rounded-full transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                          }`}
                        >
                          {item}
                        </a>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(135deg, var(--accent), var(--accent-2))",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 text-xl rounded-full text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition-colors"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}
                    aria-pressed={theme === "light"}
                    title={`Switch to ${theme === "dark" ? "day" : "night"} mode`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={theme}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                      </motion.span>
                    </AnimatePresence>
                  </button>

                  <button
                    className="md:hidden p-2 text-xl rounded-full text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {isOpen ? <FiX /> : <FiMenu />}
                    </motion.span>
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-3xl border border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl shadow-[0_15px_45px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="flex flex-col p-2">
                  {nav.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="px-4 py-3 rounded-2xl text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Intro */}
      <section
        id="me"
        className="relative min-h-screen flex items-center px-6 pt-28 pb-16"
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[var(--border-strong)] text-xs tracking-widest uppercase text-[var(--text-secondary)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            Fullstack developer — Nepal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-6xl md:text-8xl leading-[0.95] mb-8 text-left"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BUILDING THINGS
            <br />
            THAT{" "}
            <span
              className="bg-clip-text text-transparent animate-gradient-shift"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
              }}
            >
              HOLD TOGETHER
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-lg md:text-xl max-w-xl text-[var(--text-secondary)] leading-relaxed mb-10"
          >
            I work across TypeScript, Next.js, Express.js, PrismaORM, MySQL and
            PostgreSQL — building APIs and interfaces that stay solid under real
            traffic. I&apos;ve shipped a full production site for a paying
            client, and I currently build features at SkillPrompt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium shadow-lg overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent), var(--accent-2) 55%, var(--accent-3))",
                boxShadow: "0 8px 30px -10px var(--accent-soft-strong)",
              }}
            >
              <span className="shimmer-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Get in touch <FiArrowUpRight />
              </span>
            </Magnetic>
            <Magnetic
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] backdrop-blur-md text-[var(--text)] hover:border-[var(--accent-2)] transition-colors"
            >
              View projects
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <TechMarquee items={heroTech} />
          </motion.div>
        </div>

        <motion.a
          href="#skills"
          aria-label="Scroll to skills"
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FiChevronDown size={18} />
        </motion.a>
      </section>

      {/* Stats strip */}
      <section className="border-t border-[var(--border)] px-6 py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeInUp} className="text-left">
              <p
                className="text-3xl md:text-4xl mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: `var(--${s.tint})`,
                }}
              >
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-[var(--text-muted)] tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="py-28 border-t border-[var(--border)] px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-[var(--accent-2)] mb-3"
          >
            What I work with
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-14"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Skills
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {skillCategories.map((skill) => (
              <motion.div key={skill.title} variants={riseIn}>
                <GradientBorder tint={skill.tint} className="h-full">
                  <SpotlightCard
                    tint={skill.tint}
                    whileHover={{ y: -4 }}
                    className={`${cardBase} p-8 h-full`}
                  >
                    <span
                      className="inline-block w-8 h-1 rounded-full mb-4"
                      style={{ backgroundImage: tintGradient[skill.tint] }}
                    />
                    <h3
                      className="text-2xl mb-2 text-[var(--text)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {skill.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {skill.items.map((item) => (
                        <TechChip
                          key={item.name}
                          name={item.name}
                          icon={item.icon}
                          color={item.color}
                          fill={item.fill}
                          className="px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                        />
                      ))}
                    </div>
                  </SpotlightCard>
                </GradientBorder>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="py-28 border-t border-[var(--border)] px-6"
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-[var(--accent)] mb-3"
          >
            Where I&apos;ve worked
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-14"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experience
          </motion.h2>

          <div className="relative pl-8 md:pl-12 space-y-10 ml-4 md:ml-0">
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px] origin-top rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, var(--accent), var(--accent-2), var(--accent-3))",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />

            {experience.map((job) => (
              <div key={job.role + job.org} className="relative">
                <div className="absolute top-6 -left-[2.95rem] md:-left-[3.95rem] z-10">
                  {job.current && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-50"
                      style={{ backgroundImage: tintGradient[job.tint] }}
                    />
                  )}
                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundImage: tintGradient[job.tint],
                      boxShadow: `0 0 24px -6px var(--${job.tint}-soft-strong, var(--accent-soft-strong))`,
                    }}
                  >
                    <job.icon size={17} />
                  </div>
                </div>

                <motion.div
                  variants={riseIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <GradientBorder tint={job.tint}>
                    <SpotlightCard
                      tint={job.tint}
                      className={`${cardBase} p-8 md:p-10`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                          <h3
                            className="text-2xl text-[var(--text)] mb-2"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {job.role} — {job.org}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide"
                              style={{
                                backgroundColor: `var(--${job.tint}-soft)`,
                                color: `var(--${job.tint})`,
                              }}
                            >
                              {job.type}
                            </span>
                            {job.current && (
                              <span
                                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full text-white"
                                style={{
                                  backgroundImage: tintGradient[job.tint],
                                }}
                              >
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                                </span>
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[var(--text-muted)] text-sm tracking-wider shrink-0">
                          {job.period}
                        </span>
                      </div>
                      <p
                        className="text-sm italic mb-5 tracking-wide"
                        style={{ color: `var(--${job.tint})` }}
                      >
                        {job.projectHref ? (
                          <>
                            {job.project}:{" "}
                            <a
                              href={job.projectHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-[var(--text)]"
                            >
                              {job.projectLinkText}
                            </a>
                          </>
                        ) : (
                          `${job.project}: ${job.projectLinkText}`
                        )}
                      </p>
                      <ul className="text-[var(--text-secondary)] space-y-3 list-disc list-inside text-sm leading-relaxed">
                        {job.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </GradientBorder>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-28 border-t border-[var(--border)] px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-[var(--accent-3)] mb-3"
          >
            Selected work
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-14"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((proj, i) => {
              const tints: AccentTint[] = ["accent", "accent-2", "accent-3"];
              const tint = tints[i % tints.length];
              return (
                <motion.div key={proj.title} variants={riseIn}>
                  <GradientBorder tint={tint} className="h-full">
                    <SpotlightCard
                      tint={tint}
                      whileHover={{ y: -4 }}
                      className={`${cardBase} overflow-hidden h-full flex flex-col`}
                    >
                      <div
                        className="h-28 w-full flex items-center px-8"
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--${tint}-soft), transparent 70%), repeating-linear-gradient(135deg, var(--border) 0 1px, transparent 1px 14px)`,
                        }}
                      >
                        <span
                          className="text-5xl opacity-30 bg-clip-text text-transparent"
                          style={{
                            fontFamily: "var(--font-display)",
                            backgroundImage: tintGradient[tint],
                          }}
                        >
                          0{i + 1}
                        </span>
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <h3
                          className="text-2xl mb-3"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {proj.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-5 leading-relaxed text-sm">
                          {proj.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {proj.stack.map((tech) => {
                            const meta = techIconMap[tech];
                            return meta ? (
                              <TechChip
                                key={tech}
                                name={tech}
                                icon={meta.icon}
                                color={meta.color}
                                fill={meta.fill}
                                className="px-2.5 py-1 text-[11px] text-[var(--text-muted)] tracking-wide"
                              />
                            ) : (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[11px] text-[var(--text-muted)] tracking-wide"
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex gap-5 mt-auto">
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--text)] text-sm flex items-center gap-1.5 transition-colors"
                              style={{ color: `var(--${tint})` }}
                            >
                              Live site <FaExternalLinkAlt size={11} />
                            </a>
                          )}
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--text)] text-sm flex items-center gap-1.5 transition-colors"
                              style={{ color: `var(--${tint})` }}
                            >
                              GitHub <FaGithub size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </GradientBorder>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-28 border-t border-[var(--border)] px-6"
      >
        <div className="max-w-3xl mx-auto text-left">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-[var(--accent)] mb-3"
          >
            Get in touch
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-[var(--text-secondary)] mb-8"
          >
            Open to remote fullstack and backend roles. Reach out.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Magnetic
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-2 mb-10 px-7 py-3 rounded-full text-white font-medium overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent), var(--accent-2) 55%, var(--accent-3))",
                boxShadow: "0 8px 30px -10px var(--accent-soft-strong)",
              }}
            >
              <span className="shimmer-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <FaFileDownload /> Download resume
              </span>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              href="mailto:tejendradharikar@gmail.com"
              aria-label="Email"
              className="p-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] backdrop-blur-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <FaEnvelope size={20} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              href="https://github.com/TejendraDharikar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] backdrop-blur-md hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] transition-colors"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/in/tejendra-dharikar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] backdrop-blur-md hover:border-[var(--accent-3)] hover:text-[var(--accent-3)] transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 border-t border-[var(--border)] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Tejendra Dharikar</p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion</p>
          <a
            href="#me"
            aria-label="Back to top"
            className="p-2.5 rounded-full border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <FiArrowUp size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}
