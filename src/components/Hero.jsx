import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const SCENES = [
  {
    id: "bloom",
    label: "THE BLOOM",
    title: "Nature in\nPerfect Balance.",
    description:
      "A delicate blend of nature's finest ingredients, crafted into an unforgettable fragrance.",
  },
  {
    id: "bottle",
    label: "THE FRAGRANCE",
    title: "A Scent\nBeyond Time.",
    description:
      "Discover a fragrance crafted to leave a lasting impression.",
  },
];

const INGREDIENTS = [
  { type: "flower", className: "ingredient--one" },
  { type: "citrus", className: "ingredient--two" },
  { type: "petal", className: "ingredient--three" },
  { type: "leaf", className: "ingredient--four" },
  { type: "citrus", className: "ingredient--five" },
  { type: "flower", className: "ingredient--six" },
  { type: "petal", className: "ingredient--seven" },
  { type: "leaf", className: "ingredient--eight" },
];

function Ingredient({ type }) {
  if (type === "citrus") {
    return (
      <svg viewBox="0 0 100 100" className="ingredient-svg">
        <circle cx="50" cy="50" r="43" fill="#d98c35" />
        <circle cx="50" cy="50" r="36" fill="#f4c66e" />
        <circle cx="50" cy="50" r="5" fill="#fff0c9" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M50 50 L50 15 Q67 30 50 50"
            fill="#fff1c9"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#f8d99b"
          strokeWidth="3"
        />
      </svg>
    );
  }

  if (type === "petal") {
    return (
      <svg viewBox="0 0 100 100" className="ingredient-svg">
        <path
          d="M50 7 C75 22 83 48 50 91 C17 48 25 22 50 7Z"
          fill="#f8eee0"
          stroke="#d9c7ad"
          strokeWidth="1.5"
        />
        <path d="M50 18 Q48 53 50 84" stroke="#d8c5a9" fill="none" />
        <path d="M50 50 Q35 39 32 29" stroke="#e1d1bb" fill="none" />
      </svg>
    );
  }

  if (type === "leaf") {
    return (
      <svg viewBox="0 0 100 100" className="ingredient-svg">
        <path
          d="M12 82 C12 30 47 7 88 12 C88 55 60 91 12 82Z"
          fill="#87966a"
          stroke="#c0bd8b"
          strokeWidth="2"
        />
        <path d="M15 81 Q50 48 82 18" stroke="#e1d3a4" strokeWidth="2" fill="none" />
        <path d="M43 55 L35 31 M58 43 L67 27 M35 65 L20 54" stroke="#d4d1a0" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="ingredient-svg">
      <g fill="#f5eadb" stroke="#d8c3a7" strokeWidth="1">
        <ellipse cx="50" cy="27" rx="15" ry="25" />
        <ellipse cx="50" cy="27" rx="15" ry="25" transform="rotate(72 50 50)" />
        <ellipse cx="50" cy="27" rx="15" ry="25" transform="rotate(144 50 50)" />
        <ellipse cx="50" cy="27" rx="15" ry="25" transform="rotate(216 50 50)" />
        <ellipse cx="50" cy="27" rx="15" ry="25" transform="rotate(288 50 50)" />
      </g>
      <circle cx="50" cy="50" r="10" fill="#d9a34e" />
    </svg>
  );
}

function HeroBottle() {
  return (
    <svg className="hero__bottle" viewBox="0 0 300 520" fill="none">
      <defs>
        <linearGradient id="heroGlass" x1="40" y1="100" x2="260" y2="450">
          <stop stopColor="#fff8e9" stopOpacity=".95" />
          <stop offset=".5" stopColor="#d9a64c" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity=".8" />
        </linearGradient>

        <linearGradient id="heroLiquid" x1="150" y1="220" x2="150" y2="440">
          <stop stopColor="#f5d18b" />
          <stop offset="1" stopColor="#a96b20" />
        </linearGradient>

        <linearGradient id="heroCap" x1="100" y1="30" x2="200" y2="100">
          <stop stopColor="#fff0c9" />
          <stop offset=".5" stopColor="#bd8b3e" />
          <stop offset="1" stopColor="#f5d89e" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="470" rx="90" ry="15" fill="#d89b45" opacity=".16" />

      <rect
        x="112"
        y="28"
        width="76"
        height="72"
        rx="9"
        fill="url(#heroCap)"
        stroke="#f8e4b8"
        strokeWidth="2"
      />

      <rect x="122" y="92" width="56" height="35" rx="4" fill="#c99a50" />

      <path
        d="M82 130 Q70 130 70 150 L48 190 Q40 205 40 225 V420 Q40 455 75 455 H225 Q260 455 260 420 V225 Q260 205 252 190 L230 150 Q230 130 218 130 Z"
        fill="url(#heroGlass)"
        stroke="#f6e2bc"
        strokeWidth="3"
      />

      <path
        d="M48 270 H252 V420 Q252 445 225 445 H75 Q48 445 48 420 Z"
        fill="url(#heroLiquid)"
        opacity=".75"
      />

      <path
        d="M72 190 Q65 215 65 245 V390"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".55"
      />

      <path
        d="M230 205 V405"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".3"
      />

      <rect x="75" y="280" width="150" height="95" rx="3" fill="#f8eedb" />

      <text
        x="150"
        y="320"
        textAnchor="middle"
        fill="#79552b"
        fontSize="17"
        letterSpacing="4"
        fontFamily="serif"
      >
        ETERA
      </text>

      <text
        x="150"
        y="343"
        textAnchor="middle"
        fill="#79552b"
        fontSize="8"
        letterSpacing="2"
      >
        PARFUM
      </text>

      <text
        x="150"
        y="357"
        textAnchor="middle"
        fill="#79552b"
        fontSize="6"
        letterSpacing="1.5"
      >
        COLLECTION
      </text>
    </svg>
  );
}

export default function Hero() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scene = SCENES[activeScene];

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveScene((current) => (current + 1) % SCENES.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeScene, isPaused]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero__glow" />
      <div className="hero__noise" />

      <div className="hero__copy">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ETERA — THE ART OF FRAGRANCE
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            className="hero__text-content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.7 }}
          >
            <h1>
              {scene.title.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
            </h1>

            <p>{scene.description}</p>

            <a href="/shop" className="hero__button">
              Shop now <span>↗</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero__visual">
        <div className="hero__visual-glow" />
        <div className="hero__orbit hero__orbit--one" />
        <div className="hero__orbit hero__orbit--two" />

        <div className="hero__ingredient-ring">
          {INGREDIENTS.map((ingredient, index) => (
            <div
              key={`${ingredient.className}-${index}`}
              className={`hero__ingredient ${ingredient.className}`}
            >
              <div className="hero__ingredient-inner">
                <Ingredient type={ingredient.type} />
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="hero__center-flower"
          animate={{
            scale: [0.85, 1.05, 0.95, 0.85],
            rotate: [0, 8, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/images/hero/flower-video.png"
            alt="White Etera flower"
            className="hero__photo"
          />
        </motion.div>

        <div className="hero__bottle-stage">
          <div className="hero__bottle-light" />
          <HeroBottle />
        </div>

        <div className="hero__flash" />

        <span className="hero__spark hero__spark--one" />
        <span className="hero__spark hero__spark--two" />
        <span className="hero__particle hero__particle--one" />
        <span className="hero__particle hero__particle--two" />
        <span className="hero__particle hero__particle--three" />
        <span className="hero__particle hero__particle--four" />
      </div>

      <div className="hero__side">
        <span>01</span>
        <span className="hero__side-line" />
        <span>02</span>
      </div>

      <div className="hero__bottom">
        <div className="hero__scene-label">
          <span>0{activeScene + 1}</span>
          <span>{scene.label}</span>
        </div>

        <div className="hero__progress">
          {SCENES.map((item, index) => (
            <button
              key={item.id}
              className={activeScene === index ? "active" : ""}
              onClick={() => setActiveScene(index)}
              aria-label={`Show ${item.label}`}
            >
              <span />
            </button>
          ))}
        </div>

        <span className="hero__scroll">SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}