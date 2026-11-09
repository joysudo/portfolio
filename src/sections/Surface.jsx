import Art from '../components/Art'
import SiteNav from '../components/SiteNav'
import name from '../assets/name.png'
import iceberg from '../assets/iceberg.png'
import useScrollProgress from '../hooks/useScrollProgress'

export default function Surface() {
  const sectionRef = useScrollProgress()
  return (
    <section className="depth depth--surface" id="main" ref={sectionRef}>
      <SiteNav />

      <h1 className="visually-hidden">Joy Su</h1>
      <Art src={name} className="surface__name" />

      {/* Spans the surface down into the twilight zone */}
      <Art src={iceberg} className="surface__iceberg" />
    </section>
  )
}
