import "./globals.css";

const title = "Tejendra Dharikar | Fullstack Developer (Next.js, Express, Prisma)";
const description =
  "Fullstack developer specializing in TypeScript, Next.js, Express.js, Prisma, and PostgreSQL. Production experience building a freelance client site and shipping features on a live product at SkillPrompt. Open to remote roles.";

export const metadata = {
  title,
  description,
  keywords: [
    "Tejendra Dharikar",
    "Fullstack Developer",
    "Next.js Developer",
    "Express.js",
    "Prisma ORM",
    "TypeScript",
    "Remote Developer",
    "Nepal Developer",
  ],
  openGraph: {
    title,
    description,
    type: "website",
  },
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