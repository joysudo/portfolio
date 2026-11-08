import { SKILLS } from '../data/skills'

// Clickable skill names with the selected skill's details underneath.
// `selected` is an index into SKILLS, or null when nothing is chosen.
export default function SkillList({ selected, onSelect }) {
  const skill = selected === null ? null : SKILLS[selected]

  return (
    <div className="skills">
      <ul className="skills__list">
        {SKILLS.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              className="skills__item"
              aria-pressed={i === selected}
              onClick={() => onSelect(i === selected ? null : i)}
            >
              {s.name}
              <span className="skills__dot" style={{ '--dot': s.color }} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="skills__details" aria-live="polite">
        {skill ? (
          <div key={skill.name} className="skills__details-body">
            <p className="skills__meta">
              {skill.name} · {skill.proficiency}
            </p>
            <p>{skill.description}</p>
            <p>{skill.experience}</p>
          </div>
        ) : (
          <p className="skills__hint">Select a skill to see details.</p>
        )}
      </div>
    </div>
  )
}
