import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import SiteNav from '../components/SiteNav'
import useSheet, { RANGES } from '../data/sheets'
import placeholder from '../assets/jellyfish_blue.png'
import './Blog.css'

// Markdown may embed raw HTML. Allow <video>/<source> on top of the safe defaults;
// scripts, event handlers and unknown tags are stripped.
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    video: ['src', 'poster', 'controls', 'autoPlay', 'loop', 'muted', 'playsInline', 'width', 'height'],
    source: ['src', 'type'],
  },
}

const PLACEHOLDER_TEXT = {
  loading: 'Fishing up the latest posts…',
  error: 'The blog could not be loaded right now. Please try again later.',
  empty: 'No posts yet. Check back soon!',
  unselected: 'No post is yet selected. Pick one from the list!',
  none: 'That post drifted away. Pick another from the list.',
}

export default function Blog() {
  const { slug } = useParams()
  const { items, status } = useSheet(RANGES.blog)

  // /blog opens the first post; an unknown slug shows the placeholder
  const post = slug ? items.find((p) => p.slug === slug) : null
  const emptyReason = status !== 'ready' ? status : items.length === 0 ? 'empty' : !slug ? 'unselected' : 'none'

  return (
    <div className="blog">
      <SiteNav />

      <div className="blog__layout">
        <nav className="blog__sidebar" aria-label="Blog posts">
          <ul>
            {items.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} aria-current={p === post ? 'page' : undefined}>
                  {p.sidebarTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="blog__content">
          {post ? (
            <article key={post.slug}>
              {post.coverImage && (
                <img
                  className="blog__cover"
                  src={post.coverImage}
                  alt=""
                  onError={(e) => (e.currentTarget.hidden = true)}
                />
              )}
              <h1 className="blog__title">{post.title}</h1>
              {post.summary && <p className="blog__summary">{post.summary}</p>}
              <hr />
              <div className="blog__markdown">
                {/* Sheet cells hold newlines as the two characters \n */}
                <Markdown rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}>
                  {post.content.replaceAll('\\n', '\n')}
                </Markdown>
              </div>
            </article>
          ) : (
            <div className="blog__empty">
              <img src={placeholder} alt="" />
              <p>{PLACEHOLDER_TEXT[emptyReason]}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
