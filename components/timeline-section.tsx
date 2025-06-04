"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { GraduationCap, Briefcase, BookOpen, Award, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const TimelineSection = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-100px" })
	const [expandedItem, setExpandedItem] = useState<number | null>(null)
	const { t } = useLanguage()

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	})

	const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

	// Get timeline events from translations and add the missing properties
	const timelineEventsData = t("timeline.events")

	const timelineEvents = timelineEventsData.map((event: any, index: number) => ({
		...event,
		icon: [BookOpen, GraduationCap, Briefcase, BookOpen, BookOpen, Award, MapPin][index] || BookOpen,
		color:
			["bg-teal-500", "bg-cyan-500", "bg-teal-600", "bg-cyan-600", "bg-teal-700", "bg-cyan-700", "bg-teal-500"][
			index
			] || "bg-teal-500",
		side: index % 2 === 0 ? "right" : "left",
	}))

	const toggleExpanded = (index: number) => {
		setExpandedItem(expandedItem === index ? null : index)
	}

	return (
		<section id="timeline" className="py-20 bg-slate-900/20 overflow-hidden">
			<div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl font-orbitron">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 drop-shadow-neon">
							{t("timeline.title")}
						</span>
					</h2>
					<p className="mt-4 text-base text-gray-400 font-rajdhani">{t("timeline.description")}</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative" ref={ref}>
					{/* Animated Timeline Line */}
					<div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-teal-400/20">
						<motion.div
							className="w-full bg-gradient-to-b from-teal-400 to-cyan-400 origin-top shadow-neon"
							style={{ scaleY: lineProgress }}
						/>
					</div>

					{/* Floating Progress Indicator */}
					<motion.div
						className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-teal-400"
						style={{
							y: useTransform(scrollYProgress, [0, 1], [0, 100]),
						}}
					>
						<div className="w-6 h-6 bg-teal-400 rounded-full border-4 border-slate-900 shadow-neon-lg">
							<div className="w-full h-full bg-teal-400 rounded-full animate-pulse" />
						</div>
					</motion.div>

					{/* Timeline Items */}
					{timelineEvents.map((event: any, index: number) => (
						<motion.div
							key={index}
							className={`mb-8 flex justify-between items-center w-full ${event.side === "right" ? "flex-row-reverse" : ""
								}`}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true, margin: "-100px" }}
						>
							{/* Empty space */}
							<div className="w-5/12"></div>

							{/* Timeline Node */}
							<div className="z-20">
								<motion.div
									className={`flex items-center justify-center w-8 h-8 ${event.color} rounded-full shadow-neon-lg`}
									whileHover={{ scale: 1.2 }}
									transition={{ duration: 0.2 }}
								>
									<div className="w-3 h-3 bg-slate-900 rounded-full"></div>
								</motion.div>
							</div>

							{/* Content Card */}
							<motion.div
								className="w-5/12 cursor-pointer"
								onClick={() => toggleExpanded(index)}
								whileHover={{ scale: 1.02, x: event.side === "right" ? -5 : 5 }}
								transition={{ duration: 0.2 }}
							>
								<div className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md border border-teal-400/20 hover:border-teal-400/40 hover:shadow-neon transition-all duration-300">
									<div className="flex items-center gap-3 mb-3">
										<div className={`p-1.5 ${event.color} rounded-lg shadow-neon`}>
											<event.icon className="w-4 h-4 text-white" />
										</div>
										<span className="font-bold text-teal-400 text-base font-orbitron drop-shadow-neon">
											{event.date}
										</span>
									</div>

									<h3 className="text-base font-semibold mb-2 text-white font-rajdhani">{event.title}</h3>
									<p className="text-gray-300 font-rajdhani">{event.description}</p>

									<motion.div
										className="overflow-hidden"
										initial={false}
										animate={{
											height: expandedItem === index ? "auto" : 0,
											opacity: expandedItem === index ? 1 : 0,
										}}
										transition={{ duration: 0.3 }}
									>
										<p className="mt-3 text-sm text-gray-400 pt-3 border-t border-teal-400/20 font-rajdhani">
											{event.fullDescription}
										</p>
									</motion.div>

									{/* Expand indicator */}
									<motion.div
										className="flex justify-center mt-2"
										animate={{ rotate: expandedItem === index ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="w-6 h-1 bg-teal-400/50 rounded-full shadow-neon" />
									</motion.div>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 border border-teal-400/30 rounded-full shadow-neon">
						<MapPin className="w-5 h-5 text-teal-400 drop-shadow-neon" />
						<span className="text-white font-rajdhani">{t("timeline.location")}</span>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default TimelineSection
