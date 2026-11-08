import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import { PROJECT_COPY, PROJECT_META } from '../content'
import useScrollProgress from '../hooks/useScrollProgress'
import whale1 from '../assets/whale_1.png'
import whale2 from '../assets/whale_2.png'
import icebergChunk from '../assets/iceberg_chunk.png'
import bubbleFrame1 from '../assets/bubble_frame_1.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'

export default function Twilight() {
  const sectionRef = useScrollProgress()

  return (
    <section className="depth depth--twilight" id="experience" ref={sectionRef}>
      <Art src={whale1} className="twilight__whale twilight__whale-1" />

      <h2 className="script-title script-title--xl twilight__heading">
        <span>Tech</span>
        <span className="twilight__heading-offset">Experience</span>
      </h2>

      <Art src={icebergChunk} className="twilight__chunk" />
      <TextBlock
        title="Project #1"
        meta={PROJECT_META}
        className="twilight__project-1 text-block--on-ice"
      >
        <p>{PROJECT_COPY}</p>
      </TextBlock>

      <TextBlock title="Project #2" meta={PROJECT_META} className="twilight__project-2">
        <p>{PROJECT_COPY}</p>
      </TextBlock>

      <Art src={whale2} className="twilight__whale twilight__whale-2" />

      {/* Project #3 media, hangs down into the midnight zone */}
      <Art src={placeholderMedia} className="twilight__p3-media media-placeholder" />
      <Art src={bubbleFrame1} className="twilight__p3-frame bubble-frame" />
    </section>
  )
}
