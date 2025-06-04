"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Globe, Menu, X, Sparkles } from "lucide-react"

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState("home")
	const { language, setLanguage, t } = useLanguage()

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY
			setIsScrolled(currentScrollY > 50)

			// Detect active section
			const sections = ["home", "sobre", "tecnologias", "timeline", "projetos", "contato"]
			const scrollPosition = currentScrollY + 100

			for (const section of sections) {
				const element = document.getElementById(section === "home" ? "" : section)
				if (element) {
					const { offsetTop, offsetHeight } = element
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section)
						break
					}
				}
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Função melhorada para scroll com fechamento do menu mobile
	const scrollToSection = (sectionId: string) => {
		console.log(`Navegando para seção: ${sectionId}`)

		// Sempre fechar o menu mobile primeiro
		setIsMobileMenuOpen(false)

		// Pequeno delay para permitir que o menu feche antes do scroll
		setTimeout(() => {
			try {
				if (sectionId === "home") {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					})
					console.log("Scrolled para o topo (home)")
				} else {
					const element = document.getElementById(sectionId)
					if (element) {
						// Offset para header fixo
						const headerOffset = 120
						const elementPosition = element.getBoundingClientRect().top
						const offsetPosition = elementPosition + window.pageYOffset - headerOffset

						window.scrollTo({
							top: offsetPosition,
							behavior: "smooth",
						})
						console.log(`Scroll bem-sucedido para seção: ${sectionId}`)
					} else {
						console.error(`Elemento com ID '${sectionId}' não encontrado`)
						// Fallback
						const fallbackElement = document.querySelector(`#${sectionId}`)
						if (fallbackElement) {
							fallbackElement.scrollIntoView({
								behavior: "smooth",
								block: "start",
							})
							console.log(`Fallback scroll bem-sucedido para: ${sectionId}`)
						}
					}
				}
			} catch (error) {
				console.error(`Erro ao fazer scroll para seção ${sectionId}:`, error)
			}
		}, 100) // Delay de 100ms para permitir que o menu feche
	}

	// Navigation items
	const navItems = [
		{ key: "home", label: "Home", sectionId: "home" },
		{ key: "sobre", label: t("nav.about"), sectionId: "sobre" },
		{ key: "tecnologias", label: t("nav.skills"), sectionId: "tecnologias" },
		{ key: "timeline", label: t("nav.timeline"), sectionId: "timeline" },
		{ key: "projetos", label: t("nav.projects"), sectionId: "projetos" },
		{ key: "contato", label: t("nav.contact"), sectionId: "contato" },
	]

	// Componente para item do menu mobile
	const MobileMenuItem = ({ item, index }: { item: any; index: number }) => {
		const handleClick = (e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			console.log(`Item do menu mobile clicado: ${item.key} -> ${item.sectionId}`)
			scrollToSection(item.sectionId)
		}

		return (
			<motion.button
				onClick={handleClick}
				className={`relative w-full px-4 py-3 rounded-full transition-all duration-300 font-semibold  bg-black/90 font-rajdhani text-sm text-left ${activeSection === item.key
					? "bg-gradient-to-r from-teal-400/50 to-cyan-400/50 text-white border-2 border-teal-400  bg-black/90"
					: " text-white border border-teal-400/50  hover:border-teal-400  bg-black/90"
					}`}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: index * 0.1 }}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<span className="relative z-10 block w-full text-left">{item.label}</span>
			</motion.button>
		)
	}

	// Fechar menu quando clicar fora
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element
			if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
				setIsMobileMenuOpen(false)
			}
		}

		if (isMobileMenuOpen) {
			document.addEventListener("click", handleClickOutside)
			// Prevenir scroll do body quando menu estiver aberto
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}

		return () => {
			document.removeEventListener("click", handleClickOutside)
			document.body.style.overflow = "unset"
		}
	}, [isMobileMenuOpen])

	return (
		<>
			{/* Header normal quando não está scrolled */}
			{!isScrolled && (
				<motion.nav initial={{ y: 0 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 bg-transparent">
					<div className="mx-auto px-4 md:px-6 sm:w-[95%] max-w-[1400px]  border-teal-400">
						<div className="flex items-center justify-between py-3 md:py-4">
							{/* Logo */}
							<motion.div
								className="flex items-center space-x-2 cursor-pointer group"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
								onClick={() => scrollToSection("home")}
							>
								<div className="relative">
									<Sparkles className="w-6 h-6 md:w-8 md:h-8 text-teal-400 group-hover:text-teal-300 transition-colors drop-shadow-neon " />
									<motion.div
										className="absolute inset-0 bg-teal-400/30 rounded-full blur-lg  "
										animate={{ scale: [1, 1.3, 1] }}
										transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
									/>
								</div>
								<span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent drop-shadow-neon font-orbitron">
									Elias.dev
								</span>
							</motion.div>

							{/* Desktop Navigation */}
							<div className="hidden lg:flex items-center space-x-1">
								{navItems.map((item, index) => (
									<motion.button
										key={item.key}
										onClick={() => scrollToSection(item.sectionId)}
										className={`relative px-3 lg:px-4 py-2 rounded-full transition-all duration-300 font-semibold font-rajdhani text-sm lg:text-base ${activeSection === item.key
											? "text-slate-900 font-semibold"
											: "text-gray-300 hover:text-teal-400 hover:drop-shadow-neon"
											}`}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										whileHover={{ y: -2 }}
									>
										{activeSection === item.key && (
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-neon-lg"
												layoutId="activeTab"
												transition={{ type: "spring", stiffness: 300, damping: 30 }}
											/>
										)}
										<span className="relative z-10">{item.label}</span>
									</motion.button>
								))}
							</div>

							{/* Right Side Controls */}
							<div className="flex items-center space-x-2 md:space-x-4">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
										className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 text-teal-400 hover:text-teal-300 hover:border-teal-400/50 hover:shadow-neon transition-all duration-300 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 font-semibold rounded-full"
									>
										<Globe className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
										{language.toUpperCase()}
									</Button>
								</motion.div>

								{/* Mobile Menu Button */}
								<Button
									variant="ghost"
									size="sm"
									className="lg:hidden text-gray-300 hover:text-teal-400 hover:drop-shadow-neon p-2 rounded-full"
									onClick={(e) => {
										e.stopPropagation()
										console.log(`Menu mobile toggled: ${!isMobileMenuOpen}`)
										setIsMobileMenuOpen(!isMobileMenuOpen)
									}}
								>
									<motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
										{isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
									</motion.div>
								</Button>
							</div>
						</div>

						{/* Mobile Navigation */}
						<AnimatePresence>
							{isMobileMenuOpen && (
								<motion.div
									className="mobile-menu-container lg:hidden overflow-hidden border-t border-teal-400/20"
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									onClick={(e) => e.stopPropagation()}
								>
									<div className="w-[90%] max-w-[1400px] mx-auto">
										<div className="flex flex-col space-y-2 py-4">
											{navItems.map((item, index) => (
												<MobileMenuItem key={`mobile-${item.key}`} item={item} index={index} />
											))}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.nav>
			)}

			{/* Header flutuante quando scrolled */}
			{isScrolled && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
				>
					<div className="w-full max-w-[1400px] bg-black/90 backdrop-blur-xl border rounded-3xl px-6 py-6  border-teal-400 shadow-neon-lg">
						<div className="flex items-center justify-between  ">
							{/* Logo */}
							<motion.div
								className="flex items-center space-x-2 cursor-pointer group w-[90%] max-w-[1400px]"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
								onClick={() => scrollToSection("home")}
							>
								<div className="relative">
									<Sparkles className="w-5 h-5 md:w-6 md:h-6 text-teal-400 group-hover:text-teal-300 transition-colors drop-shadow-neon" />
									<motion.div
										className="absolute inset-0 bg-teal-400/30 rounded-full blur-lg"
										animate={{ scale: [1, 1.3, 1] }}
										transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
									/>
								</div>
								<span className="text-base md:text-lg font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent drop-shadow-neon font-orbitron">
									Elias.dev
								</span>
							</motion.div>

							{/* Desktop Navigation */}
							<div className="hidden lg:flex items-center space-x-1">
								{navItems.map((item, index) => (
									<motion.button
										key={item.key}
										onClick={() => scrollToSection(item.sectionId)}
										className={`relative px-3 lg:px-4 py-2 rounded-full transition-all duration-300 font-semibold font-rajdhani text-sm ${activeSection === item.key
											? "text-slate-900 font-semibold"
											: "text-gray-300 hover:text-teal-400 hover:drop-shadow-neon"
											}`}
										whileHover={{ y: -2 }}
									>
										{activeSection === item.key && (
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-neon-lg"
												layoutId="activeTab"
												transition={{ type: "spring", stiffness: 300, damping: 30 }}
											/>
										)}
										<span className="relative z-10">{item.label}</span>
									</motion.button>
								))}
							</div>

							{/* Right Side Controls */}
							<div className="flex items-center space-x-2 md:space-x-4">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
										className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 text-teal-400 hover:text-teal-300 hover:border-teal-400/50 hover:shadow-neon transition-all duration-300 text-xs px-2 py-1 font-semibold rounded-full"
									>
										<Globe className="w-3 h-3 mr-1" />
										{language.toUpperCase()}
									</Button>
								</motion.div>

								{/* Mobile Menu Button */}
								<Button
									variant="ghost"
									size="sm"
									className="lg:hidden text-gray-300 hover:text-teal-400 hover:drop-shadow-neon p-2"
									onClick={(e) => {
										e.stopPropagation()
										console.log(`Menu mobile toggled (scrolled): ${!isMobileMenuOpen}`)
										setIsMobileMenuOpen(!isMobileMenuOpen)
									}}
								>
									<motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
										{isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
									</motion.div>
								</Button>
							</div>
						</div>
					</div>

					{/* Mobile Navigation para versão scrolled */}
					<AnimatePresence>
						{isMobileMenuOpen && (
							<motion.div
								className="mobile-menu-container lg:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[90%] max-w-[1400px]  backdrop-blur-xl rounded-2xl overflow-hidden z-50"

								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex flex-col space-y-2 p-4">
									{navItems.map((item, index) => (
										<MobileMenuItem key={`mobile-scrolled-${item.key}`} item={item} index={index} />
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</>
	)
}

export default Header
