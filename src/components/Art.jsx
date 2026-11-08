// Decorative illustration layer. Position/size live in CSS (percent of the parent section).
export default function Art({ src, className = '', alt = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={`art ${className}`}
      draggable="false"
      decoding="async"
    />
  )
}
