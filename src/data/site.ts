/**
 * Site-wide details: name, links, stack, leadership.
 * Anything marked "TODO" is a placeholder for you to fill in.
 */

export const site = {
  name: "Reuben Korsi Amuzu",
  alias: "Amson",
  role: "Full-Stack Developer & Applied AI Engineer",
  intro:
    "I build fintech, SaaS and AI products for West African markets. BSc Information Technology student at KNUST and Mastercard Foundation Scholar.",
  location: "Kumasi, Ghana",
  url: "https://reubenkorsiamuzu.tech",
  email: "reubenamuzu23@gmail.com", // carried over from the old site; change if needed
  nowBuilding: "Dental X-ray AI",
  description:
    "Reuben Korsi Amuzu (Amson) is a full-stack developer and applied AI engineer in Kumasi, Ghana, building fintech, SaaS and AI products for West African markets.",
} as const;

export type SocialId = "github" | "linkedin" | "youtube" | "tiktok" | "instagram";

export const socials: { id: SocialId; label: string; handle: string; href: string }[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "reubenamuzu",
    href: "https://github.com/reubenamuzu",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "reuben-korsi-amuzu",
    href: "https://www.linkedin.com/in/reuben-korsi-amuzu-b4bb82385",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "AmsonTech",
    href: "https://www.youtube.com/", // TODO: add the AmsonTech YouTube URL
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "AmsonTech",
    href: "https://www.tiktok.com/", // TODO: add the AmsonTech TikTok URL
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "mrr_reuben",
    href: "https://www.instagram.com/mrr_reuben", // TODO: swap for the AmsonTech account if different
  },
];

export const bio: string[] = [
  "I'm Reuben, known as Amson. I'm a full-stack developer and applied AI engineer studying BSc Information Technology at KNUST in Kumasi, Ghana, as a Mastercard Foundation Scholar.",
  "I build fintech, SaaS and AI products shaped for West African markets: local payments, patchy connectivity and the way people here already work.",
  "I also run AmsonTech, where I share what I learn about building software on YouTube, TikTok and Instagram.",
];

export type StackIcon =
  | "nextjs"
  | "typescript"
  | "nodejs"
  | "nestjs"
  | "postgresql"
  | "prisma"
  | "clerk"
  | "paystack"
  | "claude"
  | "rag"
  | "pgvector"
  | "python";

export const stack: { name: string; note: string; icon: StackIcon }[] = [
  { name: "Next.js", note: "Frontend", icon: "nextjs" },
  { name: "TypeScript", note: "Language", icon: "typescript" },
  { name: "Node.js / Express", note: "Backend", icon: "nodejs" },
  { name: "NestJS", note: "Backend", icon: "nestjs" },
  { name: "PostgreSQL (Neon)", note: "Database", icon: "postgresql" },
  { name: "Prisma", note: "ORM", icon: "prisma" },
  { name: "Clerk", note: "Auth", icon: "clerk" },
  { name: "Paystack", note: "Payments", icon: "paystack" },
  { name: "Claude API", note: "AI", icon: "claude" },
  { name: "RAG", note: "AI", icon: "rag" },
  { name: "pgvector", note: "Vector search", icon: "pgvector" },
  { name: "Python", note: "Language / ML", icon: "python" },
];

export const leadership: { role: string; org: string }[] = [
  { role: "Peer Mentor", org: "Mastercard Foundation Scholars Program" },
  { role: "Events Manager", org: "KNUST Claude Builder Club" },
  { role: "Notion Campus Leader", org: "2026–27" },
  { role: "Audit Committee Member", org: "Computer Science Society" },
];

export const certifications: { name: string; issuer: string }[] = [
  { name: "Full-Stack JavaScript Developer", issuer: "IBM" },
];

export const education = {
  degree: "BSc Information Technology",
  school: "KNUST, Kumasi",
  note: "Mastercard Foundation Scholar",
} as const;
