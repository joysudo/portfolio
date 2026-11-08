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

export default function Abyss() {
  const { active, prev, next, onKeyDown } = useCarousel(PRESS_ITEMS.length)
  const item = PRESS_ITEMS[active]

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
      <div className="abyss__submarine" aria-hidden="true">
        <img src={submarine} alt="" draggable="false" />
        <img src={krillPupil} alt="" draggable="false" />
        <img src={krill} alt="" draggable="false" />
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
