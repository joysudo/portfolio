// Project n (1-based) from the PROJECTS sheet rows. While the sheet is loading it returns a
// stand-in so the card keeps its place; if it fails or has no such row, there is no card.
export function projectAt(projects, n, status) {
  if (projects[n - 1]) return projects[n - 1]
  return status === 'loading' ? { title: `Project #${n}`, meta: '', description: 'Loading…', src: '' } : null
}

// A row can exist with only a photo; its text card is skipped until it has copy
export const hasText = (project) => Boolean(project && (project.title || project.meta || project.description))
