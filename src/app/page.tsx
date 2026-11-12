import About from "@/components/About";
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
