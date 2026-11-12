/**
 * ALL PROJECTS LIVE HERE.
 *
 * To add a project: copy one block, change the values, save.
 * To remove a project: delete its block.
 * The order in this file is the order on the site.
 *
 * Anything marked "TODO" is a placeholder for you to fill in.
 * See the README for a field-by-field guide.
 */

export const CATEGORIES = ["AI", "Fintech", "Full-Stack", "Tools"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Status = "In development" | "Prototype" | "Live" | "Completed";

export type Project = {
  /** Short unique id, lowercase with dashes. Used in page anchors. */
  id: string;
  title: string;
  /** One line, shown on every card. */
  summary: string;
  /** Two or three sentences, shown only on featured cards. */
  description?: string;
  /** Shown as the mono line on the card, e.g. "NEXT.JS · CLAUDE API". */
  tags: string[];
  category: Category;
  status: Status;
  /** Featured projects get a large card at the top of the page. */
  featured?: boolean;
  /** Full URL, or null to show "repo pending". */
  github: string | null;
  /** Full URL, or null to show "demo pending". */
  live: string | null;
  /** Path inside /public. Use a 16:9 image, 1600x900 works well. */
  image: string;
  /** Describes the image for screen readers. */
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "dental-xray-ai",
    title: "Dental X-ray AI",
    summary:
      "AI that analyses dental radiographs to support clinics in Ghana.",
    description:
      "A computer-vision model that reads dental radiographs and highlights findings for the dentist to review. Built in Python and trained in the cloud, with Ghanaian clinics as the first users.",
    tags: ["Python", "Computer Vision", "Cloud Training"], // TODO: confirm the exact stack
    category: "AI",
    status: "In development",
    featured: true,
    github: null, // TODO: add the GitHub URL
    live: null, // TODO: add the live/demo URL
    image: "/projects/dental-xray-ai.svg", // TODO: replace with a real screenshot
    imageAlt: "Placeholder cover for the Dental X-ray AI project",
  },
  {
    id: "llm-guardrails-proxy",
    title: "LLM Guardrails Proxy",
    summary:
      "A gateway between apps and LLM providers that redacts PII, blocks prompt injection and caches responses.",
    description:
      "Sits between an application and its LLM provider. Every request passes through PII redaction and prompt-injection checks before it leaves, and repeated prompts are served from cache to cut cost and latency.",
    tags: ["LLM Gateway", "PII Redaction", "Prompt-Injection Defence", "Caching"], // TODO: add the stack
    category: "Tools",
    status: "In development", // TODO: confirm status
    featured: true,
    github: null, // TODO: add the GitHub URL
    live: null, // TODO: add the live/demo URL
    image: "/projects/llm-guardrails-proxy.svg", // TODO: replace with a real screenshot
    imageAlt: "Placeholder cover for the LLM Guardrails Proxy project",
  },
  {
    id: "student-ai-agent",
    title: "Student AI Agent",
    summary: "A personal AI study tutor that students reach through a Telegram bot.",
    tags: ["AI Tutor", "Telegram Bot"], // TODO: add the stack
    category: "AI",
    status: "In development", // TODO: confirm status
    github: null, // TODO: add the GitHub URL
    live: null, // TODO: add the bot link
    image: "/projects/student-ai-agent.svg", // TODO: replace with a real screenshot
    imageAlt: "Placeholder cover for the Student AI Agent project",
  },
  {
    id: "campus-print-platform",
    title: "Campus Print Platform",
    summary:
      "Upload a document, pick a nearby print centre on a map, pay online and collect with a pickup code.",
    tags: ["Maps", "Online Payments", "Pickup Codes"], // TODO: add the stack
    category: "Fintech",
    status: "In development", // TODO: confirm status
    github: null, // TODO: add the GitHub URL
    live: null, // TODO: add the live URL
    image: "/projects/campus-print-platform.svg", // TODO: replace with a real screenshot
    imageAlt: "Placeholder cover for the Campus Print Platform project",
  },

  // ---- Carried over from the previous site. Delete any you no longer want. ----
  {
    id: "quizforge",
    title: "QuizForge",
    summary: "AI-powered app that builds custom quizzes from any topic.",
    tags: ["React", "Node.js", "Express", "Gemini API"],
    category: "AI",
    status: "Live",
    github: "https://github.com/reubenamuzu/quiz-forge",
    live: "https://quizfor-ge.netlify.app",
    image: "/projects/quiz-forge.png",
    imageAlt: "QuizForge landing page with the headline Build and take quizzes in a flash",
  },
  {
    id: "image-processing-service",
    title: "Image Processing Service",
    summary: "Upload, resize, crop and convert images through a simple dashboard.",
    tags: ["Next.js", "Node.js", "Express", "MongoDB"],
    category: "Full-Stack",
    status: "Completed",
    github: "https://github.com/reubenamuzu/image-processing-service",
    live: null,
    image: "/projects/image-processing-service.png",
    imageAlt: "Image Processing Service dashboard with upload, my images and transform cards",
  },
  {
    id: "bookworm",
    title: "Bookworm",
    summary: "Mobile app where readers post, rate and recommend books.",
    tags: ["React Native", "Express", "MongoDB", "TanStack Query"],
    category: "Full-Stack",
    status: "Completed",
    github: "https://github.com/reubenamuzu/bookworm-mobile",
    live: null,
    image: "/projects/bookworm.svg", // TODO: replace with a real screenshot
    imageAlt: "Placeholder cover for the Bookworm project",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/** The four accent colours rotate across cards in this order. */
export const ACCENTS = ["cyan", "magenta", "lime", "violet"] as const;
export type Accent = (typeof ACCENTS)[number];
export const accentFor = (index: number): Accent => ACCENTS[index % ACCENTS.length];
