'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  const pathname = usePathname()
  
  // Hide from admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  const phoneNumber = '+34638263358'
  const message = 'Hola estoy interesado en tus productos'
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:shadow-[0_20px_40px_rgba(37,211,102,0.6)]"
      title="Chat with us on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <img 
        src="/image.png"
        alt="WhatsApp"
        className="w-6 h-6 md:w-7 md:h-7 object-contain" 
      />
    </motion.a>
  )
}
