"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export default function HeroSection() {
	const { t } = useLanguage()
	const [typedText, setTypedText] = useState("")
	const fullText =
		t("hero.terminal.skills") +
		" " +
		t("hero.terminal.react") +
		" " +
		t("hero.terminal.nextjs") +
		" " +
		t("hero.terminal.typescript") +
		" " +
		t("hero.terminal.closing")

	useEffect(() => {
		let i = 0
		const typingInterval = setInterval(() => {
			if (i < fullText.length) {
				setTypedText(fullText.substring(0, i + 1))
				i++
			} else {
				clearInterval(typingInterval)
			}
		}, 50)

		return () => clearInterval(typingInterval)
	}, [fullText])

	const scrollToAbout = () => {
		document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
	}

	return (
		<section className="pt-6 min-h-screen flex flex-col justify-center relative">
			<div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-24">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						className="space-y-8 order-2"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="space-y-2">
							<motion.p
								className="text-teal-400 font-mono"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
							>
								{"<FullStackDeveloper />"}
							</motion.p>

							<motion.h1
								className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.8 }}
							>
								<span className="text-white">{t("hero.greeting")} </span>
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 drop-shadow-neon">
									Elias Martins
								</span>
							</motion.h1>

							<motion.p
								className="text-lg md:text-xl text-gray-400 mt-4"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.8 }}
							>
								{t("hero.description")}
							</motion.p>
						</div>

						{/* Tech Stack */}
						<motion.div
							className="flex flex-wrap gap-3 "
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.8 }}
						>
							<TechBadge icon={<Code className="w-4 h-4" />} label={t("hero.techStack.frontend")} />
							<TechBadge icon={<Server className="w-4 h-4" />} label={t("hero.techStack.backend")} />
							<TechBadge icon={<Terminal className="w-4 h-4" />} label={t("hero.techStack.language")} />
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							className="flex flex-wrap gap-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9, duration: 0.8 }}
						>
							<Button
								onClick={scrollToAbout}
								className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 shadow-neon-lg px-5 py-4 rounded-xl font-semibold"
								size="default"
							>
								{t("hero.cta")}
								<ArrowDown className="ml-2 h-4 w-4" />
							</Button>

							<div className="flex items-center gap-4 ">
								<SocialButton href="https://github.com/eliasfmartins" icon={<Github className="h-5 w-5" />} />
								<SocialButton href="https://linkedin.com/in/elias-f-martins" icon={<Linkedin className="h-5 w-5" />} />
								<SocialButton href="mailto:eliasmartinsdev8@gmail.com" icon={<Mail className="h-5 w-5" />} />
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column - Code Terminal */}
					<motion.div
						className="relative order-last "
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-teal-500/20 shadow-neon-lg overflow-hidden">
							{/* Terminal Header */}
							<div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-red-500"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
								<div className="w-3 h-3 rounded-full bg-green-500"></div>
								<div className="ml-2 text-sm text-gray-400 font-mono">developer.js</div>
							</div>

							{/* Terminal Content */}
							<div className="p-4 md:p-6 font-mono text-xs md:text-sm">
								<div className="flex items-center text-gray-500 mb-2">
									<span className="mr-2">$</span>
									<span className="text-teal-400">node</span>
									<span className="ml-1">developer.js</span>
								</div>

								<div className="text-teal-400 mb-4">
									{typedText}
									<span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-blink"></span>
								</div>

								<div className="text-gray-400 text-xs md:text-sm">
									<span className="text-cyan-400">{">"}</span> developer.skills.map(skill {"=>"} console.log(`🚀 $
									{"${skill}"}`))
								</div>

								<div className="mt-2 space-y-1 text-xs md:text-sm">
									<div className="text-white">🚀 React</div>
									<div className="text-white">🚀 Next.js</div>
									<div className="text-white">🚀 Node</div>
								</div>

								<div className="mt-4 text-gray-400 text-xs md:text-sm">
									<span className="text-cyan-400">{">"}</span> {t("hero.terminal.contact")}
								</div>

								<div className="mt-2 text-teal-300 text-xs md:text-sm">{t("hero.terminal.ready")}</div>
							</div>
						</div>

						{/* Decorative Elements */}
						<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
						<div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
					</motion.div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2, duration: 1 }}
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
					className="flex flex-col items-center"
				>
					<span className="text-gray-400 text-sm mb-2">{t("hero.scrollText")}</span>
					<div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center shadow-neon">
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
							className="w-1 h-3 bg-teal-400 rounded-full mt-2 shadow-neon"
						/>
					</div>
				</motion.div>
			</motion.div>
		</section>
	)
}

function TechBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-teal-500/20  text-teal-300 shadow-neon rounded-full">
			{icon}
			<span className="text-sm font-semibold">{label}</span>
		</div>
	)
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
	return (
		<motion.a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="p-3 bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-full hover:border-teal-400/50 hover:bg-slate-700/50 hover:shadow-neon transition-all duration-300"
			whileHover={{ scale: 1.1, y: -2 }}
			whileTap={{ scale: 0.95 }}
		>
			<span className="text-teal-400">{icon}</span>
		</motion.a>
	)
}
