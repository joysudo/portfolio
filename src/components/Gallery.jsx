import { GALLERY_ITEMS } from '../data/gallery'
import useCarousel from '../hooks/useCarousel'
import arrow from '../assets/figma/arrow_left.svg'

const count = GALLERY_ITEMS.length
const step = 360 / count
// Ring radius as a multiple of panel width, with a little air between panels
const radiusFactor = (0.5 / Math.tan(Math.PI / count)) * 1.1

export default function Gallery() {
  const { position, active, prev, next, goTo, onKeyDown } = useCarousel(count)

  return (
    <div className="midnight__gallery" id="gallery">
      <h2 className="script-title gallery__title">Gallery</h2>

      <div
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Gallery"
        onKeyDown={onKeyDown}
      >
        <button type="button" className="carousel__nav" onClick={prev} aria-label="Previous photo">
          <img src={arrow} alt="" />
        </button>

        <div className="carousel__viewport">
          <ul
            className="carousel__ring"
            style={{ '--rotation': position, '--step': step, '--radius-factor': radiusFactor }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <li
                key={i}
                className={`carousel__panel${i === active ? ' is-active' : ''}`}
                style={{ '--i': i }}
                aria-hidden={i !== active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                onClick={() => goTo(i)}
              >
                <img src={item.src} alt={item.alt} draggable="false" />
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="carousel__nav" onClick={next} aria-label="Next photo">
          <img src={arrow} alt="" className="flip-x" />
        </button>
      </div>

      <p className="text-lead gallery__description" key={active} aria-live="polite">
        {GALLERY_ITEMS[active].description}
      </p>
    </div>
  )
}
