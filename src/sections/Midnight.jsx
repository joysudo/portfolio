import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import Gallery from '../components/Gallery'
import { PROJECT_COPY, PROJECT_META } from '../content'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'

export default function Midnight() {
  return (
    <section className="depth depth--midnight" id="projects">
      <Art src={placeholderMedia} className="midnight__p4-media media-placeholder" />
      {/* Landscape bubble frame: the portrait frame rotated a quarter turn */}
      <div className="midnight__p4-frame" aria-hidden="true">
        <img src={bubbleFrame2} alt="" className="bubble-frame" draggable="false" />
      </div>

      <TextBlock
        title="Project #3"
        meta={PROJECT_META}
        className="midnight__project-3 text-block--right"
      >
        <p>{PROJECT_COPY}</p>
      </TextBlock>

      <TextBlock title="Project #4" meta={PROJECT_META} className="midnight__project-4">
        <p>{PROJECT_COPY}</p>
      </TextBlock>

      <Gallery />
    </section>
  )
}
