import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import { hasText, projectAt } from '../content'
import useSheet, { RANGES } from '../data/sheets'
import useScrollProgress from '../hooks/useScrollProgress'
import whale1 from '../assets/whale_1.png'
import whale2 from '../assets/whale_2.png'
import icebergChunk from '../assets/iceberg_chunk.png'
import bubbleFrame1 from '../assets/bubble_frame_1.png'

export default function Twilight() {
  const sectionRef = useScrollProgress()
  const { items, status } = useSheet(RANGES.projects)
  const [p1, p2, p3] = [1, 2, 3].map((n) => projectAt(items, n, status))

  return (
    <section className="depth depth--twilight" id="experience" ref={sectionRef}>
      <Art src={whale1} className="twilight__whale twilight__whale-1" />

      <h2 className="script-title script-title--xl twilight__heading">
        <span>Tech</span>
        <span className="twilight__heading-offset">Experience</span>
      </h2>

      {/* Chunk + Project 1 copy: no box on desktop, one grid cell on mobile */}
      <div className="twilight__p1-group">
        <Art src={icebergChunk} className="twilight__chunk" />
        {hasText(p1) && (
          <TextBlock
            title={p1.title}
            meta={p1.meta}
            className="twilight__project-1 text-block--on-ice"
          >
            <p>{p1?.description.replaceAll('\\n', '\n')}</p>
            {p1.src && (
              <p>
                <Art src={p1.src} alt={p1.title} className="twilight__p1-media media-placeholder" />
              </p>
            )}
          </TextBlock>
        )}
      </div>

      {/* Project #2 has no photo, whatever its src cell says */}
      {hasText(p2) && (
        <TextBlock title={p2.title} meta={p2.meta} className="twilight__project-2">
          <p>{p2?.description.replaceAll('\\n', '\n')}</p>
        </TextBlock>
      )}

      <Art src={whale2} className="twilight__whale twilight__whale-2" />

      {/* Project #3 media, hangs down into the midnight zone */}
      {p3?.src && (
        <div className="drift-group" style={{ '--drift-x': '1vw', '--drift-y': '-2vw' }}>
          <Art src={p3.src} alt={p3.title} className="twilight__p3-media media-placeholder" />
          <Art src={bubbleFrame1} className="twilight__p3-frame bubble-frame" />
        </div>
      )}
    </section>
  )
}
