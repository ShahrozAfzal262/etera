import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { Bottle } from './Visuals'
import Pic from './Pic'
import './Collection.css'

function Card({ p, i, onAdd }) {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-.5, .5], [10, -10]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [-.5, .5], [-10, 10]), { stiffness: 150, damping: 15 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - .5); my.set((e.clientY - r.top) / r.height - .5)
  }
  return (
    <motion.article id={`p-${p.id}`} className="card" style={{ '--tone': p.tone, rotateX: rx, rotateY: ry }}
      onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0) }}
      initial={{ opacity: 0, y: 80, scale: .92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .9, delay: (i % 4) * .1, ease: [.22, 1, .36, 1] }}>
      <div className="card__art"><Pic src={p.src} alt={p.name} fallback={<Bottle liquid={p.liquid} label={p.name.toUpperCase()} />} /></div>
      <div className="card__info">
        <h3>{p.name}</h3>
        <p>{p.notes}</p>
        <div className="card__row">
          <span>${p.price} · {p.size}</span>
          <button className="btn btn--sm" onClick={() => onAdd(p)}>Add to bag</button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Collection({ onAdd }) {
  return (
    <section className="section collection" id="collection">
      <div className="collection__head">
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      </div>
      <div className="grid">{PRODUCTS.map((p, i) => <Card key={p.id} p={p} i={i} onAdd={onAdd} />)}</div>
    </section>
  )
}
