import { useState } from 'react'

export const mod = (n, m) => ((n % m) + m) % m

// Wrap-around carousel state. `position` is unbounded so 3D rings can always
// turn the short way across the wrap point; `active` is the real item index.
export default function useCarousel(count) {
  const [position, setPosition] = useState(0)
  const active = mod(position, count)

  const turn = (delta) => setPosition((p) => p + delta)
  const prev = () => turn(-1)
  const next = () => turn(1)

  const goTo = (i) => {
    let delta = mod(i - active, count)
    if (delta > count / 2) delta -= count
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
