import { useState } from 'react'

/* Real image from /public/images; agar file na mile to fallback SVG dikhata hai */
export default function Pic({ src, alt = '', fallback }) {
  const [ok, setOk] = useState(true)
  return ok ? <img className="pic" src={src} alt={alt} draggable={false} onError={() => setOk(false)} /> : fallback
}
