import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import Gallery from '../components/Gallery'
import { hasText, projectAt } from '../content'
import useSheet, { RANGES } from '../data/sheets'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import useScrollProgress from '../hooks/useScrollProgress'

export default function Midnight() {
  const sectionRef = useScrollProgress()
  const { items, status } = useSheet(RANGES.projects)
  const [p3, p4] = [3, 4].map((n) => projectAt(items, n, status))
  return (
    
    <section className="depth depth--midnight" id="projects" ref={sectionRef}>
      {p4?.src && (
        <div className="drift-group" style={{ '--drift-x': '1vw', '--drift-y': '-2vw' }}>
          <Art src={p4.src} alt={p4.title} className="midnight__p4-media media-placeholder" />
          <Art src={bubbleFrame2} className="midnight__p4-frame bubble-frame" />
        </div>
      )}

      

      {hasText(p3) && (
        <TextBlock
          title={p3.title}
          meta={p3.meta}
          className="midnight__project-3 text-block--right"
        >
          <p>{p3.description}</p>
        </TextBlock>
      )}

      {hasText(p4) && (
        <TextBlock title={p4.title} meta={p4.meta} className="midnight__project-4">
          <p>{p4.description}</p>
        </TextBlock>
      )}

      <Gallery />
    </section>
  )
}
