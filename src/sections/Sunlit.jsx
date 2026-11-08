import Art from '../components/Art'
import TextBlock from '../components/TextBlock'
import Wave from '../components/Wave'
import jellyBlue from '../assets/jellyfish_blue.png'
import jellyPink from '../assets/jellyfish_pink.png'
import jellyOrange from '../assets/jellyfish_orange.png'
import jellyNet from '../assets/jellyfish_net.png'
import bubbleFrame2 from '../assets/bubble_frame_2.png'
import placeholderMedia from '../assets/figma/placeholder_media.png'

export default function Sunlit() {
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

      <Art src={jellyBlue} className="sunlit__jelly-blue-a" />
      <Art src={jellyPink} className="sunlit__jelly-pink" />
      <Art src={jellyBlue} className="sunlit__jelly-blue-b" />
      <Art src={jellyOrange} className="sunlit__jelly-orange-a" />
      <Art src={jellyOrange} className="sunlit__jelly-orange-b" />

      {/* Skill showcase: media inside a bubble frame */}
      <Art src={placeholderMedia} className="sunlit__skill-media media-placeholder" />
      <Art src={bubbleFrame2} className="sunlit__skill-frame bubble-frame" />

      <Art src={jellyNet} className="sunlit__net" />
      <h2 className="script-title script-title--xl sunlit__skills-title" id="skills">
        Skills
      </h2>
      <p className="sunlit__skills-copy">
        This is an explanation of what the selected skill is, how long I’ve been proficient in it,
        and what kind of work experience I have related to it.
      </p>
    </section>
  )
}
