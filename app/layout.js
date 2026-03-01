import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const outfit = OutfitFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = OvoFont({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: {
    default: "Reuben Korsi Amuzu | Software Developer",
    template: "%s | Reuben Korsi Amuzu",
  },
  description:
    "Reuben Korsi Amuzu is a backend-focused developer and fintech enthusiast building scalable, secure web and mobile applications using Next.js, React, and Node.js.",
  keywords: [
    "Reuben Korsi Amuzu",
    "Backend Developer Ghana",
    "Fintech Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer Ghana",
  ],
  authors: [{ name: "Reuben Korsi Amuzu" }],
  creator: "Reuben Korsi Amuzu",
  metadataBase: new URL("https://reubenkorsiamuzu.tech"),

  openGraph: {
    title: "Reuben Korsi Amuzu | Software Developer",
    description:
      "Software Developer building scalable, secure web and mobile applications.",
    url: "https://reubenkorsiamuzu.tech",
    siteName: "Reuben Korsi Amuzu Portfolio",
    images: [
      {
        url: "/public/preview.png", // Add a 1200x630 image in your public folder
        width: 1200,
        height: 630,
        alt: "Reuben Korsi Amuzu Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Reuben Korsi Amuzu | Software Developer",
    description:
      "Software Developer building scalable, secure web and mobile applications.",
    images: ["/public/preview.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  );
}
