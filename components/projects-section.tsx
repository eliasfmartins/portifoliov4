"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState(0)
  const { t } = useLanguage()

  const projects = t("projects.list").map((project: any, index: number) => ({
    id: index + 1,
    title: project.title,
    description: project.description,
    image: "/placeholder.svg?height=400&width=600",
    category: project.category,
    technologies: project.technologies,
    liveUrl: index === 2 ? "https://example.com" : index === 3 ? "https://elias.dev.br" : null,
    githubUrl: "https://github.com/eliasfmartins",
    featured: index < 3,
  }))

  const filters = [
    { key: "all", label: t("projects.filters.all") },
    { key: "frontend", label: t("projects.filters.frontend") },
    { key: "backend", label: t("projects.filters.backend") },
    { key: "fullstack", label: t("projects.filters.fullstack") },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const scrollCarousel = (direction: "left" | "right") => {
    if (direction === "left" && selectedProject > 0) {
      setSelectedProject(selectedProject - 1)
    } else if (direction === "right" && selectedProject < filteredProjects.length - 1) {
      setSelectedProject(selectedProject + 1)
    }
  }

  const handleProjectSelect = (index: number) => {
    setSelectedProject(index)
  }

  return (
    <section id="projetos" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 drop-shadow-neon">
              {t("projects.title")}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-300 mx-auto rounded-full mb-6 shadow-neon" />
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t("projects.description")}</p>
        </motion.div>

        {/* Filter Buttons com bordas animadas */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key)
                setSelectedProject(0)
              }}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-400 overflow-hidden group ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-black border-2 border-teal-400 shadow-neon-lg"
                  : "bg-slate-800/50 backdrop-blur-sm border-2 border-teal-400/30 text-teal-400 hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-neon"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Efeito de brilho animado */}
              {activeFilter !== filter.key && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              )}

              <div className="relative z-10 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {filter.label}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Project Details and Carousel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Project Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            key={`details-${filteredProjects[selectedProject]?.id}`}
          >
            <h3 className="text-2xl xl:text-3xl font-bold text-white leading-tight">
              {filteredProjects[selectedProject]?.title}
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">{filteredProjects[selectedProject]?.description}</p>

            <div className="flex flex-wrap gap-2">
              {filteredProjects[selectedProject]?.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-400/20 border border-teal-400/30 rounded-full text-sm text-teal-400 font-medium shadow-neon transition-all duration-300 hover:border-teal-400/50 hover:shadow-neon-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {filteredProjects[selectedProject]?.liveUrl && (
                <Button
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-black hover:from-teal-400 hover:to-cyan-500 font-semibold shadow-neon-lg border-2 border-transparent hover:border-teal-300 transition-all duration-300"
                  onClick={() => window.open(filteredProjects[selectedProject]?.liveUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("projects.viewProject")}
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-cyan-500/20 to-teal-400/20 border-2 border-teal-400/30 text-gray-300 hover:bg-teal-400/30 hover:border-teal-400/60 hover:shadow-neon transition-all duration-300"
                onClick={() => window.open(filteredProjects[selectedProject]?.githubUrl, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                {t("projects.viewCode")}
              </Button>
            </div>
          </motion.div>

          {/* Project Carousel */}
          <div className="relative" ref={ref}>
            {/* Mobile: Simple card display */}
            <div className="block md:hidden">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="relative h-64 w-full rounded-lg overflow-hidden border-2 border-teal-400 shadow-neon-lg transition-all duration-300 hover:border-teal-300 hover:shadow-neon-xl">
                  <img
                    src={filteredProjects[selectedProject]?.image || "/placeholder.svg"}
                    alt={filteredProjects[selectedProject]?.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-center">
                    <p className="text-sm text-white font-medium">{filteredProjects[selectedProject]?.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 3D Carousel */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 rounded-full p-2 text-teal-400 hover:bg-teal-400/20 hover:shadow-neon backdrop-blur-sm border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300"
                disabled={selectedProject === 0}
                style={{ opacity: selectedProject === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* 3D Carousel */}
              <div className="h-[300px] relative flex items-center justify-center perspective-1000 overflow-visible">
                {filteredProjects.map((project, index) => {
                  const distance = index - selectedProject
                  const absDistance = Math.abs(distance)

                  if (absDistance > 2) return null

                  const zIndex = 20 - absDistance
                  const opacity = 1 - absDistance * 0.2
                  const scale = 1.1 - absDistance * 0.15
                  const rotateY = distance * 25
                  const translateZ = -80 * absDistance
                  const translateX = distance * 70

                  return (
                    <motion.div
                      key={project.id}
                      className="absolute flex-shrink-0 w-48 cursor-pointer"
                      style={{
                        zIndex,
                        opacity,
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        transformStyle: "preserve-3d",
                        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        pointerEvents: absDistance > 0 ? "none" : "auto",
                      }}
                      onClick={() => handleProjectSelect(index)}
                    >
                      <div
                        className={`relative h-60 w-40 rounded-md overflow-hidden transform transition-all duration-500 ${
                          selectedProject === index
                            ? "border-2 border-teal-400 shadow-neon-xl"
                            : "border border-teal-400/30 hover:border-teal-400/60"
                        }`}
                      >
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {selectedProject === index && (
                          <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-teal-400 animate-pulse shadow-neon" />
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-center">
                          <p className="text-xs text-white truncate">{project.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-full p-2 text-teal-400 hover:bg-teal-400/20 hover:shadow-neon backdrop-blur-sm border border-teal-400/30 hover:border-teal-400/60 transition-all duration-300"
                disabled={selectedProject === filteredProjects.length - 1}
                style={{ opacity: selectedProject === filteredProjects.length - 1 ? 0.5 : 1 }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails Navigation */}
        <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
          {filteredProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(index)}
              className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                selectedProject === index
                  ? "border-teal-400 shadow-neon-lg"
                  : "border-gray-600 hover:border-teal-400/50"
              }`}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  selectedProject === index ? "bg-teal-400/20" : "bg-black/40 hover:bg-black/20"
                }`}
              />
            </button>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-neon-lg border-2 border-transparent hover:border-teal-300"
          >
            <Github className="w-5 h-5 mr-2" />
            {t("projects.viewAll")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
