"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Mail,
	Linkedin,
	Github,
	MapPin,
	Send,
	MessageCircle,
	Calendar,
	Phone,
	Terminal,
	CheckCircle2,
	Loader2,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const ContactSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-100px" })
	const { t } = useLanguage()
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		company: "",
		projectType: "",
		message: "",
		newsletter: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [typedCommand, setTypedCommand] = useState("")

	const contactMethods = t("contact.methods").map((method: any, index: number) => ({
		icon: [Mail, Linkedin, Github, MapPin][index],
		title: method.title,
		subtitle: method.subtitle,
		value: method.value,
		href:
			index === 0
				? "mailto:eliasmartinsdev8@gmail.com"
				: index === 1
					? "https://www.linkedin.com/in/elias-f-martins/"
					: index === 2
						? "https://github.com/eliasfmartins"
						: null,
		color: [
			"from-teal-400 to-teal-600",
			"from-cyan-400 to-cyan-600",
			"from-teal-500 to-teal-700",
			"from-cyan-500 to-cyan-700",
		][index],
		description: method.description,
	}))

	// Simulate form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false)
			setIsSubmitted(true)

			// Reset form after showing success message
			setTimeout(() => {
				setFormState({
					name: "",
					email: "",
					company: "",
					projectType: "",
					message: "",
					newsletter: false,
				})
				setIsSubmitted(false)
			}, 5000)
		}, 2000)
	}

	// Handle form input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormState((prev) => ({ ...prev, [name]: value }))
	}

	// Handle checkbox changes
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target
		setFormState((prev) => ({ ...prev, [name]: checked }))
	}

	// Terminal command effect
	const commands = t("contact.commands")

	// Cycle through commands
	useState(() => {
		if (!isInView) return

		let currentCommand = 0
		let charIndex = 0
		let isDeleting = false

		const typeCommand = () => {
			const command = commands[currentCommand]

			if (isDeleting) {
				setTypedCommand(command.substring(0, charIndex - 1))
				charIndex--
			} else {
				setTypedCommand(command.substring(0, charIndex + 1))
				charIndex++
			}

			if (!isDeleting && charIndex === command.length) {
				// Pause at the end of typing
				setTimeout(() => {
					isDeleting = true
				}, 1500)
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false
				currentCommand = (currentCommand + 1) % commands.length
			}

			const typingSpeed = isDeleting ? 30 : 70
			setTimeout(typeCommand, typingSpeed)
		}

		setTimeout(typeCommand, 1000)
	})

	return (
		<section id="contato" className="py-20 relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

				{/* Grid pattern */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
                linear-gradient(rgba(45, 212, 191, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(45, 212, 191, 0.1) 1px, transparent 1px)
              `,
							backgroundSize: "50px 50px",
						}}
					/>
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
						className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-full"
						whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45, 212, 191, 0.3)" }}
					>
						<Terminal className="w-6 h-6 text-teal-400 drop-shadow-neon" />
						<span className="text-teal-400 font-mono text-sm">
							{typedCommand}
							<span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-blink"></span>
						</span>
					</motion.div>

					<h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 drop-shadow-neon">
							{t("contact.title")}
						</span>
					</h2>

					<motion.div
						className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full shadow-neon mb-6"
						initial={{ width: 0 }}
						whileInView={{ width: 96 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					/>

					<p className="text-lg text-gray-400 max-w-2xl mx-auto font-rajdhani">{t("contact.description")}</p>
				</motion.div>

				<div className="max-w-5xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Methods */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-3xl p-8 hover:border-teal-400 hover:bg-slate-700/40 transition-all duration-500">
								<h3 className="text-xl font-bold text-white mb-6 flex items-center font-orbitron">
									<MessageCircle className="w-6 h-6 mr-3 text-teal-400 drop-shadow-neon" />
									{t("contact.sections.getInTouch")}
								</h3>

								<div className="space-y-6">
									{contactMethods.map((method, index) => (
										<motion.div
											key={index}
											className="group"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.6, delay: index * 0.1 }}
											viewport={{ once: true }}
										>
											{method.href ? (
												<a href={method.href} target="_blank" rel="noopener noreferrer" className="block">
													<ContactMethodCard method={method} />
												</a>
											) : (
												<ContactMethodCard method={method} />
											)}
										</motion.div>
									))}
								</div>

								{/* Quick Actions */}
								<div className="mt-8 pt-8 border-t border-teal-400/30">
									<h4 className="text-lg font-semibold text-white mb-4 font-rajdhani">
										{t("contact.quickActions.title")}
									</h4>
									<div className="flex flex-col sm:flex-row gap-3">
										<Button className="bg-teal-400/20 border border-teal-400/30 text-teal-400 hover:bg-teal-400/30 hover:border-teal-400 font-rajdhani">
											<Calendar className="w-4 h-4 mr-2" />
											{t("contact.quickActions.schedule")}
										</Button>
										<Button className="bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/30 hover:border-cyan-400 font-rajdhani">
											<Phone className="w-4 h-4 mr-2" />
											{t("contact.quickActions.whatsapp")}
										</Button>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Enhanced Contact Form */}
						<motion.div
							ref={ref}
							className="bg-slate-800/50 backdrop-blur-sm border border-teal-400/30 rounded-3xl p-8 hover:border-teal-400 hover:bg-slate-700/40 transition-all duration-500"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h3 className="text-xl font-bold text-white mb-6 flex items-center font-orbitron">
								<Send className="w-6 h-6 mr-3 text-teal-400 drop-shadow-neon" />
								{t("contact.sections.sendMessage")}
							</h3>

							{isSubmitted ? (
								<motion.div
									className="flex flex-col items-center justify-center h-[400px] text-center"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
								>
									<div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mb-6">
										<CheckCircle2 className="w-8 h-8 text-teal-400" />
									</div>
									<h4 className="text-xl font-bold text-white mb-2 font-rajdhani">{t("contact.form.success.title")}</h4>
									<p className="text-gray-400 max-w-md font-rajdhani">{t("contact.form.success.description")}</p>
								</motion.div>
							) : (
								<form className="space-y-6" onSubmit={handleSubmit}>
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="block text-gray-400 text-sm font-medium font-rajdhani">
												{t("contact.form.name")} *
											</label>
											<input
												type="text"
												name="name"
												value={formState.name}
												onChange={handleChange}
												required
												className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 font-rajdhani"
												placeholder={t("contact.form.placeholders.name")}
											/>
										</div>
										<div className="space-y-2">
											<label className="block text-gray-400 text-sm font-medium font-rajdhani">
												{t("contact.form.email")} *
											</label>
											<input
												type="email"
												name="email"
												value={formState.email}
												onChange={handleChange}
												required
												className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 font-rajdhani"
												placeholder={t("contact.form.placeholders.email")}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="block text-gray-400 text-sm font-medium font-rajdhani">
											{t("contact.form.company")}
										</label>
										<input
											type="text"
											name="company"
											value={formState.company}
											onChange={handleChange}
											className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 font-rajdhani"
											placeholder={t("contact.form.placeholders.company")}
										/>
									</div>

									<div className="space-y-2">
										<label className="block text-gray-400 text-sm font-medium font-rajdhani">
											{t("contact.form.projectType")}
										</label>
										<select
											name="projectType"
											value={formState.projectType}
											onChange={handleChange}
											className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 font-rajdhani"
										>
											<option value="">{t("contact.form.projectTypes.select")}</option>
											<option value="website">{t("contact.form.projectTypes.website")}</option>
											<option value="webapp">{t("contact.form.projectTypes.webapp")}</option>
											<option value="api">{t("contact.form.projectTypes.api")}</option>
											<option value="mobile">{t("contact.form.projectTypes.mobile")}</option>
											<option value="consulting">{t("contact.form.projectTypes.consulting")}</option>
											<option value="other">{t("contact.form.projectTypes.other")}</option>
										</select>
									</div>

									<div className="space-y-2">
										<label className="block text-gray-400 text-sm font-medium font-rajdhani">
											{t("contact.form.message")} *
										</label>
										<textarea
											rows={4}
											name="message"
											value={formState.message}
											onChange={handleChange}
											required
											className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none font-rajdhani"
											placeholder={t("contact.form.placeholders.message")}
										/>
									</div>

									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<input
												type="checkbox"
												id="newsletter"
												name="newsletter"
												checked={formState.newsletter}
												onChange={handleCheckboxChange}
												className="w-4 h-4 text-teal-400 bg-slate-800 border-slate-600 rounded focus:ring-teal-400 focus:ring-2 mt-0.5"
											/>
											<label htmlFor="newsletter" className="text-gray-400 text-sm leading-relaxed font-rajdhani">
												{t("contact.form.newsletter")}
											</label>
										</div>

										<Button
											type="submit"
											disabled={isSubmitting}
											className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-neon-lg font-rajdhani disabled:opacity-70 disabled:cursor-not-allowed"
										>
											{isSubmitting ? (
												<>
													<Loader2 className="w-5 h-5 mr-2 animate-spin" />
													{t("contact.form.sending")}
												</>
											) : (
												<>
													<Send className="w-5 h-5 mr-2" />
													{t("contact.form.send")}
												</>
											)}
										</Button>
									</div>
								</form>
							)}

							<div className="mt-6 p-4 bg-teal-400/20 border border-teal-400/30 rounded-xl">
								<p className="text-teal-400 text-sm flex items-center font-rajdhani">
									<MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
									{t("contact.form.response")}
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ContactMethodCard({ method }: { method: any }) {
	return (
		<div className="flex items-start space-x-4 p-4 bg-slate-700/40 backdrop-blur-sm border border-teal-400/30 rounded-xl hover:border-teal-400 hover:bg-slate-600/40 transition-all duration-300 group cursor-pointer">
			<div
				className={`p-3 bg-gradient-to-r ${method.color} bg-opacity-30 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-neon`}
			>
				<method.icon className="w-6 h-6 text-white" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between mb-1">
					<h4 className="font-semibold text-white group-hover:text-teal-400 transition-colors duration-300 font-rajdhani">
						{method.title}
					</h4>
					<span className="text-xs text-gray-500 flex-shrink-0 ml-2 font-rajdhani">{method.subtitle}</span>
				</div>
				<p className="text-teal-400 font-medium text-sm mb-1 truncate font-rajdhani">{method.value}</p>
				<p className="text-gray-400 text-xs leading-relaxed font-rajdhani">{method.description}</p>
			</div>
		</div>
	)
}

export default ContactSection
