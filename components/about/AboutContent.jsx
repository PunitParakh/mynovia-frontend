'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AboutContent({ content }) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth parallax values
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const yHeroImg = useTransform(scrollYProgress, [0, 1], [0, 200])
  
  const defaultGallery = [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    'https://images.unsplash.com/photo-1522653216850-4f1415a174fb?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
  ]
  
  const dbGallery = Array.isArray(content.gallery) ? content.gallery : [];
  const galleryImgs = [
    dbGallery[0] || defaultGallery[0],
    dbGallery[1] || defaultGallery[1],
    dbGallery[2] || defaultGallery[2]
  ]

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-charcoal selection:bg-gold/30">
      {/* 1. Hero Section - Full Viewport, Parallax Image */}
      <section className="relative h-screen w-full overflow-hidden bg-charcoal">
        <motion.div style={{ y: yHeroImg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src={content.hero_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80'}
            alt="About Us"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal/80" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            style={{ y: yHeroText }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-[10px] md:text-xs font-sans tracking-[4px] uppercase text-white/80 block mb-6">
              {content.eyebrow || 'SOBRE MY NOVIA'}
            </span>
            <h1 className="font-heading text-6xl md:text-8xl text-white font-light tracking-wide italic shadow-sm">
              {content.hero_title || 'Nuestra Historia'}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Story - Split Layout with overlap */}
      <section className="relative w-full px-6 py-12 md:py-16 xl:py-20 max-w-[1600px] mx-auto z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="font-heading text-4xl lg:text-5xl lg:leading-[1.1] font-light text-charcoal mb-5">
              {content.heading || 'El amor nos trajo aquí. Tú también.'}
            </h2>
            <div className="w-12 h-[1px] bg-gold mb-6" />
            <p className="font-body text-body-gray leading-relaxed text-[15px] lg:text-base whitespace-pre-wrap max-w-lg">
              {content.story || "My Novia nació de la pasión por hacer realidad el sueño de cada novia, trayendo a Almería las tendencias más exclusivas y elegantes de la moda nupcial.\n\nCreemos que elegir tu vestido de boda debe ser una experiencia memorable, profundamente personal y completamente libre de estrés.\n\nNuestro equipo de expertas se dedica por completo a entender tu estilo, tu personalidad y la visión de tu día perfecto, acompañándote en cada paso de este hermoso camino."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[3/4] overflow-hidden shadow-2xl relative">
              <img 
                src={typeof galleryImgs[0] === 'string' ? galleryImgs[0] : galleryImgs[0]?.url} 
                alt="Boutique Experience" 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Decorative Offset Block */}
            <div className="hidden lg:block absolute -bottom-12 -left-12 w-64 h-64 bg-white shadow-xl p-8 flex flex-col justify-center">
              <span className="font-heading text-5xl italic text-gold mb-4">"</span>
              <p className="font-sans text-[11px] leading-relaxed tracking-widest uppercase text-charcoal">
                Una experiencia diseñada exclusivamente para tu historia única.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Vision & Mission - Elegant Split Cards */}
      <section className="w-full bg-white border-y border-charcoal/5 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-charcoal/10"
          >
            <span className="text-[10px] font-sans font-medium tracking-[3px] uppercase text-charcoal/50 block mb-4">
              {content.vision_title || 'VISION'}
            </span>
            <p className="font-body text-charcoal text-lg lg:text-xl leading-relaxed italic font-light">
              "{content.vision || 'To be the benchmark boutique in Almería and southern Spain, recognized for our curated selection of exclusive designers, excellence in customer service, and dedication to the smallest details.'}"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 p-8 lg:p-12"
          >
            <span className="text-[10px] font-sans font-medium tracking-[3px] uppercase text-charcoal/50 block mb-4">
              {content.mission_title || 'MISSION'}
            </span>
            <p className="font-body text-charcoal text-lg lg:text-xl leading-relaxed italic font-light">
              "{content.mission || 'To accompany each bride in one of the most important moments of her life, providing a safe, luxurious and welcoming environment where she can explore, feel and find the dress that will make her shine on her wedding day.'}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Asymmetrical Gallery Showcase */}
      <section className="w-full max-w-[1600px] mx-auto px-6 py-12 lg:py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center"
        >
          {/* Large Image */}
          <div className="md:col-span-7 aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden bg-cream shadow-sm group">
            <img 
               src={typeof galleryImgs[1] === 'string' ? galleryImgs[1] : galleryImgs[1]?.url} 
               alt="Boutique Ambience" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
          </div>

          {/* Small Image stacked gracefully */}
          <div className="md:col-span-5 flex flex-col justify-center h-full pt-12 md:pt-0">
             <div className="aspect-square md:aspect-[3/4] overflow-hidden bg-cream shadow-xl w-full max-w-[400px] mx-auto -mt-24 md:mt-0 relative z-10 group">
               <img 
                 src={typeof galleryImgs[2] === 'string' ? galleryImgs[2] : galleryImgs[2]?.url} 
                 alt="Detail View" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               />
             </div>
             <div className="mt-6 text-center md:text-left md:pl-8 max-w-[400px] mx-auto md:mx-0">
               <h3 className="font-heading text-3xl italic text-charcoal mb-4">Descubre Tu Propia Magia</h3>
               <a href="/agenda-tu-cita" className="inline-block border-b border-charcoal pb-1 text-[10px] font-sans font-medium tracking-[2px] uppercase text-charcoal hover:text-gold hover:border-gold transition-colors">
                 Reservar Cita
               </a>
             </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
