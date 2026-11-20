import { AnimatePresence, motion } from 'framer-motion'
import './CartDrawer.css'
export default function CartDrawer({ open, items, onClose, onChange }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="drawer" role="dialog" aria-label="Shopping bag" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <header><h3>Your bag</h3><button onClick={onClose} aria-label="Close bag">✕</button></header>
            {items.length === 0 ? <p className="empty">Your bag is empty. Add a fragrance from the collection.</p> : (
              <ul>
                {items.map((i) => (
                  <li key={i.id}>
                    <div><strong>{i.name}</strong><small>{i.size} · ${i.price}</small></div>
                    <div className="qty">
                      <button onClick={() => onChange(i.id, -1)} aria-label={`Remove one ${i.name}`}>−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => onChange(i.id, 1)} aria-label={`Add one ${i.name}`}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <footer><span>Total</span><strong>${total}</strong><button className="btn" disabled={!items.length}>Checkout</button></footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
