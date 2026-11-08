// Script heading + body copy, used for About, Projects, Gallery and Press.
export default function TextBlock({ title, meta, className = '', children }) {
  return (
    <article className={`text-block ${className}`}>
      <h2 className="script-title">{title}</h2>
      <div className="text-block__body">
        {meta && <p className="text-block__meta">{meta}</p>}
        {children}
      </div>
    </article>
  )
}
