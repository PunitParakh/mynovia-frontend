import Link from 'next/link'
import CategoryCollection from '@/components/catalog/CategoryCollection'
import DressImageGallery from '@/components/catalog/DressImageGallery'
import DressVariantSelector from '@/components/catalog/DressVariantSelector'
import BackButton from '@/components/catalog/BackButton'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API}/dresses/${params.slug}`)
    if (res.ok) {
      const dress = await res.json()
      return {
        title: `${dress.name} — My Novia`,
        description: dress.description || `Discover ${dress.name} at My Novia. Exclusive wedding dress in Almería.`
      }
    }
  } catch {}
  
  try {
     const catRes = await fetch(`${API}/categories?type=dress`)
     if (catRes.ok) {
       const cats = await catRes.json()
       const cat = cats.find(c => c.slug === params.slug)
       if (cat) {
         return {
           title: `Vestidos ${cat.name} | My Novia`,
           description: `Explora nuestra colección de vestidos ${cat.name}.`
         }
       }
     }
  } catch {}

  return { title: 'Vestido — My Novia' }
}

async function getDress(slug) {
  try {
    const res = await fetch(`${API}/dresses/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getCategory(slug) {
  try {
    const res = await fetch(`${API}/categories?type=dress`, { cache: 'no-store' })
    if (!res.ok) return null
    const cats = await res.json()
    return cats.find(c => c.slug === slug)
  } catch {
    return null
  }
}

export default async function DressDetailPage({ params }) {
  const dress = await getDress(params.slug)
  
  if (!dress) {
    const category = await getCategory(params.slug)
    if (category) {
      return (
        <CategoryCollection 
          categorySlug={category.slug}
          categoryName={category.name}
          coverImage={category.image_url || "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&q=80"}
          description={category.description || `Explora nuestra última colección de vestidos ${category.name}.`}
        />
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="section-heading mb-4">Vestido o categoría no encontrado</h1>
        <Link href="/dresses" className="btn-gold">Ver Colección</Link>
      </div>
    )
  }

  const images = (dress.dress_images || []).sort((a, b) => a.display_order - b.display_order)
  const tags = (dress.dress_tags || []).map(dt => dt.tags).filter(Boolean)
  const variants = dress.dress_variants || []

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image Gallery */}
        <div className="pr-2 lg:pr-4 shrink-0 max-w-[600px] mx-auto w-full">
          <DressImageGallery images={images} dressName={dress.name} />
        </div>

        <div className="lg:py-8 w-full">
          {dress.categories && (
            <span className="section-eyebrow block mb-3">{dress.categories.name}</span>
          )}
          <h1 className="font-display text-4xl lg:text-5xl text-charcoal mb-6" style={{ fontVariantNumeric: 'lining-nums' }}>{dress.name}</h1>

          {dress.description && (
            <p className="font-body text-body-gray leading-relaxed mb-8">{dress.description}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(tag => (
                <span key={tag.slug || tag.name || tag.id} className="text-[10px] uppercase font-sans tracking-widest px-3 py-1 border border-bar-tan text-charcoal bg-[#FAF9F6]">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <DressVariantSelector dress={dress} variants={variants} />

          <Link href="/book-appointment" className="btn-gold-filled w-full text-center block">
             RESERVAR CITA
          </Link>

          <p className="text-xs text-body-gray font-sans mt-4 text-center">
            Visítanos para probarte este vestido con atención personalizada
          </p>
        </div>
      </div>
    </div>
  )
}
