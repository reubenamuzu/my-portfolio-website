import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Filter } from "lucide-react";
import Image from "next/image";
import { workData } from "@/assets/assets";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Research",
  "Graphic Design",
  "Others",
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return workData;
    return workData.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="work"
      className="w-full px-[8%] md:px-[12%] py-14 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My portfolio
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-center text-4xl sm:text-5xl font-Ovo"
      >
        Selected Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-10 font-Ovo text-gray-700 dark:text-white/80"
      >
        Filter projects by category and explore each one with source code, live
        demo, and a detailed breakdown.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mb-10 rounded-2xl border border-gray-300/70 dark:border-white/15 p-4 md:p-5 bg-white/70 dark:bg-darkHover/20 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600 dark:text-white/70">
          <Filter className="w-4 h-4" />
          Filter by category - " {workData.length} " projects
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "border-gray-300 text-gray-700 hover:bg-lightHover dark:border-white/25 dark:text-white/80 dark:hover:bg-darkHover/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group overflow-hidden rounded-2xl border border-gray-300/70 dark:border-white/15 bg-white dark:bg-darkHover/10 shadow-sm hover:-translate-y-1 hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300"
          >
            <div className="h-52 sm:h-56 w-full relative overflow-hidden">
              <Image
                src={project.bgImage}
                alt={project.title}
                width={640}
                height={360}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-white/20 border border-white/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center rounded-full bg-black/35 border border-white/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/75 min-h-12">
                {project.shortDescription}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs rounded-full border border-gray-300 dark:border-white/20 px-2.5 py-1 text-gray-700 dark:text-white/80 bg-gray-50 dark:bg-black/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 rounded-lg border border-gray-400 dark:border-white/30 px-3 py-2 text-sm font-medium hover:bg-lightHover dark:hover:bg-darkHover/50 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  GitHub
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 rounded-lg border border-gray-400 dark:border-white/30 px-3 py-2 text-sm font-medium hover:bg-lightHover dark:hover:bg-darkHover/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live View
                </a>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="inline-flex justify-center items-center rounded-lg border border-black bg-black text-white dark:border-white dark:bg-white dark:text-black px-3 py-2 text-sm font-medium transition-colors hover:opacity-90">
                      Details
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="font-Ovo text-2xl">
                        {project.title}
                      </SheetTitle>
                      <SheetDescription className="text-sm">
                        {project.category}
                      </SheetDescription>
                    </SheetHeader>

                    <div className="mt-5 h-44 sm:h-52 w-full rounded-xl overflow-hidden">
                      <Image
                        src={project.bgImage}
                        alt={project.title}
                        width={640}
                        height={360}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 100vw, 480px"
                      />
                    </div>

                    <div className="mt-5 space-y-4">
                      <p className="text-sm leading-6 text-gray-700 dark:text-white/80">
                        {project.longDescription}
                      </p>

                      <div>
                        <h4 className="font-semibold text-base mb-2">Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={`${project.id}-${tech}`}
                              className="text-xs rounded-full border border-gray-300 dark:border-white/25 px-2.5 py-1 text-gray-700 dark:text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 text-sm leading-6 text-gray-700 dark:text-white/80">
                        <p>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Challenge:
                          </span>{" "}
                          {project.details.challenge}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Outcome:
                          </span>{" "}
                          {project.details.outcome}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex justify-center items-center gap-2 rounded-lg border border-gray-400 dark:border-white/30 px-3 py-2 text-sm font-medium hover:bg-lightHover dark:hover:bg-darkHover/50 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex justify-center items-center gap-2 rounded-lg border border-gray-400 dark:border-white/30 px-3 py-2 text-sm font-medium hover:bg-lightHover dark:hover:bg-darkHover/50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live View
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="border border-gray-300 dark:border-white/20"
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                      className={
                        page === currentPage
                          ? "border border-black dark:border-white"
                          : "border border-transparent"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border border-gray-300 dark:border-white/20"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <p className="text-center mt-10 text-gray-600 dark:text-white/70">
          No projects found for this category.
        </p>
      )}
    </motion.section>
  );
};

export default Work;
