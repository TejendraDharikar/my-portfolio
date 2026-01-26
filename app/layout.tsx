import "./globals.css";

export const metadata = {
  title: "Tejendra | Portfolio",
  description: "Professional portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth">       
        {children}
      </body>
    </html>
  );
}