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
import work_5 from "../public/quiz-forge.png";
import work_6 from "../assets/public/imageps.png";
import noimage from "../assets/public/no-image.png";

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
      title: "Image Processing Service",
      category: "Web Development",
      bgImage: work_6,
      featured: true,
      shortDescription: "Cloud-based image processing web app for resizing, cropping, and format conversion.",
      longDescription:
        "A full-stack image processing service similar to Cloudinary. It supports image resizing, cropping, format conversion, and optimization with a user-friendly interface.",
      stack: ["Next.js", "Nodejs", "Express", "MongoDB"],
      githubUrl: "https://github.com/reubenamuzu/image-processing-service",
      liveUrl: "null",
      details: {
        challenge:
          "Ensuring efficient processing and storage of images while maintaining a responsive user experience.",
        outcome:
          "Successfully implemented core image processing features with a scalable architecture, allowing for efficient handling of user requests and optimized image delivery.",
      },
  },
  {
    id: 3,
    title: "Bookworm",
    category: "Mobile Development",
    bgImage: noimage,
    featured: true,
    shortDescription: "A Book recommendation mobile app for users to post and recommend books.",
    longDescription:
      "A mobile application that allows users to post and recommend books to others, with features like user profiles, book ratings, and social sharing.",
    stack: ["React Native", "Express", "MongoDB", "Node.js", "Tanstack query"],
    githubUrl: "https://github.com/reubenamuzu/bookworm-mobile",
    liveUrl: "null",
    details: {
      challenge:
        "Designing an intuitive UI for book recommendations while ensuring smooth performance on mobile devices.",
      outcome:
        "Successfully launched a functional mobile app with a clean UI and responsive design that supports core user features.",
    },
  }
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
