'use client'
import { useState, useEffect } from 'react'
import ColorPicker from '@/components/admin/ColorPicker'
import { adminGetStyles, adminCreateStyle, adminDeleteStyle,
         adminGetSizes, adminCreateSize, adminDeleteSize,
         adminGetColors, adminCreateColor, adminDeleteColor } from '@/lib/api'

export default function AttributesPage() {
  const [styles, setStyles] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [loading, setLoading] = useState(true)

  const [newStyle, setNewStyle] = useState('')
  const [newSize, setNewSize] = useState('')
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#FF6B9D')
  
  // Selection states
  const [selectedStyles, setSelectedStyles] = useState(new Set())
  const [selectedSizes, setSelectedSizes] = useState(new Set())
  const [selectedColors, setSelectedColors] = useState(new Set())

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [st, si, co] = await Promise.all([
        adminGetStyles(), adminGetSizes(), adminGetColors()
      ])
      setStyles(st || [])
      setSizes(si || [])
      setColors(co || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  // --- Styles ---
  async function handleAddStyle(e) {
    e.preventDefault()
    if (!newStyle.trim()) return
    try {
      await adminCreateStyle({ name: newStyle })
      setNewStyle('')
      loadAll()
    } catch (err) { alert('Error al añadir el estilo') }
  }
  async function handleDeleteStyle(id) {
    if (!confirm('¿Eliminar este estilo?')) return
    try { await adminDeleteStyle(id); loadAll() }
    catch (err) { alert('Error al eliminar el estilo') }
  }

  // --- Sizes ---
  async function handleAddSize(e) {
    e.preventDefault()
    if (!newSize.trim()) return
    try {
      await adminCreateSize({ name: newSize, display_order: sizes.length })
      setNewSize('')
      loadAll()
    } catch (err) { alert('Error al añadir la talla') }
  }
  async function handleDeleteSize(id) {
    if (!confirm('¿Eliminar esta talla?')) return
    try { await adminDeleteSize(id); loadAll() }
    catch (err) { alert('Error al eliminar la talla') }
  }

  // --- Colors ---
  async function handleAddColor(e) {
    e.preventDefault()
    if (!newColorName.trim()) return
    try {
      await adminCreateColor({ name: newColorName, hex_code: newColorHex })
      setNewColorName('')
      loadAll()
    } catch (err) { alert('Error al añadir el color') }
  }
  async function handleDeleteColor(id) {
    if (!confirm('¿Eliminar este color?')) return
    try { await adminDeleteColor(id); loadAll() }
    catch (err) { alert('Error al eliminar el color') }
  }

  // --- Selection & Bulk Delete Handlers ---
  const toggleStyleSelection = (id) => {
    const newSet = new Set(selectedStyles)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedStyles(newSet)
  }

  const toggleAllStyles = () => {
    if (selectedStyles.size === styles.length) setSelectedStyles(new Set())
    else setSelectedStyles(new Set(styles.map(s => s.id)))
  }

  const deleteSelectedStyles = async () => {
    if (selectedStyles.size === 0) return
    if (!confirm(`¿Eliminar ${selectedStyles.size} estilo(s) seleccionado(s)?`)) return
    try {
      for (const id of selectedStyles) {
        await adminDeleteStyle(id)
      }
      setSelectedStyles(new Set())
      loadAll()
    } catch (err) { alert('Error al eliminar estilos') }
  }

  const toggleSizeSelection = (id) => {
    const newSet = new Set(selectedSizes)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedSizes(newSet)
  }

  const toggleAllSizes = () => {
    if (selectedSizes.size === sizes.length) setSelectedSizes(new Set())
    else setSelectedSizes(new Set(sizes.map(s => s.id)))
  }

  const deleteSelectedSizes = async () => {
    if (selectedSizes.size === 0) return
    if (!confirm(`¿Eliminar ${selectedSizes.size} talla(s) seleccionada(s)?`)) return
    try {
      for (const id of selectedSizes) {
        await adminDeleteSize(id)
      }
      setSelectedSizes(new Set())
      loadAll()
    } catch (err) { alert('Error al eliminar tallas') }
  }

  const toggleColorSelection = (id) => {
    const newSet = new Set(selectedColors)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedColors(newSet)
  }

  const toggleAllColors = () => {
    if (selectedColors.size === colors.length) setSelectedColors(new Set())
    else setSelectedColors(new Set(colors.map(c => c.id)))
  }

  const deleteSelectedColors = async () => {
    if (selectedColors.size === 0) return
    if (!confirm(`¿Eliminar ${selectedColors.size} color(es) seleccionado(s)?`)) return
    try {
      for (const id of selectedColors) {
        await adminDeleteColor(id)
      }
      setSelectedColors(new Set())
      loadAll()
    } catch (err) { alert('Error al eliminar colores') }
  }

  if (loading) return <div className="p-8 text-center text-body-gray">Cargando atributos...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading text-charcoal">Atributos</h1>
          <p className="text-body-gray text-sm font-sans mt-1">Gestiona estilos, tallas y colores para las variantes de vestidos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* STYLES */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-heading text-charcoal mb-4">Estilos de Vestidos</h2>
          <form onSubmit={handleAddStyle} className="flex gap-2 mb-6">
            <input type="text" value={newStyle} onChange={e => setNewStyle(e.target.value)} placeholder="e.g. A-Line" className="flex-1 px-3 py-2 border border-gray-200 text-sm font-sans focus:outline-none focus:border-gold" />
            <button type="submit" className="px-4 py-2 bg-charcoal text-white text-xs font-sans hover:bg-gold transition-colors">Añadir</button>
          </form>

          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleAllStyles}
              className="px-3 py-2 text-xs font-sans rounded border bg-gold text-white border-gold hover:bg-charcoal transition-colors"
            >
              Seleccionar Todo
            </button>
            {selectedStyles.size > 0 && (
              <button
                onClick={deleteSelectedStyles}
                className="px-3 py-2 text-xs font-sans rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar ({selectedStyles.size})
              </button>
            )}
          </div>
          
          <ul className="space-y-2">
            {styles.map(s => (
              <li key={s.id} className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-gray-100 rounded hover:border-gold transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedStyles.has(s.id)}
                  onChange={() => toggleStyleSelection(s.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-charcoal flex-1">{s.name}</span>
                <button onClick={() => handleDeleteStyle(s.id)} className="text-red-500 hover:text-red-700 text-sm">×</button>
              </li>
            ))}
            {styles.length === 0 && <p className="text-xs text-body-gray italic">No hay estilos añadidos.</p>}
          </ul>
        </div>

        {/* SIZES */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-heading text-charcoal mb-4">Tallas</h2>
          <form onSubmit={handleAddSize} className="flex gap-2 mb-6">
            <input type="text" value={newSize} onChange={e => setNewSize(e.target.value)} placeholder="e.g. Medium or 10" className="flex-1 px-3 py-2 border border-gray-200 text-sm font-sans focus:outline-none focus:border-gold" />
            <button type="submit" className="px-4 py-2 bg-charcoal text-white text-xs font-sans hover:bg-gold transition-colors">Añadir</button>
          </form>

          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleAllSizes}
              className="px-3 py-2 text-xs font-sans rounded border bg-gold text-white border-gold hover:bg-charcoal transition-colors"
            >
              Seleccionar Todo
            </button>
            {selectedSizes.size > 0 && (
              <button
                onClick={deleteSelectedSizes}
                className="px-3 py-2 text-xs font-sans rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar ({selectedSizes.size})
              </button>
            )}
          </div>
          
          <ul className="space-y-2">
            {sizes.map(s => (
              <li key={s.id} className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-gray-100 rounded hover:border-gold transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedSizes.has(s.id)}
                  onChange={() => toggleSizeSelection(s.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-charcoal flex-1">{s.name}</span>
                <button onClick={() => handleDeleteSize(s.id)} className="text-red-500 hover:text-red-700 text-sm">×</button>
              </li>
            ))}
            {sizes.length === 0 && <p className="text-xs text-body-gray italic">No hay tallas añadidas.</p>}
          </ul>
        </div>

        {/* COLORS */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-heading text-charcoal mb-4">Colores</h2>
          
          <form onSubmit={handleAddColor} className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              value={newColorName}
              onChange={e => setNewColorName(e.target.value)}
              placeholder="e.g. Ivory"
              className="px-3 py-2 border border-gray-200 text-sm font-sans rounded focus:outline-none focus:border-gold"
            />
            
            <ColorPicker 
              color={newColorHex}
              onChange={(hex) => setNewColorHex(hex)}
            />
            
            <button
              type="submit"
              className="px-4 py-2 bg-charcoal text-white text-xs font-sans hover:bg-gold transition-colors w-full rounded"
            >
              Añadir Color
            </button>
          </form>
          
          <div className="flex gap-2 mb-4">
            <button 
              onClick={toggleAllColors}
              className="px-3 py-2 text-xs font-sans rounded border bg-gold text-white border-gold hover:bg-charcoal transition-colors"
            >
              Seleccionar Todo
            </button>
            {selectedColors.size > 0 && (
              <button
                onClick={deleteSelectedColors}
                className="px-3 py-2 text-xs font-sans rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar ({selectedColors.size})
              </button>
            )}
          </div>
          
          <ul className="space-y-2">
            {colors.map(c => (
              <li key={c.id} className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-gray-100 rounded hover:border-gold transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedColors.has(c.id)}
                  onChange={() => toggleColorSelection(c.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: c.hex_code }}></div>
                  <span className="text-sm font-sans text-charcoal">{c.name}</span>
                </div>
                <button onClick={() => handleDeleteColor(c.id)} className="text-red-500 hover:text-red-700 text-sm">×</button>
              </li>
            ))}
            {colors.length === 0 && <p className="text-xs text-body-gray italic">No hay colores añadidos.</p>}
          </ul>
        </div>

      </div>
    </div>
  )
}
