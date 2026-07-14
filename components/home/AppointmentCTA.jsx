'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AppointmentCTA({ data }) {
  const content = data || {}
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Slower scale effect for background
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section ref={sectionRef} className="relative py-16 px-6 overflow-hidden min-h-[400px] flex items-center">
      <motion.img
        style={{ scale: scaleBg, y: yBg }}
        src={content.bg_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80'}
        alt="Book your appointment"
        className="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/50" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="relative z-10 w-full max-w-3xl mx-auto text-center text-white"
      >
        <motion.span variants={textVariants} className="text-[10px] font-sans tracking-[3px] text-white uppercase block mb-6">
          {content.eyebrow || 'TU VIAJE COMIENZA AQUÍ'}
        </motion.span>
        <motion.h2 variants={textVariants} className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white drop-shadow-sm">
          {content.heading || 'Pide tu Cita Privada'}
        </motion.h2>
        <motion.p variants={textVariants} className="font-body text-white/90 mb-12 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          {content.subtext || 'Vive una experiencia exclusiva con atención personalizada. Te ayudamos a encontrar el vestido perfecto para tu gran día en un entorno íntimo y lujoso.'}
        </motion.p>
        <motion.div variants={textVariants}>
          <Link href="/agenda-tu-cita" className="inline-block bg-white text-charcoal px-8 py-4 text-[11px] font-sans font-semibold tracking-[3px] uppercase hover:bg-gold hover:text-white transition-all duration-300">
            {content.cta_text || 'RESERVAR CITA'}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
