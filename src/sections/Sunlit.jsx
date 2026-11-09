import { useState } from 'react'
import Art from '../components/Art'
import SkillList from '../components/SkillList'
import { SKILLS } from '../data/skills'
import TextBlock from '../components/TextBlock'
import Wave from '../components/Wave'
import jellyBlue from '../assets/jellyfish_blue.png'
import jellyPink from '../assets/jellyfish_pink.png'
import jellyOrange from '../assets/jellyfish_orange.png'
import jellyNet from '../assets/jellyfish_net.png'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'

const JELLIES = [
  { id: 'blue-a', src: jellyBlue },
  { id: 'pink', src: jellyPink },
  { id: 'blue-b', src: jellyBlue },
  { id: 'orange-a', src: jellyOrange },
  { id: 'orange-b', src: jellyOrange },
]

export default function Sunlit() {
  const [selected, setSelected] = useState(null)
  const activeJelly = selected === null ? null : SKILLS[selected].jelly

  const toggleJelly = (id) => {
    const i = SKILLS.findIndex((s) => s.jelly === id)
    setSelected((current) => (current === i ? null : i))
  }

  return (
    <section className="depth depth--sunlit" id="about">
      <Wave />

      <TextBlock title="About" className="sunlit__about text-block--on-ice">
        <p>
          This is an explanation of who I am. It’s the “tip of the iceberg,” so to speak. Currently,
          this box is only filler text, but it will eventually be filled with an actual bio. I love
          web development. I wish Claude slop didn’t dominate it nowadays. Imagine the responsive
          layouts possible here. I’ll discuss how I grew up learning technical skills before the AI
          era, became worried about equity in tech, and have since been able to jump into work with
          huge nonprofits directing initiatives for AI literacy.
        </p>
        <p>
          This lets me stay connected with the technical sphere without losing sight of the
          community around me. You can see stuff about my relevant technologies below that stuff
          will be explained there.
        </p>
      </TextBlock>

      {/* Selecting a skill dims every jellyfish except its own. Each jelly is also a
          pointer shortcut for its skill; keyboard and screen reader users get the same
          control from the skill list, so the jellies stay out of the tab order. */}
      {JELLIES.map(({ id, src }) => (
        <button
          key={id}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={`art jelly sunlit__jelly-${id}${activeJelly && activeJelly !== id ? ' is-dimmed' : ''}`}
          onClick={() => toggleJelly(id)}
        >
          <img src={src} alt="" draggable="false" />
          {/* Only the body is clickable, so overlapping image boxes don't steal clicks */}
          <span className="jelly__hit" />
        </button>
      ))}

      {/* Skill showcase: media inside a bubble frame */}
      <Art src={placeholderMedia} className="sunlit__skill-media media-placeholder" />
      <Art src={bubbleFrame2} className="sunlit__skill-frame bubble-frame" />

      <div className="sunlit__skills-group">
        <h2 className="script-title script-title--xl sunlit__skills-title" id="skills">
          Skills
        </h2>
        <Art src={jellyNet} className="sunlit__net" />
      </div>

      <SkillList selected={selected} onSelect={setSelected} />
    </section>
  )
}
