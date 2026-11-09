import { useEffect, useRef, useState } from 'react'
import Art from '../components/Art'
import useCarousel from '../hooks/useCarousel'
import { PRESS_ITEMS } from '../data/press'
import submarineRays from '../assets/submarine_rays.png'
import submarine from '../assets/submarine.png'
import krillPupil from '../assets/krill_pupil.png'
import krill from '../assets/krill.png'
import kelp from '../assets/kelp.png'
import chest from '../assets/chest.png'
import arrow from '../assets/figma/arrow_left.svg'

const KRILL_THOUGHTS = [
  'glub glub',
  'is that a whale?',
  "it's dark down here",
  'hello up there!',
  'who is driving this thing?',
  'I could go for some plankton',
  'nice spotlight, right?',
  'did someone say treasure?',
]

// Pupil centre as a fraction of the submarine box (measured from krill_pupil.png)
const PUPIL_X = 0.116
const PUPIL_Y = 0.62
// Max pupil travel as a fraction of the submarine width (~2.5px at 1440)
const PUPIL_RANGE = 0.004

export default function Abyss() {
  const { active, prev, next, onKeyDown } = useCarousel(PRESS_ITEMS.length)
  const item = PRESS_ITEMS[active]

  const [thought, setThought] = useState(null)
  const [hurt, setHurt] = useState(false)
  const subRef = useRef(null)
  const pupilRef = useRef(null)
  const hurtTimer = useRef(0)

  const think = () =>
    setThought((last) => {
      const options = KRILL_THOUGHTS.filter((t) => t !== last)
      return options[Math.floor(Math.random() * options.length)]
    })

  const poke = () => {
    clearTimeout(hurtTimer.current)
    setHurt(true)
    hurtTimer.current = setTimeout(() => setHurt(false), 200)
  }

  useEffect(() => () => clearTimeout(hurtTimer.current), [])

  // Pupil follows the cursor, throttled to one update per frame
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let mouseX = 0
    let mouseY = 0
    const update = () => {
      frame = 0
      const box = subRef.current.getBoundingClientRect()
      const dx = mouseX - (box.left + box.width * PUPIL_X)
      const dy = mouseY - (box.top + box.height * PUPIL_Y)
      const dist = Math.hypot(dx, dy) || 1
      // Full range once the cursor is half a submarine away, less when it's close
      const reach = Math.min(dist / (box.width * 0.5), 1) * box.width * PUPIL_RANGE
      pupilRef.current.style.translate = `${(dx / dist) * reach}px ${(dy / dist) * reach}px`
    }
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const bubble = hurt ? 'ouch!' : thought

  return (
    <section className="depth depth--abyss" id="press">
      <div className="abyss__sand" aria-hidden="true" />

      <Art src={chest} className="abyss__chest" />

      {/* Spotlight display: every clipping is stacked, the active one fades in */}
      <a
        className="abyss__press-media"
        href={item.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Read in ${item.publication} (opens in a new tab)`}
      >
        {PRESS_ITEMS.map((p, i) => (
          <img
            key={p.url}
            src={p.media}
            alt=""
            className={i === active ? 'is-active' : undefined}
            draggable="false"
          />
        ))}
      </a>
      <Art src={submarineRays} className="abyss__rays" />

      {/* Stacked layers share one box so they stay registered */}
      <div className="abyss__submarine" ref={subRef}>
        <img src={submarine} alt="" aria-hidden="true" draggable="false" />
        <img
          src={krillPupil}
          alt=""
          aria-hidden="true"
          ref={pupilRef}
          className={`abyss__krill-pupil${hurt ? ' is-hurt' : ''}`}
          draggable="false"
        />
        <img
          src={krill}
          alt=""
          aria-hidden="true"
          className={`abyss__krill${hurt ? ' is-hurt' : ''}`}
          draggable="false"
        />
        <button
          type="button"
          className="abyss__krill-hit"
          aria-label="Poke the krill"
          onMouseEnter={think}
          onMouseLeave={() => setThought(null)}
          onFocus={think}
          onBlur={() => setThought(null)}
          onClick={poke}
        />
        {bubble && (
          <p key={bubble} className={`abyss__krill-thought${hurt ? ' is-hurt' : ''}`} aria-hidden="true">
            {bubble}
          </p>
        )}
      </div>

      <div
        className="abyss__press-nav"
        role="group"
        aria-label="Selected press"
        onKeyDown={onKeyDown}
      >
        <button type="button" onClick={prev} aria-label="Previous press item">
          <img src={arrow} alt="" />
        </button>
        <button type="button" onClick={next} aria-label="Next press item">
          <img src={arrow} alt="" className="flip-x" />
        </button>
      </div>

      <Art src={kelp} className="abyss__kelp" />

      <article className="text-block text-block--right abyss__press">
        <h2 className="script-title">Selected Press</h2>
        <div className="text-block__body">
          <div className="abyss__press-details" key={active} aria-live="polite">
            <p className="text-lead">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.publication}
              </a>
            </p>
            <p>
              {item.date} | {item.subtext}
            </p>
          </div>
          <p className="abyss__press-hint">
            Press the left and right submarine buttons to view selected press
            <span className="abyss__press-count">
              {' '}
              ({active + 1}/{PRESS_ITEMS.length})
            </span>
          </p>
        </div>
      </article>
    </section>
  )
}
