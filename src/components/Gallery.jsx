import useSheet, { RANGES } from '../data/sheets'
import useCarousel from '../hooks/useCarousel'
import arrow from '../assets/figma/arrow_left.svg'

const STATUS_TEXT = {
  loading: 'Loading gallery…',
  error: 'It looks like the gallery could not be loaded right now. Check back later to see a carousel here.',
}

export default function Gallery() {
  const { items, status } = useSheet(RANGES.gallery)
  const count = items.length
  const step = 360 / Math.max(count, 1)
  // Ring radius as a multiple of panel width, with a little air between panels
  const radiusFactor = count > 1 ? (0.5 / Math.tan(Math.PI / count)) * 1.1 : 0
  const { position, active, prev, next, goTo, onKeyDown } = useCarousel(count)

  return (
    <div className="midnight__gallery" id="gallery">
      <h2 className="script-title gallery__title">Project Gallery</h2>

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
            {items.map((item, i) => (
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
        {items[active]?.description ?? STATUS_TEXT[status]}
      </p>
    </div>
  )
}
