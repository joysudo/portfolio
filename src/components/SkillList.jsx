// Clickable skill names with the selected skill's details underneath.
// `selected` is an index into `skills`, or null when nothing is chosen.
export default function SkillList({ skills, status, selected, onSelect }) {
  const skill = selected === null ? null : skills[selected]

  return (
    <div className="skills">
      <ul className="skills__list">
        {skills.map((s, i) => (
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
            <p className="skills__meta">{skill.proficiency}</p>
            <p className="skills__description">{skill.description}</p>
            <p>{skill.experience}</p>
          </div>
        ) : (
          <p className="skills__hint">
            {status === 'loading'
              ? 'Loading skills…'
              : status === 'error'
                ? 'Oops! This site uses the Google Sheets API to fetch the most up-to-date skills data possible. Right now, the skills Google Sheet is unreachable or throwing an error.'
                : 'Select a skill to see details.'}
          </p>
        )}
      </div>
    </div>
  )
}
