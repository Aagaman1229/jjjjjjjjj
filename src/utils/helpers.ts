let counter = 0

export function generateShortId(): string {
  counter++
  const ts = Date.now().toString(36)
  const r = Math.random().toString(36).slice(2, 6)
  return `${ts}${r}${counter}`
}

export function generateId(prefix: string): string {
  counter++
  return `${prefix}_${counter}_${Date.now().toString(36)}`
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function getDifficultyColor(d: string): string {
  switch (d) {
    case 'easy': return 'var(--secondary)'
    case 'medium': return 'var(--warning)'
    case 'hard': return 'var(--accent)'
    default: return 'var(--text-secondary)'
  }
}

export function getDifficultyLabel(d: string): string {
  switch (d) {
    case 'easy': return 'Easy'
    case 'medium': return 'Medium'
    case 'hard': return 'Hard'
    default: return 'Unknown'
  }
}
