import { useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Notes from './components/Notes'
import Collection from './components/Collection'
import Philosophy from './components/Philosophy'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Search from './components/Search'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    window.__lenis = lenis
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  useEffect(() => {
    const lock = cartOpen || searchOpen
    document.body.style.overflow = lock ? 'hidden' : ''
    lock ? window.__lenis?.stop() : window.__lenis?.start()
  }, [cartOpen, searchOpen])

  const add = useCallback((p) => {
    setCart((c) => {
      const f = c.find((i) => i.id === p.id)
      return f ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...p, qty: 1 }]
    })
    setCartOpen(true)
  }, [])
  const change = (id, d) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))

  return (
    <>
      <Navbar count={cart.reduce((n, i) => n + i.qty, 0)} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main>
        <Hero />
        <Notes />
        <Collection onAdd={add} />
        <Philosophy />
      </main>
      <Footer />
      <Search open={searchOpen} onClose={closeSearch} onAdd={add} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onChange={change} />
    </>
  )
}
