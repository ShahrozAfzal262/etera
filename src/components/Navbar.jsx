import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Navbar.css'
const LINKS = ['notes', 'collection', 'philosophy']
const go = (id) => (e) => {
  e.preventDefault()
  const el = document.getElementById(id)
  el && (window.__lenis ? window.__lenis.scrollTo(el, { offset: -60 }) : el.scrollIntoView({ behavior: 'smooth' }))
}

export default function Navbar({ count, onCart, onSearch }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    LINKS.forEach((l) => document.getElementById(l) && io.observe(document.getElementById(l)))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const pick = (id) => (e) => { setOpen(false); setTimeout(() => go(id)(e), 350); e.preventDefault() }

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo(0) }}>ÉTERA</a>
      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l} href={`#${l}`} onClick={go(l)} className={active === l ? 'is-active' : ''}>{l}</a>
        ))}
      </nav>
      <div className="nav__icons">
        <button aria-label="Search" onClick={onSearch}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg></button>
        <button aria-label="Account" className="hide-sm"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4.5 4-6 8-6s7 1.5 8 6" /></svg></button>
        <button aria-label="Open bag" onClick={onCart} className="bag">
          <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          {count > 0 && <span>{count}</span>}
        </button>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i className={open ? 'x' : ''} /><i className={open ? 'x' : ''} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            {LINKS.map((l, i) => (
              <motion.a key={l} href={`#${l}`} onClick={pick(l)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.08 }}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
