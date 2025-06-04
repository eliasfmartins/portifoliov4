"use client"

import { useRef } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TechnologiesSection from "@/components/technologies-section"
import TimelineSection from "@/components/timeline-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingElements from "@/components/floating-elements"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Background base - simples e elegante */}
      <div className="fixed inset-0 z-0">
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45, 212, 191, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45, 212, 191, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradiente sutil no fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />
      </div>

      <FloatingElements />
      <Header />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <TimelineSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
