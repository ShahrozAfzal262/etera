import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Philosophy.css'

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci odit molestias officiis, hic voluptates ducimus debitis nobis at tenetur est possimus.'.split(' ')

function Word({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0.15, 1])
  return <motion.span style={{ opacity: o }}>{w} </motion.span>
}

export default function Philosophy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  return (
    <section className="section philosophy" id="philosophy" ref={ref}>
      <p className="philosophy__text">
        {TEXT.map((w, i) => <Word key={i} w={w} p={scrollYProgress} a={i / TEXT.length} b={(i + 1) / TEXT.length} />)}
      </p>
      <div className="stats">
        {[['100%', 'Lorem ipsum dolor'], ['300', 'Sit amet elit'], ['12 wks', 'Consectetur adipiscing']].map(([n, l]) => (
          <motion.div key={l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <strong>{n}</strong><span>{l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
