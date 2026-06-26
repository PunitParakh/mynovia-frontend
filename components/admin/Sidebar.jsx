'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Panel de Control', icon: '📊' },
  { href: '/admin/vestidos', label: 'Vestidos', icon: '👗' },
  { href: '/admin/accesorios', label: 'Accesorios', icon: '💍' },
  { href: '/admin/categorias', label: 'Categorías', icon: '📂' },
  { href: '/admin/atributos', label: 'Atributos', icon: '🎨' },
  { href: '/admin/contenido', label: 'Contenido', icon: '📝' },
  { href: '/admin/resenas', label: 'Reseñas', icon: '⭐' },
  { href: '/admin/mensajes', label: 'Mensajes de Contacto', icon: '📬' },
  { href: '/admin/media', label: 'Galería', icon: '🖼️' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-charcoal text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <h2 className="font-heading text-xl tracking-[3px] uppercase">My Novia</h2>
          <span className="text-[10px] font-sans tracking-widest text-white/40 uppercase">Administrador</span>
        </Link>
      </div>

      <nav className="flex-1 py-4">
        {links.map(link => {
          const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-sans transition-colors ${
                active ? 'bg-white/10 text-gold border-r-2 border-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <Link href="/" className="text-xs font-sans text-white/40 hover:text-white transition-colors">
          ← Ver sitio web
        </Link>
      </div>
    </aside>
  )
}
