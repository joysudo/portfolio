import { useState } from 'react'

export const mod = (n, m) => ((n % m) + m) % m

// Wrap-around carousel state. `position` is unbounded so 3D rings can always
// turn the short way across the wrap point; `active` is the real item index.
export default function useCarousel(count) {
  const [position, setPosition] = useState(0)
  // count is 0 while content is still loading
  const size = Math.max(count, 1)
  const active = mod(position, size)

  const turn = (delta) => setPosition((p) => p + delta)
  const prev = () => turn(-1)
  const next = () => turn(1)

  const goTo = (i) => {
    let delta = mod(i - active, size)
    if (delta > size / 2) delta -= size
    turn(delta)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
    else return
    e.preventDefault()
  }

  return { position, active, prev, next, goTo, onKeyDown }
}
