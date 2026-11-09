import { Link, NavLink } from 'react-router-dom'
import './SiteNav.css'

// Backgroundless top bar shared by the homepage and the blog. It positions itself at the
// top of the nearest `position: relative` ancestor. The page you're on gets a wavy underline.
const PAGES = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
]

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <ul className="site-nav__group">
        {PAGES.map(({ label, to }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <Link to="/#contact">Contact</Link>
    </nav>
  )
}
