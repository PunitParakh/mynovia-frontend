import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'My Novia — Tu Boutique Nupcial en Almería',
  description: 'Descubre vestidos de novia únicos en My Novia. Tu boutique favorita en Almería con colecciones exclusivas para tu día especial.',
  keywords: 'vestidos de novia, nupcial, Almería, boutique, boda, novia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#FAF9F6]">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
