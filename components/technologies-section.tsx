"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Code, Database, Globe, Server, Terminal, Zap, Cpu, Monitor, Smartphone, Cloud } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const TechnologiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("frontend")
  const [typedCode, setTypedCode] = useState("")
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)

  const codeSnippets = {
    frontend: t("skills.terminal.frontend"),
    backend: t("skills.terminal.backend"),
    tools: t("skills.terminal.tools"),
  }

  const skillCategories = [
    {
      id: "frontend",
      title: t("skills.categories.frontend"),
      icon: Monitor,
      color: "from-teal-400 to-teal-600",
      skills: t("skills.skills.frontend"),
    },
    {
      id: "backend",
      title: t("skills.categories.backend"),
      icon: Server,
      color: "from-cyan-400 to-cyan-600",
      skills: t("skills.skills.backend"),
    },
    {
      id: "tools",
      title: t("skills.categories.tools"),
      icon: Cloud,
      color: "from-teal-500 to-cyan-500",
      skills: t("skills.skills.tools"),
    },
  ]

  const stats = [
    { label: t("skills.stats.linesOfCode"), value: "100K+", icon: Code },
    { label: t("skills.stats.completedProjects"), value: "50+", icon: Globe },
    { label: t("skills.stats.technologies"), value: "20+", icon: Cpu },
    { label: t("skills.stats.yearsExperience"), value: "3+", icon: Zap },
  ]

  // Typing animation effect
  useEffect(() => {
    if (!isInView) return

    const currentCode = codeSnippets[activeCategory as keyof typeof codeSnippets]
    let i = 0
    setTypedCode("")

    const typingInterval = setInterval(() => {
      if (i < currentCode.length) {
        setTypedCode(currentCode.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [activeCategory, isInView, t])

  // Auto-rotate skills showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skillCategories[0].skills.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Card 3D simples e funcional
  const Card3D = ({ children }: { children: React.ReactNode }) => {
    const [transform, setTransform] = useState("")
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 8
      const rotateY = (centerX - x) / 8

      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
    }

    return (
      <div
        className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 border-teal-400/30 bg-slate-800/50 backdrop-blur-sm hover:border-teal-400 transition-all duration-300"
        style={{
          transform: transform,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {children}

          {/* Efeito de brilho */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.2) 0%, rgba(45, 212, 191, 0) 80%)",
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <section id="tecnologias" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-teal-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ["0vh", "110vh"],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45, 212, 191, 0.3)" }}
          >
            <Terminal className="w-6 h-6 text-teal-400 drop-shadow-neon" />
            <span className="text-teal-400 font-mono text-sm">{t("skills.command")}</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 drop-shadow-neon">
              {t("skills.title")}
            </span>
          </h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full shadow-neon mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-rajdhani">{t("skills.description")}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-6 text-center hover:border-teal-400/50 hover:bg-slate-700/50 hover:shadow-neon-lg transition-all duration-300 group-hover:shadow-neon-xl">
                <div className="mb-4">
                  <stat.icon className="w-12 h-12 mx-auto text-teal-400 drop-shadow-neon" />
                </div>
                <motion.div
                  className="text-2xl font-bold text-white mb-2 font-orbitron"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    {stat.value}
                  </span>
                </motion.div>
                <div className="text-gray-400 text-sm font-medium font-rajdhani">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Code Terminal */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-teal-400/30 shadow-neon-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">skills.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-teal-400 text-xs font-mono">LIVE</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-5 font-mono text-sm min-h-[350px]">
                <div className="flex items-center text-gray-500 mb-4">
                  <span className="mr-2 text-teal-400">$</span>
                  <span className="text-cyan-400">npm run</span>
                  <span className="ml-1">showcase-skills</span>
                </div>

                <pre className="text-gray-300 leading-relaxed">
                  <code>
                    {typedCode}
                    <span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-blink"></span>
                  </code>
                </pre>

                {/* Live Metrics */}
                <div className="mt-6 p-4 bg-teal-400/10 border border-teal-400/30 rounded-lg">
                  <div className="text-teal-400 text-xs mb-2">PERFORMANCE METRICS</div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">{t("skills.metrics.codeQuality")}:</span>
                      <span className="text-green-400 ml-2">A+</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("skills.metrics.testCoverage")}:</span>
                      <span className="text-green-400 ml-2">95%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("skills.metrics.performance")}:</span>
                      <span className="text-green-400 ml-2">98/100</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("skills.metrics.accessibility")}:</span>
                      <span className="text-green-400 ml-2">100/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Categories */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 font-rajdhani ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-teal-400/20 to-cyan-400/20 text-teal-300 border border-teal-400/40 shadow-neon"
                      : "bg-slate-800/50 text-gray-400 border border-slate-600 hover:border-teal-400/30 hover:text-teal-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </motion.button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4" ref={ref}>
              {skillCategories
                .find((cat) => cat.id === activeCategory)
                ?.skills.map((skill: any, index: number) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card3D>
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        {/* Icon */}
                        <div className="text-3xl mb-3">{skill.icon}</div>

                        {/* Skill Name */}
                        <h4 className="text-sm font-semibold text-white mb-2 font-orbitron leading-tight">
                          {skill.name}
                        </h4>

                        {/* Experience */}
                        <div className="text-teal-400 text-xs font-rajdhani mb-1">{skill.experience}</div>

                        {/* Projects count */}
                        <div className="text-gray-400 text-xs font-rajdhani">
                          {skill.projects} {t("skills.projectsText")}
                        </div>

                        {/* Status indicator */}
                        <div className="absolute right-3 top-3 rounded-full bg-slate-800/50 p-1 backdrop-blur-sm border border-teal-400/30">
                          <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Expertise Showcase */}
        <motion.div
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-teal-400/30 rounded-3xl p-8 hover:border-teal-400 transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-4 font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                {t("skills.expertise.title")}
              </span>
            </h3>
            <p className="text-gray-400 font-rajdhani">{t("skills.expertise.description")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t("skills.expertise.areas").map((expertise: any, index: number) => (
              <motion.div
                key={index}
                className="bg-slate-700/30 border border-teal-400/20 rounded-2xl p-6 hover:border-teal-400 hover:bg-slate-600/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  {index === 0 && <Globe className="w-12 h-12 text-teal-400 drop-shadow-neon" />}
                  {index === 1 && <Database className="w-12 h-12 text-teal-400 drop-shadow-neon" />}
                  {index === 2 && <Smartphone className="w-12 h-12 text-teal-400 drop-shadow-neon" />}
                </div>
                <h4 className="text-base font-semibold text-white mb-2 font-rajdhani">{expertise.title}</h4>
                <p className="text-gray-400 text-sm mb-4 font-rajdhani">{expertise.description}</p>
                <div className="flex flex-wrap gap-2">
                  {expertise.technologies.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-teal-400/20 border border-teal-400/30 rounded-md text-xs text-teal-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechnologiesSection
