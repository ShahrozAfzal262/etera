import { useState } from 'react'
import './Footer.css'
export default function Footer() {
  const [sent, setSent] = useState(false)
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <h2>Lorem ipsum dolor sit.</h2>
          <p>Consectetur adipiscing elit sed do eiusmod.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <label htmlFor="em" className="sr">Email address</label>
          <input id="em" type="email" required placeholder="Your email" disabled={sent} />
          <button className="btn" disabled={sent}>{sent ? 'Subscribed' : 'Subscribe'}</button>
        </form>
      </div>
      <div className="footer__bottom">
        <span className="logo">ÉTERA</span>
        <nav aria-label="Footer"><a href="#collection">Collection</a><a href="#notes">Notes</a><a href="#philosophy">Philosophy</a></nav>
        <small>© {new Date().getFullYear()} Étera Parfums</small>
      </div>
    </footer>
  )
}
