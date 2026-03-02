import user_image from "./user-image.png";
import code_icon from "./code-icon.png";
import code_icon_dark from "./code-icon-dark.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import right_arrow_white from "./right-arrow-white.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import profile_img from "./profile-img.png";
import download_icon from "./download-icon.png";
import hand_icon from "./hand-icon.png";
import header_bg_color from "./header-bg-color.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import web_icon from "./web-icon.png";
import mobile_icon from "./mobile-icon.png";
import ui_icon from "./ui-icon.png";
import graphics_icon from "./graphics-icon.png";
import right_arrow from "./right-arrow.png";
import send_icon from "./send-icon.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";
import postman from "./postman (1).png";
import work_1 from "../public/work-1.png";
import work_2 from "../public/work-2.png";
import work_3 from "../public/work-3.png";
import work_4 from "../public/work-4.png";
import work_5 from "../public/quiz-forge.png";

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  firebase,
  figma,
  git,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  mobile_icon,
  ui_icon,
  graphics_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
  postman,
};

export const workData = [
  {
    id: 1,
    title: "QuizForge",
    category: "Web Development",
    bgImage: work_5,
    featured: true,
    shortDescription: "AI-powered quiz generation app.",
    longDescription:
      "A web app that uses AI to create custom quizzes based on user input topics, with real-time feedback and analytics for learners.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express", "Gemini AI API"],
    githubUrl: "https://github.com/reubenamuzu/quiz-forge",
    liveUrl: "https://quizfor-ge.netlify.app",
    details: {
      challenge:
        "Integrating AI-generated content while ensuring quiz quality and relevance.",
      outcome:
        "Successfully launched an MVP that provided engaging quizzes with positive user feedback on content quality and learning value.",
    },
  },
  {
    id: 2,
    title: "GeoField Tracker",
    category: "Mobile Development",
    bgImage: work_2,
    featured: true,
    shortDescription: "Location-aware mobile app for field data collection.",
    longDescription:
      "A cross-platform app used by field agents to capture site visits, upload photos, and log GPS-tagged updates even with unstable connectivity.",
    stack: ["React Native", "Expo", "Firebase", "Google Maps API"],
    githubUrl: "https://github.com/your-username/geofield-tracker",
    liveUrl: "https://expo.dev/preview/geofield-tracker",
    details: {
      challenge:
        "Syncing offline records while preserving data consistency across devices.",
      outcome:
        "Enabled reliable offline-first workflows and faster daily report submission.",
    },
  },
  {
    id: 3,
    title: "UX Benchmark Study",
    category: "Research",
    bgImage: work_3,
    featured: true,
    shortDescription: "Comparative usability research across fintech onboarding flows.",
    longDescription:
      "A structured research project analyzing onboarding friction in fintech products using moderated interviews, heuristic audits, and funnel analysis.",
    stack: ["Maze", "Figma", "Hotjar", "Notion"],
    githubUrl: "https://github.com/your-username/ux-benchmark-study",
    liveUrl: "https://www.figma.com/proto/your-ux-benchmark-study",
    details: {
      challenge:
        "Turning qualitative interview notes into clear, prioritized product recommendations.",
      outcome:
        "Produced actionable UX findings that improved completion rates in tested onboarding flows.",
    },
  },
  {
    id: 4,
    title: "Brand Identity Kit",
    category: "Graphic Design",
    bgImage: work_4,
    featured: true,
    shortDescription: "Complete visual identity for a startup launch campaign.",
    longDescription:
      "Designed brand guidelines, social templates, and marketing visuals with consistency rules for digital and print output.",
    stack: ["Figma", "Illustrator", "Photoshop"],
    githubUrl: "https://github.com/your-username/brand-identity-kit",
    liveUrl: "https://www.behance.net/your-username/brand-identity-kit",
    details: {
      challenge:
        "Creating a flexible design system that remained cohesive across multiple campaign formats.",
      outcome:
        "Delivered reusable templates that accelerated campaign production and improved brand consistency.",
    },
  },
  {
    id: 5,
    title: "StoreFront Pro",
    category: "Web Development",
    bgImage: work_1,
    featured: false,
    shortDescription: "Modern e-commerce storefront with role-based admin tools.",
    longDescription:
      "Built a full-stack e-commerce platform with product management, checkout flow, payment integration, and inventory monitoring for business admins.",
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/your-username/storefront-pro",
    liveUrl: "https://storefront-pro-demo.vercel.app",
    details: {
      challenge:
        "Maintaining checkout reliability while handling asynchronous payment webhooks.",
      outcome:
        "Improved conversion and reduced failed checkout events with robust order state handling.",
    },
  },
  {
    id: 6,
    title: "FitPulse Mobile",
    category: "Mobile Development",
    bgImage: work_2,
    featured: false,
    shortDescription: "Mobile fitness tracker with routines and progress insights.",
    longDescription:
      "A fitness mobile app that supports workout plans, progress charts, and daily reminders with a smooth and lightweight interface.",
    stack: ["React Native", "TypeScript", "SQLite", "Redux Toolkit"],
    githubUrl: "https://github.com/your-username/fitpulse-mobile",
    liveUrl: "https://expo.dev/preview/fitpulse-mobile",
    details: {
      challenge:
        "Visualizing long-term training data in a clear mobile-friendly format.",
      outcome:
        "Increased weekly engagement by providing actionable progress summaries.",
    },
  },
  {
    id: 7,
    title: "Automation Toolkit",
    category: "Others",
    bgImage: work_3,
    featured: false,
    shortDescription: "CLI utilities for code scaffolding and workflow automation.",
    longDescription:
      "A set of developer tools that generate starter modules, automate lint/test pipelines, and simplify repetitive project setup tasks.",
    stack: ["Node.js", "Commander.js", "GitHub Actions"],
    githubUrl: "https://github.com/your-username/automation-toolkit",
    liveUrl: "https://www.npmjs.com/package/automation-toolkit-demo",
    details: {
      challenge:
        "Designing command workflows that were flexible but still simple for teams to adopt.",
      outcome:
        "Cut onboarding setup time and reduced manual configuration errors across projects.",
    },
  },
  {
    id: 8,
    title: "Market Insight Dashboard",
    category: "Research",
    bgImage: work_4,
    featured: false,
    shortDescription: "Research dashboard for trend discovery and reporting.",
    longDescription:
      "Designed and developed a dashboard that consolidates survey and behavioral datasets to support faster product decision-making.",
    stack: ["React", "Recharts", "Supabase", "SQL"],
    githubUrl: "https://github.com/your-username/market-insight-dashboard",
    liveUrl: "https://market-insight-demo.vercel.app",
    details: {
      challenge:
        "Presenting dense datasets in a way that non-technical stakeholders can interpret quickly.",
      outcome:
        "Improved reporting turnaround with clearer visualization and export-ready summaries.",
    },
  },
  {
    id: 9,
    title: "Market Insight Dashboard",
    category: "Research",
    bgImage: work_4,
    featured: false,
    shortDescription: "Research dashboard for trend discovery and reporting.",
    longDescription:
      "Designed and developed a dashboard that consolidates survey and behavioral datasets to support faster product decision-making.",
    stack: ["React", "Recharts", "Supabase", "SQL"],
    githubUrl: "https://github.com/your-username/market-insight-dashboard",
    liveUrl: "https://market-insight-demo.vercel.app",
    details: {
      challenge:
        "Presenting dense datasets in a way that non-technical stakeholders can interpret quickly.",
      outcome:
        "Improved reporting turnaround with clearer visualization and export-ready summaries.",
    },
  },
  {
    id: 10,
    title: "Market Insight Dashboard",
    category: "Research",
    bgImage: work_4,
    featured: true,
    shortDescription: "Research dashboard for trend discovery and reporting.",
    longDescription:
      "Designed and developed a dashboard that consolidates survey and behavioral datasets to support faster product decision-making.",
    stack: ["React", "Recharts", "Supabase", "SQL"],
    githubUrl: "https://github.com/your-username/market-insight-dashboard",
    liveUrl: "https://market-insight-demo.vercel.app",
    details: {
      challenge:
        "Presenting dense datasets in a way that non-technical stakeholders can interpret quickly.",
      outcome:
        "Improved reporting turnaround with clearer visualization and export-ready summaries.",
    },
  },
];

export const serviceData = [
  {
    icon: assets.web_icon,
    title: "Web Development",
    description: "Responsive web development with modern tools and clean UI.",
    link: "",
  },
  {
    icon: assets.mobile_icon,
    title: "Mobile app",
    description:
      "Cross-platform mobile apps with smooth performance and API support.",
    link: "",
  },
  {
    icon: assets.ui_icon,
    title: "UI/UX design",
    description: "User-focused interface design and interactive prototypes.",
    link: "",
  },
  {
    icon: assets.graphics_icon,
    title: "Graphics design",
    description: "Creative visuals, branding, and digital marketing graphics.",
    link: "",
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Languages",
    description:
      "HTML/CSS/JavaScript | React/Next JS | Node JS/Express | MongoDB | TypeScript/TailwindCSS | React Native |",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "BSc. Information Technology",
  },
  {
    icon: assets.project_icon,
    iconDark: assets.project_icon_dark,
    title: "Projects",
    description: "Built more than 5 projects",
  },
];

export const toolsData = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
  assets.postman,
];
