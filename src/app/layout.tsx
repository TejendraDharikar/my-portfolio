import Navbar from "@/components/navbar";
import "../styles/globals.css";
import Footer from "@/components/footer";

export const metadata = {
  title: "Tejendra | Portfolio",
  description: "Professional portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}