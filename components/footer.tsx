"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/eliasfmartins", label: t("footer.socialLabels.github") },
    { icon: Linkedin, href: "https://www.linkedin.com/in/elias-f-martins/", label: t("footer.socialLabels.linkedin") },
    { icon: Mail, href: "mailto:eliasmartinsdev8@gmail.com", label: t("footer.socialLabels.email") },
  ]

  const quickLinks = [
    { name: t("nav.about"), href: "#sobre" },
    { name: t("nav.skills"), href: "#tecnologias" },
    { name: t("nav.timeline"), href: "#timeline" },
    { name: t("nav.projects"), href: "#projetos" },
    { name: t("nav.contact"), href: "#contato" },
  ]

  return (
    <footer className="relative bg-slate-900/50 backdrop-blur-xl border-t border-teal-400/20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Code2 className="w-10 h-10 text-teal-400 drop-shadow-neon" />
                <motion.div
                  className="absolute inset-0 bg-teal-400/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 font-orbitron drop-shadow-neon">
                  {t("footer.brand.name")}
                </h3>
                <p className="text-gray-400 text-sm font-rajdhani">{t("footer.brand.title")}</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm font-rajdhani text-sm">
              {t("footer.brand.description")}
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 border border-teal-400/20 rounded-full hover:border-teal-400/40 hover:bg-teal-400/10 hover:shadow-neon transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-teal-400 group-hover:drop-shadow-neon transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base font-semibold text-white font-orbitron">{t("footer.navigation")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 hover:drop-shadow-neon transition-colors duration-300 flex items-center group font-rajdhani"
                  >
                    <span className="w-0 h-0.5 bg-teal-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2 shadow-neon" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base font-semibold text-white font-orbitron">{t("footer.contact.title")}</h4>
            <div className="space-y-3">
              <div className="text-gray-400">
                <p className="text-sm font-rajdhani">{t("footer.contact.email")}</p>
              </div>
              <div className="text-gray-400">
                <p className="text-sm font-rajdhani">{t("footer.contact.location")}</p>
              </div>
              <div className="text-gray-400">
                <p className="text-sm font-rajdhani">{t("footer.contact.availability")}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-400/10 to-cyan-400/10 border border-teal-400/20 rounded-xl p-4">
              <p className="text-teal-400 text-sm font-medium mb-2 font-rajdhani">{t("footer.contact.status.title")}</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-neon" />
                <span className="text-gray-300 text-sm font-rajdhani">{t("footer.contact.status.available")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-teal-400/20 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm font-rajdhani">
            <span>© 2024 Elias Martins. {t("footer.bottom.madeWith")}</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>{t("footer.bottom.and")}</span>
            <Code2 className="w-4 h-4 text-teal-400 drop-shadow-neon" />
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm font-rajdhani">{t("footer.bottom.builtWith")}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-teal-400/30 text-teal-400 hover:bg-teal-400/10 hover:border-teal-400/50 hover:shadow-neon"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full shadow-neon"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
