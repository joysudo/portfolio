// Live content from a public Google Sheet (Sheets API v4, values.get).
// The first row of each range holds the headers; every later row becomes an object.
import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_SHEETS_API_KEY
const SPREADSHEET_ID = import.meta.env.SPREADSHEET_ID

export const RANGES = {
  gallery: 'GALLERY_ITEMS!A1:C20',
  press: 'PRESS_ITEMS!A1:E20', 
  projects: 'PROJECTS!A1:D10',
  blog: 'BLOG!A1:F50',
  skills: 'SKILLS!A1:F6' // header + 5 skills, one per jellyfish,
}

// Sheets can store a pasted link as markdown, "[text](url)"; keep just the url
const unwrapLink = (cell) =>
  /\s/.test(cell) ? cell : (cell.match(/^\[[^\]]*\]\((.+)\)$/)?.[1] ?? cell)

// [headers, ...rows] -> [{ header: cell }, ...]. The API drops trailing empty cells, so
// missing cells become ''.
export function rowsToObjects(values = []) {
  const [headers = [], ...rows] = values
  return rows
    .filter((row) => row.some((cell) => cell !== ''))
    .map((row) => Object.fromEntries(headers.map((h, i) => [h.trim(), unwrapLink(row[i] ?? '')])))
}

// One request per range, shared by every component that asks for it
const cache = new Map()

function fetchSheet(range) {
  if (!cache.has(range)) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`
    const request = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Sheets API ${res.status} for ${range}`)
        return res.json()
      })
      .then((data) => rowsToObjects(data.values))
    // Don't cache failures, so a remount can retry
    request.catch(() => cache.delete(range))
    cache.set(range, request)
  }
  return cache.get(range)
}

// Returns { items, status } where status is 'loading' | 'ready' | 'error'.
// `items` stays empty until the sheet loads, and on error (or a missing key / empty sheet).
export default function useSheet(range) {
  const [state, setState] = useState({ items: [], status: 'loading' })

  useEffect(() => {
    let cancelled = false
    const fail = (err) => {
      console.warn(`Could not load ${range}:`, err.message)
      if (!cancelled) setState({ items: [], status: 'error' })
    }

    if (!API_KEY || !SPREADSHEET_ID) {
      fail(new Error('missing VITE_SHEETS_API_KEY or SPREADSHEET_ID'))
    } else {
      fetchSheet(range)
        .then((items) => {
          if (items.length === 0) throw new Error('sheet returned no rows')
          if (!cancelled) setState({ items, status: 'ready' })
        })
        .catch(fail)
    }
    return () => {
      cancelled = true
    }
  }, [range])

  return state
}
