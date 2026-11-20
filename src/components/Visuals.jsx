import { useId } from 'react'
import { motion } from 'framer-motion'

/* Pure SVG artwork — swap these for real renders or <model-viewer>/Three.js later. */

export function Bottle({ liquid = ['#f0b384', '#c9703f'], label = 'ÉTERA' }) {
  const id = useId()
  return (
    <svg viewBox="0 0 200 300" className="art" role="img" aria-label="Perfume bottle">
      <defs>
        <linearGradient id={`g${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".06" />
          <stop offset="1" stopColor="#fff" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={liquid[0]} />
          <stop offset="1" stopColor={liquid[1]} />
        </linearGradient>
        <linearGradient id={`b${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a3a" />
          <stop offset=".5" stopColor="#e9cf98" />
          <stop offset="1" stopColor="#8a6a3a" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="286" rx="70" ry="8" fill="#000" opacity=".45" />
      <rect x="70" y="14" width="60" height="44" rx="4" fill={`url(#g${id})`} stroke="#fff" strokeOpacity=".35" />
      <rect x="84" y="26" width="32" height="22" rx="2" fill="#fff" opacity=".12" />
      <rect x="82" y="58" width="36" height="22" fill={`url(#b${id})`} />
      <rect x="30" y="80" width="140" height="196" rx="10" fill={`url(#g${id})`} stroke="#fff" strokeOpacity=".35" />
      <rect x="34" y="170" width="132" height="102" rx="7" fill={`url(#l${id})`} opacity=".9" />
      <rect x="62" y="196" width="76" height="36" fill="#f2e4c4" stroke="#b8975a" />
      <text x="100" y="219" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="13" letterSpacing="3" fill="#3a2a18">{label}</text>
      <rect x="40" y="90" width="9" height="176" rx="4" fill="#fff" opacity=".18" />
    </svg>
  )
}

export function Bloom() {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36)
  return (
    <svg viewBox="0 0 300 300" className="art" role="img" aria-label="Rose and amber petals">
      <defs>
        <radialGradient id="pt" cx=".5" cy=".2"><stop offset="0" stopColor="#fff2e8" /><stop offset="1" stopColor="#e9a98a" /></radialGradient>
        <radialGradient id="am" cx=".35" cy=".3"><stop offset="0" stopColor="#ffd08a" /><stop offset="1" stopColor="#a8531c" /></radialGradient>
      </defs>
      <motion.g style={{ originX: '150px', originY: '150px' }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
        {petals.map((a) => (
          <ellipse key={a} cx="150" cy="62" rx="22" ry="48" fill="url(#pt)" opacity=".92" transform={`rotate(${a} 150 150)`} />
        ))}
        {petals.map((a) => (
          <circle key={`b${a}`} cx="150" cy="22" r="8" fill="url(#am)" transform={`rotate(${a + 18} 150 150)`} />
        ))}
      </motion.g>
      {[58, 42, 28, 14].map((r, i) => (
        <circle key={r} cx="150" cy="150" r={r} fill={i % 2 ? '#e8a083' : '#f6c9b2'} stroke="#b9674a" strokeOpacity=".45" />
      ))}
    </svg>
  )
}

export function Amber() {
  return (
    <svg viewBox="0 0 300 300" className="art" role="img" aria-label="Glowing amber">
      <defs>
        <radialGradient id="orb" cx=".38" cy=".32"><stop offset="0" stopColor="#fff0c2" /><stop offset=".45" stopColor="#f2a43a" /><stop offset="1" stopColor="#7a3510" /></radialGradient>
        <radialGradient id="halo"><stop offset="0" stopColor="#f2a43a" stopOpacity=".5" /><stop offset="1" stopColor="#f2a43a" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="150" cy="150" r="145" fill="url(#halo)" />
      {[0, 60, 120].map((a, i) => (
        <motion.ellipse key={a} cx="150" cy="150" rx="118" ry="38" fill="none" stroke="#e9cf98" strokeOpacity=".6" strokeWidth="1.5"
          style={{ originX: '150px', originY: '150px', rotate: a }}
          animate={{ rotate: [a, a + 360] }} transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }} />
      ))}
      <circle cx="150" cy="150" r="62" fill="url(#orb)" />
      {[[70, 90], [230, 80], [236, 210], [62, 214], [150, 24]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill="#f6c46a"
          animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3 + i, repeat: Infinity }} />
      ))}
    </svg>
  )
}

export const SCENES = [
  { key: 'bloom', src: '/images/hero/1.png', name: 'Rose Bloom', glow: '#c98a6a', Art: Bloom },
  { key: 'amber', src: '/images/hero/2.png', name: 'Golden Amber', glow: '#d98b2f', Art: Amber },
  { key: 'bottle', src: '/images/hero/3.png', name: 'The Flacon', glow: '#b8805a', Art: Bottle },
]
