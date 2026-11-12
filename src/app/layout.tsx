import type { Metadata, Viewport } from "next";
import { Exo_2, JetBrains_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AskLauncher from "@/components/ask/AskLauncher";
import { bootScript } from "@/components/BootIntro";
import { site, socials } from "@/data/profile";
import "./globals.css";

// next/font downloads these at build time and serves them from this site.
const display = Orbitron({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Exo_2({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = `${site.name} (${site.alias}) | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    "Amson",
    "AmsonTech",
    "Full-Stack Developer Ghana",
    "Applied AI Engineer",
    "Fintech Developer",
    "Next.js Developer",
    "KNUST",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0e11",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kumasi",
    addressCountry: "GH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  knowsAbout: [
    "Full-stack web development",
    "Applied AI",
    "Fintech",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Retrieval-augmented generation",
  ],
  sameAs: socials.map((social) => social.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <AskLauncher />
        <Analytics />
      </body>
    </html>
  );
}
