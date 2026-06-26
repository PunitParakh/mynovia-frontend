import Link from 'next/link'
import AccessoryCategoryCollection from '@/components/catalog/AccessoryCategoryCollection'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API}/accessories/${params.slug}`)
    if (res.ok) {
        const acc = await res.json()
        return {
          title: `${acc.name} — My Novia`,
          description: acc.description || `Discover ${acc.name} at My Novia. Exclusive accessories in Almería.`
        }
    }
  } catch {}
  
  try {
     const catRes = await fetch(`${API}/categories?type=accessory`)
     if (catRes.ok) {
       const cats = await catRes.json()
       const cat = cats.find(c => c.slug === params.slug)
       if (cat) {
         return {
           title: `Accesorios ${cat.name} | My Novia`,
           description: `Explora nuestra colección de accesorios ${cat.name}.`
         }
       }
     }
  } catch {}

  return { title: 'Accesorio — My Novia' }
}

async function getAccessory(slug) {
  try {
    const res = await fetch(`${API}/accessories/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getCategory(slug) {
  try {
    const res = await fetch(`${API}/categories?type=accessory`, { cache: 'no-store' })
    if (!res.ok) return null
    const cats = await res.json()
    return cats.find(c => c.slug === slug)
  } catch {
    return null
  }
}

export default async function AccessoryDetailPage({ params }) {
  const acc = await getAccessory(params.slug)

  if (!acc) {
    const category = await getCategory(params.slug)
    if (category) {
      return (
        <AccessoryCategoryCollection 
          categorySlug={category.slug}
          categoryName={category.name}
          coverImage={category.image_url || "https://images.unsplash.com/photo-1549416878-b9ca95e28ce4?w=800&q=80"}
          description={category.description || `Explora nuestra última colección de accesorios ${category.name}.`}
        />
      )
    }
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="section-heading mb-4">Accesorio o categoría no encontrado</h1>
        <Link href="/accessories" className="btn-gold">Ver Colección</Link>
      </div>
    )
  }

  const images = (acc.accessory_images || []).sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/accessories" className="inline-flex items-center gap-2 text-sm text-body-gray hover:text-gold transition-colors font-sans mb-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Volver a accesorios
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {images.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-cream">
                <img
                  src={images[0].image_url}
                  alt={acc.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(1).map(img => (
                    <div key={img.id} className="aspect-[3/4] overflow-hidden bg-cream cursor-pointer hover:opacity-80 transition-opacity">
                      <img src={img.image_url} alt={acc.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[3/4] bg-cream flex items-center justify-center">
              <p className="text-body-gray font-sans text-sm">Sin imagen</p>
            </div>
          )}
        </div>

        <div className="lg:py-8">
          <h1 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">{acc.name}</h1>

          {acc.description && (
            <p className="font-body text-body-gray leading-relaxed mb-8">{acc.description}</p>
          )}

          <div className="space-y-4 mb-10 p-6 bg-cream/50 border border-bar-tan/30">
            <div className="flex justify-between items-center py-2 border-b border-bar-tan/20">
              <span className="text-sm font-sans text-body-gray">Precio</span>
              <span className="text-lg font-display text-charcoal">
                {acc.price ? `${acc.price}€` : 'Consultar precio'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-bar-tan/20">
              <span className="text-sm font-sans text-body-gray">Disponibilidad</span>
              <span className={`text-sm font-sans font-medium ${acc.is_available ? 'text-green-700' : 'text-gold'}`}>
                {acc.is_available ? 'En stock' : 'Disponible bajo pedido'}
              </span>
            </div>
          </div>

          <Link href="/book-appointment" className="btn-gold-filled w-full text-center block">
            RESERVAR CITA
          </Link>

          <p className="text-xs text-body-gray font-sans mt-4 text-center">
            Visítanos para ver nuestros accesorios con atención personalizada
          </p>
        </div>
      </div>
    </div>
  )
}
