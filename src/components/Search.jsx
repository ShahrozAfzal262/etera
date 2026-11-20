import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { Bottle } from './Visuals'
import Pic from './Pic'
import './Search.css'

export default function Search({ open, onClose, onAdd }) {
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? PRODUCTS.filter((p) => (p.name + ' ' + p.notes).toLowerCase().includes(s)) : PRODUCTS
  }, [q])

  useEffect(() => {
    if (!open) return
    setQ('')
    setTimeout(() => ref.current?.focus(), 300)
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])

  const show = (id) => {
    onClose()
    setTimeout(() => {
      const el = document.getElementById(`p-${id}`)
      el && window.__lenis?.scrollTo(el, { offset: -120 })
      el?.classList.add('flash')
      setTimeout(() => el?.classList.remove('flash'), 1800)
    }, 500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="search" role="dialog" aria-label="Search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="search__close" onClick={onClose} aria-label="Close search">✕</button>
          <motion.div className="search__box" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ETERA perfumes..." aria-label="Search perfumes"
              onKeyDown={(e) => e.key === 'Enter' && hits[0] && show(hits[0].id)} />
            <ul>
              <AnimatePresence>
                {hits.map((p) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} whileHover={{ x: 8 }}
                    style={{ '--tone': p.tone }}>
                    <button className="hit" onClick={() => show(p.id)}>
                      <span className="hit__img"><Pic src={p.src} alt={p.name} fallback={<Bottle liquid={p.liquid} label="" />} /></span>
                      <span><strong>{p.name}</strong><small>{p.notes}</small></span>
                    </button>
                    <button className="btn btn--sm" onClick={() => { onAdd(p); onClose() }}>Add · ${p.price}</button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {!hits.length && <p className="search__empty">"{q}" naam ka koi perfume nahi mila. Aurelia, Rosea, Sylva ya Nocte try karo.</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
