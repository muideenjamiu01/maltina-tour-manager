import { Design } from '@/types/vote.types'
import voteDesigns from '@/data/vote-mock-data'

async function safeFetch(url: string, opts?: RequestInit) {
  try {
    const res = await fetch(url, { ...opts })
    if (!res.ok) throw new Error('Network error')
    return res.json()
  } catch (err) {
    // propagate error to allow fallback
    throw err
  }
}

export async function fetchDesigns(): Promise<Design[]> {
  try {
    const json = await safeFetch('/api/vote')
    return json?.data ?? voteDesigns
  } catch (err) {
    // fallback to local mock data
    return new Promise((resolve) => setTimeout(() => resolve(voteDesigns), 150))
  }
}

export async function fetchDesignById(id: number): Promise<Design | undefined> {
  try {
    const json = await safeFetch(`/api/vote/${id}`)
    return json?.data
  } catch (err) {
    return voteDesigns.find((d) => d.id === id)
  }
}

export async function submitVote(payload: { id: number; email: string; mobile: string }) {
  try {
    const json = await safeFetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return json
  } catch (err) {
    // fallback: mutate in-memory mock and return a similar response
    const design = voteDesigns.find((d) => d.id === payload.id)
    if (design) design.votes = (design.votes || 0) + 1
    return { success: true, data: { id: payload.id, votes: design?.votes } }
  }
}

export default { fetchDesigns, fetchDesignById, submitVote }
