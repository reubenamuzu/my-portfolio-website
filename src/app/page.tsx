import About from "@/components/About";
import AskSection from "@/components/ask/AskSection";
import BootIntro from "@/components/BootIntro";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <>
      <BootIntro />
      <Header />
      <main id="main">
        <Hero />
        <FeaturedProjects />
        <ProjectGrid />
        <About />
        <AskSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
