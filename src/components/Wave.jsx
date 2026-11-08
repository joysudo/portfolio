// Rolling wave at the sky / sunlit boundary. Each layer is a path two periods wide,
// so sliding it by half its width loops seamlessly.
const WAVELENGTH = 720
const VIEW_W = WAVELENGTH * 4
const VIEW_H = 100

function wavePath(amplitude, baseline) {
  const crest = baseline - amplitude
  const trough = baseline + amplitude
  const q = WAVELENGTH / 4
  let d = `M0 ${baseline} C${q * 0.55} ${crest} ${q * 1.45} ${crest} ${q * 2} ${baseline}`
  for (let x = q * 2; x < VIEW_W; x += q * 2) {
    const y = (x / (q * 2)) % 2 === 1 ? trough : crest
    d += ` S${x + q * 1.45} ${y} ${x + q * 2} ${baseline}`
  }
  return `${d} L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`
}

const LAYERS = [
  { className: 'wave__layer wave__layer--back', amplitude: 22, baseline: 44 },
  { className: 'wave__layer wave__layer--mid', amplitude: 18, baseline: 58 },
  { className: 'wave__layer wave__layer--front', amplitude: 14, baseline: 72 },
]

export default function Wave() {
  return (
    <div className="wave" aria-hidden="true">
      {LAYERS.map(({ className, amplitude, baseline }) => (
        <svg
          key={className}
          className={className}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
        >
          <path d={wavePath(amplitude, baseline)} />
        </svg>
      ))}
    </div>
  )
}
