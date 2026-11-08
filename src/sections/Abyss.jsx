import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import submarineRays from '../assets/submarine_rays.png'
import submarine from '../assets/submarine.png'
import krillPupil from '../assets/krill_pupil.png'
import krill from '../assets/krill.png'
import kelp from '../assets/kelp.png'
import chest from '../assets/chest.png'
import arrow from '../assets/figma/arrow_left.svg'
import placeholderMedia from '../assets/figma/placeholder_media.png'

export default function Abyss() {
  return (
    <section className="depth depth--abyss" id="press">
      <div className="abyss__sand" aria-hidden="true" />

      <Art src={chest} className="abyss__chest" />
      <Art src={placeholderMedia} className="abyss__press-media media-placeholder" />
      <Art src={submarineRays} className="abyss__rays" />

      {/* Stacked layers share one box so they stay registered */}
      <div className="abyss__submarine" aria-hidden="true">
        <img src={submarine} alt="" draggable="false" />
        <img src={krillPupil} alt="" draggable="false" />
        <img src={krill} alt="" draggable="false" />
      </div>

      <div className="abyss__press-nav">
        <button type="button" aria-label="Previous publication">
          <img src={arrow} alt="" />
        </button>
        <button type="button" aria-label="Next publication">
          <img src={arrow} alt="" className="flip-x" />
        </button>
      </div>

      <Art src={kelp} className="abyss__kelp" />

      <TextBlock title="Selected Press" className="abyss__press text-block--right">
        <p className="text-lead">Name of publication</p>
        <p>Publication date | Author</p>
      </TextBlock>
    </section>
  )
}
