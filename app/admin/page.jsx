'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getMe } from '@/lib/api'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe().then(setUser).catch(() => {})
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-charcoal mb-2">
          Bienvenido/a de nuevo, {user?.name || 'Admin'}
        </h1>
        <p className="text-body-gray font-sans">
          Este es tu centro de control de My Novia. Gestiona tus colecciones, contenido e interacciones con clientes desde aquí.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <DashboardCard
          title="Vestidos"
          desc="Gestiona tu colección de vestidos de novia"
          link="/admin/vestidos"
          icon="👗"
        />
        <DashboardCard
          title="Accesorios"
          desc="Gestiona velos, tiaras y otros accesorios"
          link="/admin/accesorios"
          icon="💍"
        />
        <DashboardCard
          title="Contenido"
          desc="Actualiza el texto del sitio e imágenes hero"
          link="/admin/contenido"
          icon="📝"
        />
        <DashboardCard
          title="Reseñas"
          desc="Gestiona las reseñas de Google Maps"
          link="/admin/resenas"
          icon="⭐"
        />
        <DashboardCard
          title="Mensajes"
          desc="Ver los envíos del formulario de contacto"
          link="/admin/mensajes"
          icon="📬"
        />
        <DashboardCard
          title="Galería"
          desc="Subir y gestionar los medios del sitio"
          link="/admin/media"
          icon="🖼️"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, desc, link, icon }) {
  return (
    <Link href={link} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group flex flex-col gap-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-sans font-semibold text-charcoal group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-sm font-sans text-body-gray mt-1">{desc}</p>
      </div>
    </Link>
  )
}
