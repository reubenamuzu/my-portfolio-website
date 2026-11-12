/**
 * EVERYTHING ABOUT YOU LIVES HERE: name, bio, links, stack, leadership,
 * certifications, contact and availability.
 *
 * Two things read this file:
 *   1. the website (Hero, About, Contact, Footer, SEO)
 *   2. the "Ask Amson" assistant, which builds its knowledge from this file
 *      plus projects.ts
 *
 * So when you edit a value here, the page and the assistant both update.
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

/**
 * What you are open to right now. The assistant uses this to answer questions
 * like "Is he open to internships?".
 *
 * While `summary` is null the assistant says it has no availability details
 * and points people to the contact section, so it never guesses for you.
 */
export const availability: {
  /** One or two sentences, written about you in the third person. */
  summary: string | null;
  /** Short labels, e.g. "Internships", "Freelance projects", "Collaborations". */
  openTo: string[];
} = {
  summary: null, // TODO: e.g. "Reuben is open to software engineering internships from June 2027."
  openTo: [], // TODO: e.g. ["Internships", "Freelance projects"]
};

/** How people should reach you. Used by the assistant and its /contact command. */
export const contact = {
  email: site.email,
  /** The channel you check most. */
  preferred: "Email",
  /** Optional: how quickly you usually reply, or null to leave it out. */
  responseTime: null as string | null, // TODO: e.g. "Usually replies within two days"
} as const;

/**
 * Extra facts the assistant may share that do not appear elsewhere on the site.
 * One short sentence each, in the third person. Leave empty if there are none.
 */
export const extraFacts: string[] = [
  "Reuben is the founder of AmsonTech, where he publishes tech content on YouTube, TikTok and Instagram.",
];
