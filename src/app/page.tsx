import ProjectCard from "@/components/project-card";
import ContactForm from "@/components/contact-form";

export default function Dashboard() {
  return (
    <div>
      {/* Home Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-5xl font-bold">Tejendra</h1>
        <p className="mt-4 text-xl text-gray-600">Full-Stack Developer | Next.js & Tailwind</p>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="max-w-xl text-center text-gray-700">
          I specialize in building scalable web apps with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-gray-50 p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard title="Portfolio Site" description="Built with Next.js + Tailwind" link="#" />
          <ProjectCard title="Auth Flow" description="Secure OTP & password reset system" link="#" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <ContactForm />
      </section>
    </div>
  );
}