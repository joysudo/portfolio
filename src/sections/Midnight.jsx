import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import Gallery from '../components/Gallery'
import { PROJECT_COPY, PROJECT_META } from '../content'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'
import useScrollProgress from '../hooks/useScrollProgress'

export default function Midnight() {
  const sectionRef = useScrollProgress()
  return (
    
    <section className="depth depth--midnight" id="projects" ref={sectionRef}>
      <div className="drift-group" style={{ '--drift-x': '1vw', '--drift-y': '-2vw' }}>
        <Art src={placeholderMedia} className="midnight__p4-media media-placeholder" />
        <Art src={bubbleFrame2} className="midnight__p4-frame bubble-frame" />
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
