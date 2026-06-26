'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fetchAccessories, fetchCategories, getPageHero, fetchSections } from '@/lib/api'

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState([])
  const [categories, setCategories] = useState([])


  
  // Default descriptions for categories
  const categoryDescriptions = {
    'combs': 'Elegantes accesorios para el cabello para completar tu look nupcial.',
    'tiaras': 'Impresionantes tiaras y tocados para tu día especial.',
    'belt': 'Hermosos cinturones y fajas para definir tu silueta.',
    'veils': 'Exquisitos velos en diferentes longitudes y estilos.',
    'shoes': 'Calzado nupcial cómodo y elegante.',
    'suspenders': 'Ligas y accesorios decorativos para piernas.'
  }
  
  useEffect(() => {
    // Load data
    fetchAccessories().then(data => {
      setAccessories(data || [])
    }).catch(() => setAccessories([]))
    Promise.all([
      fetchCategories('accessory').catch(() => []),
      fetchSections().catch(() => [])
    ]).then(([catsData, sectionsData]) => {
      const orderSection = sectionsData?.find(s => s.section_name === 'categories_order')
      const currentOrder = orderSection?.content?.accessory || []

      if (catsData && Array.isArray(catsData)) {
        let enrichedCategories = catsData
          .map(cat => ({
            ...cat,
            title: cat.name,
            description: categoryDescriptions[cat.slug] || cat.description || `Discover our exclusive ${cat.name} collection.`
          }))
          
        if (currentOrder.length > 0) {
          enrichedCategories.sort((a, b) => {
            const idxA = currentOrder.indexOf(a.slug)
            const idxB = currentOrder.indexOf(b.slug)
            if (idxA === -1 && idxB === -1) return 0
            if (idxA === -1) return 1
            if (idxB === -1) return -1
            return idxA - idxB
          })
        }
        setCategories(enrichedCategories)
      }
    }).catch(() => setCategories([]))
  }, [])

  // Use fetched categories, fallback to empty array
  const categoriesData = categories.length > 0 ? categories : []

  const filteredAccessories = accessories

  return (
    <div className="bg-[#FAF9F6] min-h-screen overflow-hidden">
      {/* Main Content Area */}
      <div id="collections" className="bg-[#FAF9F6] relative z-20">
        
        {/* Categories Grid Header */}
        <section className="pt-12 pb-12 px-6 md:px-12 max-w-[1800px] mx-auto text-center border-b border-[#E5E5E5]">
          <h2 className="font-heading text-4xl lg:text-5xl text-[#333] mb-4 font-light">Comprar por Categoría</h2>
          <p className="font-body text-[#7a7a7a] text-sm max-w-xl mx-auto mb-8">
            Explora nuestras colecciones de accesorios exquisitos para complementar tu look nupcial.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map(cat => (
              <Link key={cat.slug} href={`/accessories/${cat.slug}`} className="group block text-left">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe8e3] mb-4 group-hover:shadow-lg transition-shadow duration-500">
                  <img
                    src={cat.image_url || cat.image || '/images/cat_accessories.png'}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-2xl text-[#333] font-light mb-1 group-hover:text-gold transition-colors">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Specific Sections */}

        {categoriesData.map((cat, index) => {
          const catAccessories = accessories.filter(a => a.categories?.slug === cat.slug || false)
          const isEven = index % 2 === 0
          
          return (
            <section key={cat.slug} className={`py-20 md:py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-[#E5E5E5] last:border-0 ${!isEven ? 'bg-white' : ''}`}>
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-12 lg:gap-24`}>
                
                {/* Category Cover */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full lg:w-5/12 flex-shrink-0"
                >
                  <div className="sticky top-32">
                    <Link href={`/accessories/${cat.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe8e3] group-hover:shadow-xl transition-shadow duration-700">
                        <img 
                          src={cat.image_url || cat.image || '/images/cat_accessories.png'} 
                          alt={cat.title} 
                          className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/30">
                          <span className="border border-white px-8 py-3 text-[11px] font-sans tracking-[3px] uppercase">
                            Ver Categoría
                          </span>
                        </div>
                      </div>
                    </Link>
                    <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="mt-8 text-center lg:text-left"
                    >
                      <h2 className="font-heading text-4xl lg:text-5xl text-[#333] mb-4 font-light">{cat.title}</h2>
                      <p className="font-body text-[#7a7a7a] text-sm leading-relaxed max-w-md mx-auto lg:mx-0 pr-6">
                        {cat.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Horizontal Accessory Slider */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="w-full lg:w-7/12 overflow-hidden flex flex-col justify-center"
                >
                  {catAccessories.length > 0 ? (
                    <motion.div 
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.15 } }
                      }}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-10%" }}
                      className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {catAccessories.slice(0, 6).map((accessory, i) => {
                        const imgUrl = accessory.accessory_images?.sort((a,b)=>a.display_order-b.display_order)?.[0]?.image_url || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80';
                        return (
                          <motion.div 
                            variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                            key={accessory.id} 
                            className="w-[85%] md:w-[320px] lg:w-[350px] flex-shrink-0 snap-center group block"
                          >
                            <Link href={`/accessories/${accessory.slug}`}>
                              <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe8e3] mb-5 group-hover:shadow-md transition-shadow">
                                <img src={imgUrl} alt={accessory.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                              </div>
                              <h3 className="font-heading text-2xl text-[#333] group-hover:text-[#f05f42] transition-colors font-light mb-1 truncate">{accessory.name}</h3>
                            </Link>
                          </motion.div>
                      )})}
                      {catAccessories.length > 6 && (
                        <div className="w-[85%] md:w-[320px] lg:w-[350px] flex-shrink-0 snap-center flex items-center justify-center bg-transparent border border-[#E5E5E5] group">
                          <Link href={`/accessories/${cat.slug}`} className="flex flex-col items-center gap-3 text-[#333] group-hover:text-[#f05f42] transition-colors p-12">
                            <span className="font-heading text-xl font-light">Ver todos {catAccessories.length}</span>
                            <span className="text-[10px] font-sans tracking-[2px] uppercase border-b border-currentColor pb-1">Ver Categoría</span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[400px] flex items-center justify-center border border-[#E5E5E5] bg-white">
                      <div className="text-center p-8">
                        <p className="font-heading text-2xl text-[#333] mb-2">Próximamente</p>
                        <p className="font-body text-[#7a7a7a] text-sm">Actualmente estamos actualizando nuestra colección de {cat.title}.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
                
              </div>
            </section>
          )
        })}

        {/* All Accessories Section */}
        <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-[#FAF9F6] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-6xl text-[#333] mb-4 font-light text-center">Todos Nuestros Accesorios</h2>
            <p className="font-body text-[#7a7a7a] text-sm leading-relaxed text-center max-w-2xl mx-auto">
              Explora nuestra colección completa de accesorios nupciales para completar tu look perfecto
            </p>
          </motion.div>
          {filteredAccessories.length > 0 ? (
            <motion.div 
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredAccessories.map((accessory) => {
                const imgUrl = accessory.accessory_images?.sort((a,b)=>a.display_order-b.display_order)?.[0]?.image_url || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80';
                const categoryName = accessory.categories?.name || 'Accessory';
                return (
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                    key={accessory.id}
                    className="group"
                  >
                    <Link href={`/accessories/${accessory.slug}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe8e3] mb-5 group-hover:shadow-lg transition-shadow duration-500">
                        <img 
                          src={imgUrl} 
                          alt={accessory.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                      </div>
                      <h3 className="font-heading text-lg text-[#333] group-hover:text-[#f05f42] transition-colors font-light mb-2 line-clamp-2">{accessory.name}</h3>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="h-64 flex items-center justify-center border border-[#E5E5E5] bg-white rounded-lg">
              <div className="text-center">
                <p className="font-heading text-2xl text-[#333] mb-2">No se Encontraron Accesorios</p>
                <p className="font-body text-[#7a7a7a] text-sm">Ningún accesorio coincide con el estilo seleccionado. Prueba con otro filtro.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
