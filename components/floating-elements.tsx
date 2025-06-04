"use client"

import { motion } from "framer-motion"

const FloatingElements = () => {
  // Reduzindo a quantidade de elementos para simplificar o visual
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Apenas alguns elementos flutuantes sutis */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-teal-400/40 rounded-full shadow-neon"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Apenas um elemento de destaque */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default FloatingElements
