import { useState } from 'react'
import TextBlock from './TextBlock'
import { GALLERY_ITEMS } from '../data/gallery'
import arrow from '../assets/figma/arrow_left.svg'

const count = GALLERY_ITEMS.length
const step = 360 / count
// Ring radius as a multiple of panel width, with a little air between panels
const radiusFactor = (0.5 / Math.tan(Math.PI / count)) * 1.1

const mod = (n, m) => ((n % m) + m) % m

export default function Gallery() {
  // Unbounded so the ring always turns the short way, even across the wrap point
  const [rotation, setRotation] = useState(0)
  const active = mod(rotation, count)

  const turn = (delta) => setRotation((r) => r + delta)

  const focusItem = (i) => {
    let delta = mod(i - active, count)
    if (delta > count / 2) delta -= count
    turn(delta)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') turn(-1)
    else if (e.key === 'ArrowRight') turn(1)
    else return
    e.preventDefault()
  }

  return (
    <div className="midnight__gallery" id="gallery">
      <TextBlock title="Gallery" className="text-block--center">
        <p className="text-lead gallery__description" key={active} aria-live="polite">
          {GALLERY_ITEMS[active].description}
        </p>
      </TextBlock>

      <div
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Gallery"
        onKeyDown={onKeyDown}
      >
        <button type="button" className="carousel__nav" onClick={() => turn(-1)} aria-label="Previous photo">
          <img src={arrow} alt="" />
        </button>

        <div className="carousel__viewport">
          <ul
            className="carousel__ring"
            style={{ '--rotation': rotation, '--step': step, '--radius-factor': radiusFactor }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <li
                key={item.src}
                className={`carousel__panel${i === active ? ' is-active' : ''}`}
                style={{ '--i': i }}
                aria-hidden={i !== active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                onClick={() => focusItem(i)}
              >
                <img src={item.src} alt={item.alt} draggable="false" />
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="carousel__nav" onClick={() => turn(1)} aria-label="Next photo">
          <img src={arrow} alt="" className="flip-x" />
        </button>
      </div>
    </div>
  )
}
