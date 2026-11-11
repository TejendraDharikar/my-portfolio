import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://tejendradharikar.com.np";
const title = "Tejendra Dharikar | Fullstack Developer (Next.js, Express, Prisma)";
const description =
  "Tejendra Dharikar is a fullstack developer specializing in TypeScript, Next.js, Express.js, Prisma, and PostgreSQL. Production experience building a freelance client site and shipping features on a live product at SkillPrompt. Open to remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Tejendra Dharikar",
  },
  description,
  applicationName: "Tejendra Dharikar — Portfolio",
  authors: [{ name: "Tejendra Dharikar", url: siteUrl }],
  creator: "Tejendra Dharikar",
  keywords: [
    "Tejendra Dharikar",
    "Tejendra",
    "Dharikar",
    "Fullstack Developer",
    "Next.js Developer",
    "Express.js",
    "Prisma ORM",
    "TypeScript",
    "Remote Developer",
    "Nepal Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Tejendra Dharikar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tejendra Dharikar",
  alternateName: "Tejendra",
  url: siteUrl,
  jobTitle: "Fullstack Developer",
  description,
  sameAs: [
    "https://github.com/TejendraDharikar",
    "https://www.linkedin.com/in/tejendra-dharikar/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "SkillPrompt",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Pokhara University",
  },
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "React",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
