import Art from '../components/Art'
import name from '../assets/name.png'
import iceberg from '../assets/iceberg.png'

const NAV_LEFT = ['Home', 'Blog', 'Fun']

export default function Surface() {
  return (
    <section className="depth depth--surface" id="main">
      <nav className="site-nav" aria-label="Primary">
        <ul className="site-nav__group">
          {NAV_LEFT.map((label) => (
            <li key={label}>
              <a href={`#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact">Contact</a>
      </nav>

      <h1 className="visually-hidden">Joy Su</h1>
      <Art src={name} className="surface__name" />

      {/* Spans the surface down into the twilight zone */}
      <Art src={iceberg} className="surface__iceberg" />
    </section>
  )
}
