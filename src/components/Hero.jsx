import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SCENES } from './Visuals'
import Pic from './Pic'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]
const rise = (d = 0) => ({ initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 1.1, delay: d, ease } })

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const scene = SCENES[i]

  // mouse parallax
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sp = { stiffness: 60, damping: 14 }
  const px = useSpring(useTransform(mx, [-.5, .5], [-30, 30]), sp)
  const py = useSpring(useTransform(my, [-.5, .5], [-24, 24]), sp)
  const ry = useSpring(useTransform(mx, [-.5, .5], [-12, 12]), sp)
  const rx = useSpring(useTransform(my, [-.5, .5], [10, -10]), sp)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((n) => (n + 1) % SCENES.length), 5500)
    return () => clearTimeout(t)
  }, [i, paused])

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - .5)
    my.set((e.clientY - r.top) / r.height - .5)
  }

  return (
    <section className="hero" id="top">
      <motion.div className="hero__glow" animate={{ background: `radial-gradient(circle at 55% 50%, ${scene.glow}55, transparent 62%)` }} transition={{ duration: 1.4 }} />

      <div className="hero__copy">
        <motion.h1 {...rise(.2)}>Lorem ipsum dolor sit amet.</motion.h1>
        <motion.p {...rise(.4)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</motion.p>
        <motion.a {...rise(.6)} href="#collection" className="btn" onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo('#collection') }}>
          Shop now <span aria-hidden>→</span>
        </motion.a>
      </div>

      <div className="hero__stage" onMouseMove={move} onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0) }}>
        <motion.div className="hero__tilt" style={{ x: px, y: py, rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
          <motion.div className="hero__float" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <AnimatePresence mode="wait">
              <motion.div key={scene.key} className="hero__circle"
                initial={{ opacity: 0, scale: .6, rotate: -60, clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: 'circle(50% at 50% 50%)' }}
                exit={{ opacity: 0, scale: .85, rotate: 40, clipPath: 'circle(0% at 50% 50%)' }}
                transition={{ duration: 1.1, ease }}>
                <motion.div className="hero__zoom" initial={{ scale: 1.45 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }}>
                  <Pic src={scene.src} alt={scene.name} fallback={<scene.Art />} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <aside className="hero__rail" aria-hidden>
        <span className="rail__label">{scene.name}</span>
        <span className="rail__num">0{i + 1}</span>
        <span className="rail__label rail__label--dim">Scene</span>
      </aside>

      <div className="hero__bars" role="tablist" aria-label="Hero scenes">
        {SCENES.map((s, n) => (
          <button key={s.key} role="tab" aria-selected={n === i} aria-label={s.name} onClick={() => setI(n)} className="bar">
            {n === i && !paused && <motion.i key={`p${i}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.5, ease: 'linear' }} />}
            {n === i && paused && <i style={{ transform: 'scaleX(1)' }} />}
          </button>
        ))}
      </div>
    </section>
  )
}