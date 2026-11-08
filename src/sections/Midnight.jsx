import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import { PROJECT_COPY, PROJECT_META } from '../content'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'
import galleryMock from '../assets/figma/gallery_mock.png'

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

      <div className="midnight__gallery" id="gallery">
        <TextBlock title="Gallery" className="text-block--center">
          <p className="text-lead">
            A little bit of information on the displayed part of the gallery. I want this to be a
            3-dimensional gallery that seemingly wraps around in a cylindrical shape.
          </p>
        </TextBlock>
        {/* Static stand-in for the cylindrical gallery (Phase 2) */}
        <div className="midnight__gallery-stage">
          <img src={galleryMock} alt="Gallery preview" draggable="false" />
        </div>
      </div>
    </section>
  )
}
