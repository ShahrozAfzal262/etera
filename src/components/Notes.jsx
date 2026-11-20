import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bloom, Amber, Bottle } from './Visuals'
import Pic from './Pic'
import './Notes.css'

const ease = [0.22, 1, 0.36, 1]

const NOTES = [
  { tier: 'Top', title: 'Lorem Ipsum Dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', src: '/images/notes/top.png', Art: Bloom },
  { tier: 'Heart', title: 'Consectetur Elit', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.', src: '/images/notes/heart.png', Art: Amber },
  { tier: 'Base', title: 'Sed Do Eiusmod', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.', src: '/images/notes/base.png', Art: Bottle },
]

const OPEN = 'circle(75% at 50% 50%)'
const SHUT = 'circle(0% at 50% 50%)'

export default function Notes() {
  const [a, setA] = useState(0)

  return (
    <section className="section notes" id="notes">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9 }}>
        Lorem ipsum dolor sit amet.
      </motion.h2>

      <div className="notes__grid">
        <ul className="notes__list">
          {NOTES.map((n, i) => (
            <li key={n.tier}>
              <button onClick={() => setA(i)} onMouseEnter={() => setA(i)} aria-expanded={a === i} className={a === i ? 'is-on' : ''}>
                <small>{n.tier}</small>
                <span>{n.title}</span>
              </button>
              <AnimatePresence initial={false}>
                {a === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }}>
                    {n.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* teeno pics ek upar ek, active wali circle ki tarah khulti hai */}
        <div className="notes__art">
          {NOTES.map((n, i) => {
            const on = a === i
            return (
              <motion.div key={n.src} className="notes__img"
                style={{ zIndex: on ? 2 : 1 }}
                initial={false}
                animate={{ clipPath: on ? OPEN : SHUT }}
                transition={{ duration: 0.9, ease, delay: on ? 0 : 0.9 }}>
                <motion.div className="notes__zoom"
                  animate={{ scale: on ? 1 : 1.35 }}
                  transition={on ? { duration: 1.4, ease } : { duration: 0, delay: 0.9 }}>
                  <Pic src={n.src} alt={n.title} fallback={<n.Art />} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}