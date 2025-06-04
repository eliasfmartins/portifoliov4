"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Code, Terminal, Braces, Laptop, Layers, GitBranch, Cpu, Zap, Award, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const AboutSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-200px" })
	const [isMobile, setIsMobile] = useState(false)
	const { t } = useLanguage()
	const [activeTab, setActiveTab] = useState(0)
	const [typedText, setTypedText] = useState("")

	const bioText = t("about.bio")

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	// Adicionar useEffect para resetar activeTab se necessário
	useEffect(() => {
		if (bioText && Array.isArray(bioText) && activeTab >= bioText.length) {
			setActiveTab(0)
		}
	}, [bioText, activeTab])

	// Typing animation effect
	useEffect(() => {
		if (!isInView || !bioText || !Array.isArray(bioText) || bioText.length === 0) return

		const currentText = bioText[activeTab]
		if (!currentText) return

		let i = 0
		setTypedText("")

		const typingInterval = setInterval(() => {
			if (i < currentText.length) {
				setTypedText(currentText.substring(0, i + 1))
				i++
			} else {
				clearInterval(typingInterval)
			}
		}, 30)

		return () => clearInterval(typingInterval)
	}, [activeTab, isInView, bioText])

	// Auto-rotate tabs
	useEffect(() => {
		if (!isInView || !bioText || !Array.isArray(bioText) || bioText.length === 0) return

		const interval = setInterval(() => {
			setActiveTab((prev) => (prev + 1) % bioText.length)
		}, 8000)
		return () => clearInterval(interval)
	}, [isInView, bioText])

	const highlights = [
		{
			icon: Zap,
			title: t("about.highlights.performance"),
			description: t("about.highlights.performanceDesc"),
			color: "from-teal-400 to-teal-600",
		},
		{
			icon: Users,
			title: t("about.highlights.teamwork"),
			description: t("about.highlights.teamworkDesc"),
			color: "from-cyan-400 to-cyan-600",
		},
		{
			icon: Award,
			title: t("about.highlights.problemSolver"),
			description: t("about.highlights.problemSolverDesc"),
			color: "from-teal-500 to-cyan-500",
		},
	]

	return (
		<section id="sobre" className="py-20 relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

				{/* Circuit board pattern */}
				<div className="absolute inset-0 opacity-5">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
							<path
								d="M0 50 H100 M50 0 V100 M25 25 H75 V75 H25 Z M75 25 A25 25 0 0 1 75 75 M10 50 A10 10 0 0 1 30 50 A10 10 0 0 1 10 50 M70 50 A10 10 0 0 1 90 50 A10 10 0 0 1 70 50"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
							/>
						</pattern>
						<rect width="100%" height="100%" fill="url(#circuit)" />
					</svg>
				</div>
			</div>

			<div className="max-w-[1200px] mx-auto px-6 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<motion.div
						className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-full hover:border-teal-400/50 hover:shadow-neon transition-all duration-400"
						whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45, 212, 191, 0.3)" }}
					>
						<Braces className="w-6 h-6 text-teal-400 drop-shadow-neon" />
						<span className="text-teal-400 font-mono text-sm">{t("about.command")}</span>
					</motion.div>

					<h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 drop-shadow-neon">
							{t("about.title")}
						</span>
					</h2>

					<motion.div
						className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full shadow-neon mb-6"
						initial={{ width: 0 }}
						whileInView={{ width: 96 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					/>

					<p className="text-lg text-gray-400 max-w-2xl mx-auto font-rajdhani">{t("about.description")}</p>
				</motion.div>

				{/* Main Content Grid - Melhor alinhamento */}
				<div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
					{/* Profile Visualization - Alinhado ao topo */}
					<motion.div
						className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<div className="relative w-full max-w-lg">
							<div className="aspect-[4/3] relative">
								{/* Holographic Container */}
								<div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-teal-500/10 rounded-2xl backdrop-blur-xl border border-teal-400/30 shadow-neon-lg overflow-hidden hover:border-teal-400/50 hover:shadow-neon-xl transition-all duration-400">
									{/* Holographic Grid */}
									<div className="absolute inset-0 opacity-20">
										{[...Array(8)].map((_, i) => (
											<motion.div
												key={i}
												className="absolute inset-x-0 h-px bg-teal-400"
												style={{ top: `${i * 12.5}%` }}
												animate={{
													opacity: [0.3, 0.8, 0.3],
												}}
												transition={{
													duration: 3,
													repeat: Number.POSITIVE_INFINITY,
													delay: i * 0.2,
												}}
											/>
										))}
										{[...Array(12)].map((_, i) => (
											<motion.div
												key={i}
												className="absolute inset-y-0 w-px bg-teal-400"
												style={{ left: `${i * 8.33}%` }}
												animate={{
													opacity: [0.3, 0.8, 0.3],
												}}
												transition={{
													duration: 3,
													repeat: Number.POSITIVE_INFINITY,
													delay: i * 0.15,
												}}
											/>
										))}
									</div>

									{/* Scanning Effect - Horizontal */}
									<motion.div
										className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
										animate={{
											top: ["0%", "100%", "0%"],
										}}
										transition={{
											duration: 6,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
										}}
									/>

									{/* Scanning Effect - Vertical */}
									<motion.div
										className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
										animate={{
											left: ["0%", "100%", "0%"],
										}}
										transition={{
											duration: 8,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
											delay: 1,
										}}
									/>

									{/* Corner Brackets */}
									<div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-teal-400 rounded-tl-lg"></div>
									<div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-teal-400 rounded-tr-lg"></div>
									<div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-teal-400 rounded-bl-lg"></div>
									<div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-teal-400 rounded-br-lg"></div>

									{/* Developer Avatar */}
									<div className="absolute inset-0 flex items-center justify-center">
										<motion.div
											className="w-32 h-32 md:w-40 md:h-40 bg-slate-800/90 backdrop-blur-xl border-2 border-teal-400/50 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-neon-xl hover:border-teal-400/70 hover:shadow-neon-xl transition-all duration-400"
											whileHover={{ scale: 1.05 }}
											transition={{ duration: 0.3 }}
										>
											<div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-teal-500/30 animate-pulse" />
											<Code className="w-16 h-16 md:w-20 md:h-20 text-teal-400 relative z-10 drop-shadow-neon" />

											{/* Data streams */}
											<div className="absolute top-2 right-2 flex flex-col space-y-1">
												{[...Array(3)].map((_, i) => (
													<motion.div
														key={i}
														className="w-1 h-1 bg-teal-400 rounded-full"
														animate={{
															opacity: [0.3, 1, 0.3],
															scale: [0.8, 1.2, 0.8],
														}}
														transition={{
															duration: 2,
															repeat: Number.POSITIVE_INFINITY,
															delay: i * 0.3,
														}}
													/>
												))}
											</div>
										</motion.div>
									</div>

									{/* Floating Tech Icons */}
									{[
										{ icon: <Terminal className="w-5 h-5 text-teal-400" />, x: 20, y: 20 },
										{ icon: <Laptop className="w-5 h-5 text-teal-400" />, x: 80, y: 25 },
										{ icon: <Layers className="w-5 h-5 text-teal-400" />, x: 15, y: 75 },
										{ icon: <GitBranch className="w-5 h-5 text-teal-400" />, x: 85, y: 70 },
										{ icon: <Cpu className="w-5 h-5 text-teal-400" />, x: 50, y: 10 },
									].map((item, index) => (
										<motion.div
											key={index}
											className="absolute w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-teal-400/40 rounded-lg flex items-center justify-center shadow-neon hover:border-teal-400/60 hover:shadow-neon-lg transition-all duration-300"
											style={{
												left: `${item.x}%`,
												top: `${item.y}%`,
												transform: "translate(-50%, -50%)",
											}}
											animate={{
												y: [0, -10, 0],
												opacity: [0.7, 1, 0.7],
											}}
											transition={{
												duration: 4,
												repeat: Number.POSITIVE_INFINITY,
												delay: index * 0.8,
												ease: "easeInOut",
											}}
										>
											{item.icon}
										</motion.div>
									))}

									{/* Status indicators */}
									<div className="absolute bottom-2 left-2 right-2 flex justify-between">
										<motion.div
											className="px-2 py-1 bg-slate-800/70 border border-teal-400/30 rounded text-xs text-teal-400 font-mono hover:border-teal-400/50 transition-all duration-300"
											animate={{ opacity: [0.5, 1, 0.5] }}
											transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
										>
											ONLINE
										</motion.div>
										<motion.div
											className="px-2 py-1 bg-slate-800/70 border border-cyan-400/30 rounded text-xs text-cyan-400 font-mono hover:border-cyan-400/50 transition-all duration-300"
											animate={{ opacity: [0.5, 1, 0.5] }}
											transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
										>
											READY
										</motion.div>
									</div>
								</div>
							</div>

							{/* Status Indicators */}
							<div className="mt-8 grid grid-cols-3 gap-4">
								{[
									{
										label: t("about.status.labels.status"),
										value: t("about.status.available"),
										color: "bg-green-500",
									},
									{
										label: t("about.status.labels.location"),
										value: t("about.status.location"),
										color: "bg-blue-500",
									},
									{ label: t("about.status.labels.remote"), value: t("about.status.remote"), color: "bg-green-500" },
								].map((status, index) => (
									<motion.div
										key={index}
										className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-xl p-3 text-center hover:border-teal-400/50 hover:shadow-neon transition-all duration-400"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="text-gray-400 text-xs mb-1 font-rajdhani">{status.label}</div>
										<div className="flex items-center justify-center gap-2">
											<div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
											<div className="text-white text-sm font-medium font-rajdhani">{status.value}</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* About Content - Alinhado ao topo */}
					<motion.div
						className="space-y-8 order-1 lg:order-2"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						ref={ref}
					>
						{/* Bio Terminal */}
						<div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-teal-400/30 shadow-neon-lg overflow-hidden hover:border-teal-400/50 hover:shadow-neon-xl transition-all duration-400">
							{/* Terminal Header */}
							<div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="flex gap-2">
										<div className="w-3 h-3 rounded-full bg-red-500"></div>
										<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
										<div className="w-3 h-3 rounded-full bg-green-500"></div>
									</div>
									<span className="text-gray-400 font-mono text-sm">bio.md</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
									<span className="text-teal-400 text-xs font-mono">ACTIVE</span>
								</div>
							</div>

							{/* Terminal Content */}
							<div className="p-6">
								<div className="flex items-center mb-4">
									<div className="w-10 h-10 bg-teal-400/20 rounded-full flex items-center justify-center mr-3">
										<Code className="w-5 h-5 text-teal-400" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-white font-rajdhani">Elias F. Martins</h3>
										<p className="text-teal-400 text-sm font-mono">Full Stack Developer</p>
									</div>
								</div>

								{/* Tab Navigation */}
								<div className="flex mb-4 border-b border-slate-700">
									{Array.isArray(t("about.tabs")) &&
										t("about.tabs").map((tab: string, index: number) => (
											<button
												key={index}
												className={`px-4 py-2 text-sm font-medium font-rajdhani transition-all duration-300 ${activeTab === index
													? "text-teal-400 border-b-2 border-teal-400"
													: "text-gray-400 hover:text-teal-300 hover:border-b-2 hover:border-teal-400/50"
													}`}
												onClick={() => setActiveTab(index)}
											>
												{tab}
											</button>
										))}
								</div>

								{/* Bio Content */}
								<div className="min-h-[120px] font-rajdhani text-gray-300 leading-relaxed">
									{typedText}
									<span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-blink"></span>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 mt-4">
									{Array.isArray(t("about.tags")) &&
										t("about.tags").map((tag: string, index: number) => (
											<span
												key={index}
												className="px-2 py-1 bg-teal-400/20 border border-teal-400/30 rounded-md text-xs text-teal-400 font-mono hover:border-teal-400/50 hover:bg-teal-400/30 transition-all duration-300"
											>
												{tag}
											</span>
										))}
								</div>
							</div>
						</div>

						{/* Highlights */}
						<div className="space-y-4">
							{highlights.map((highlight, index) => (
								<motion.div
									key={index}
									className="flex items-start space-x-4 p-4 bg-slate-800/40 backdrop-blur-sm border border-teal-400/30 rounded-xl hover:border-teal-400/50 hover:bg-slate-700/40 hover:shadow-neon transition-all duration-400"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, x: 5 }}
								>
									<div className={`p-3 bg-gradient-to-r ${highlight.color} rounded-lg shadow-neon`}>
										<highlight.icon className="w-5 h-5 text-white" />
									</div>
									<div>
										<h4 className="font-semibold text-white mb-1 font-rajdhani">{highlight.title}</h4>
										<p className="text-gray-400 text-sm font-rajdhani">{highlight.description}</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Call to Action */}
						<motion.div
							className="flex justify-center lg:justify-start"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							viewport={{ once: true }}
						>
							<motion.button
								className="px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-black font-semibold rounded-xl shadow-neon-lg hover:shadow-neon-xl transition-all duration-300 transform hover:scale-105 font-rajdhani border-2 border-transparent hover:border-teal-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
							>
								{t("about.cta")}
							</motion.button>
						</motion.div>
					</motion.div>
				</div>

				{/* Timeline Preview */}
				<motion.div
					className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-3xl p-8 hover:border-teal-400/50 hover:shadow-neon-lg transition-all duration-500"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="text-center mb-8">
						<h3 className="text-xl font-bold text-white mb-4 font-orbitron">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
								{t("about.timeline.title")}
							</span>
						</h3>
						<p className="text-gray-400 font-rajdhani">{t("about.timeline.description")}</p>
					</div>

					{/* Timeline Preview */}
					<div className="relative">
						{/* Timeline Line */}
						<div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-teal-400/20">
							<motion.div
								className="w-full bg-gradient-to-b from-teal-400 to-cyan-400 origin-top shadow-neon"
								initial={{ scaleY: 0 }}
								whileInView={{ scaleY: 1 }}
								transition={{ duration: 1.5 }}
								viewport={{ once: true }}
							/>
						</div>

						{/* Timeline Items Preview */}
						<div className="relative z-10 flex justify-between items-center mb-8">
							<div className="w-5/12 text-right pr-8">
								<motion.div
									className="inline-block bg-slate-800/70 backdrop-blur-sm border border-teal-400/30 rounded-xl p-4 hover:border-teal-400/50 hover:shadow-neon transition-all duration-400"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, x: -5 }}
								>
									<div className="text-teal-400 font-bold font-orbitron mb-1">2021</div>
									<div className="text-white font-medium font-rajdhani">{t("about.timeline.events.graduation")}</div>
									<div className="text-gray-400 text-sm font-rajdhani">{t("about.timeline.events.graduationDesc")}</div>
								</motion.div>
							</div>

							{/* Timeline Node */}
							<div className="z-20">
								<motion.div
									className="flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full shadow-neon-lg"
									whileHover={{ scale: 1.2 }}
									transition={{ duration: 0.2 }}
								>
									<div className="w-2 h-2 bg-slate-900 rounded-full"></div>
								</motion.div>
							</div>

							<div className="w-5/12 pl-8">
								<motion.div
									className="inline-block bg-slate-800/70 backdrop-blur-sm border border-teal-400/30 rounded-xl p-4 hover:border-teal-400/50 hover:shadow-neon transition-all duration-400"
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, x: 5 }}
								>
									<div className="text-teal-400 font-bold font-orbitron mb-1">2022</div>
									<div className="text-white font-medium font-rajdhani">{t("about.timeline.events.internship")}</div>
									<div className="text-gray-400 text-sm font-rajdhani">{t("about.timeline.events.internshipDesc")}</div>
								</motion.div>
							</div>
						</div>

						{/* View Full Timeline Button */}
						<div className="text-center mt-8">
							<motion.button
								className="px-6 py-3 bg-slate-800/70 backdrop-blur-sm border border-teal-400/30 rounded-xl text-teal-400 hover:bg-teal-400/20 hover:border-teal-400/50 hover:shadow-neon transition-all duration-400 font-rajdhani"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
							>
								{t("about.timeline.viewFull")}
							</motion.button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default AboutSection
