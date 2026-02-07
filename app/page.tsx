"use client";

import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80 }, 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

export default function Home() {
  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.3 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/70 shadow-lg z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-extrabold text-blue-600 tracking-wide"
          >
            Tejendra Dharikar
          </motion.h1>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex space-x-10 text-lg font-medium"
          >
            {["Me", "Skills", "Experience", "Projects", "Contact"].map(
              (item, i) => (
                <motion.li key={i} variants={fadeInUp}>
                  <a href={`#${item.toLowerCase()}`} className="relative group">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </a>
                </motion.li>
              ),
            )}
          </motion.ul>
        </div>
      </motion.nav>

   {/* Intro Section */}
<section
  id="me"
  className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-blue-50 to-blue-100"
>
  <motion.h2
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    className="text-7xl font-extrabold mb-6 text-blue-700"
  >
    Hi, I'm Tejendra
  </motion.h2>
  <motion.p
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.5 }}
    className="text-2xl max-w-4xl leading-relaxed text-gray-700"
  >
    A passionate developer who loves blending design and technology to create
    engaging digital experiences. I enjoy working on frontend integration and
designing clean, user-friendly interfaces, but my true strength lies in
backend development — building scalable systems, designing APIs, and managing
databases. Currently interning at{" "}
    <span className="font-semibold text-blue-600">SkillPrompt</span>, where I’m
    learning, growing, and contributing to meaningful work.
  </motion.p>
  <motion.a
    whileHover={{ scale: 1.1, rotate: 2 }}
    href="#contact"
    className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-lg"
  >
    Get in Touch
  </motion.a>
</section>

      {/* Skills Section */}
      <section id="skills" className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-5xl font-bold mb-12 text-blue-600"
          >
            Skills
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-10 text-lg"
          >
            {[
              {
                title: "Frontend",
                items: ["React.js", "Next.js", "TypeScript", "TailwindCSS","React Query","Zustand","React Hook Form"],
              },
              {
                title: "Backend",
                items: [
                  "Node.js & Express.js",
                  "Prisma ORM",
                  "Zod Validation",
                  "REST APIs",
                  "Ts-rest"
                ],
              },
              {
                title: "Databases & Tools",
                items: ["MongoDB", "MySQL","Git & GitHub"],
              },
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-2xl transition hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, j) => (
                    <li key={j}> - {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-40 bg-gradient-to-r from-gray-100 to-gray-200"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-5xl font-bold mb-12 text-blue-600"
          >
            Experience
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-10 rounded-xl shadow hover:shadow-2xl transition hover:-translate-y-2"
          >
            <h3 className="text-2xl font-semibold mb-2">
              Internship at SkillPrompt
            </h3>
            <p className="text-gray-600 text-lg">
              Working as a Full‑Stack Developer Intern, contributing to
              real‑world projects, debugging backend/frontend mismatches, and
              refining contract schemas for type safety and runtime validation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-5xl font-bold mb-16 text-blue-600 text-center"
          >
            Projects
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {[
              {
                title: "UniHub",
                desc: "A platform for university students to collaborate and share resources.",
              },
              {
                title: "Todo App",
                desc: "Task management app with CRUD functionality and persistent storage.",
              },
              {
                title: "Campus Mate",
                desc: "Campus networking app for students and faculty.",
              },
              {
                title: "Chautari",
                desc: "Community discussion platform with authentication and real‑time updates.",
              },
            ].map((proj, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white shadow-lg rounded-xl p-10 hover:shadow-2xl hover:-translate-y-2 transform transition"
              >
                <h3 className="text-2xl font-semibold mb-4">{proj.title}</h3>
                <p className="text-gray-600 text-lg">{proj.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-5xl font-bold mb-12 text-blue-600"
          >
            Contact
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="mb-12 text-xl text-gray-700"
          >
            Let’s collaborate! Reach out for projects or
            opportunities.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="flex justify-center space-x-8"
          >
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="mailto:tejendradharikar@gmail.com"
              className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              <FaEnvelope size={28} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="https://github.com/TejendraDharikar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-black transition"
            >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.linkedin.com/in/tejendra-dharikar/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition"
            >
              <FaLinkedin size={28} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-center text-gray-200 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center space-x-8 mb-6"
        >
          <a
            href="mailto:tejendradharikar@gmail.com"
            className="hover:text-white transition"
          >
            <FaEnvelope size={24} />
            {}
          </a>
          <a
            href="https://github.com/TejendraDharikar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub size={24} />
            {}
          </a>
          <a
            href="https://www.linkedin.com/in/tejendra-dharikar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin size={24} />
            {}
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg"
        >
          © {new Date().getFullYear()} Tejendra. Crafted with ❤️ using Next.js &
          TailwindCSS.
        </motion.p>
      </footer>
    </div>
  );
}
