import { useEffect, useState } from 'react'
import arrow from '../assets/figma/arrow_left.svg'

const SLACK = 10 // px of tolerance so a section already at the top isn't a target


const sectionTops = () => {
  const vhoffset = window.innerHeight * 0.2
  return [...document.querySelectorAll('.ocean > .depth')].map(
    (el, i) => el.getBoundingClientRect().top + window.scrollY + (i >= 2 ? vhoffset : 0),
  )
}

// Smooth-scroll to the next (+1) or previous (-1) section top
function go(direction) {
  const y = window.scrollY
  const tops = sectionTops()
  const top =
    direction > 0 ? tops.find((t) => t > y + SLACK) : tops.findLast((t) => t < y - SLACK)
  if (top === undefined) return
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: calm ? 'auto' : 'smooth' })
}

// Fixed left/right arrows that jump between depth sections.
// Also bound to the ArrowLeft / ArrowRight keys.
export default function SectionNav() {
  const [can, setCan] = useState({ prev: false, next: false })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      // Carousels, form fields and modified keys keep their own arrow behaviour
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      go(e.key === 'ArrowRight' ? 1 : -1)
    }

    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const tops = sectionTops()
      setCan({ prev: tops.some((t) => t < y - SLACK), next: tops.some((t) => t > y + SLACK) })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <nav className="section-nav" aria-label="Section navigation">
      <button type="button" onClick={() => go(-1)} disabled={!can.prev} aria-label="Previous section">
        <img src={arrow} alt="" />
      </button>
      <button type="button" onClick={() => go(1)} disabled={!can.next} aria-label="Next section">
        <img src={arrow} alt="" className="flip-x" />
      </button>
    </nav>
  )
}
