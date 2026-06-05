import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Bookmark, BookmarkCheck } from 'lucide-react'
import { vocabularyWords } from '../../data/vocabulary'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px 12px 40px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text)',
  fontSize: 15,
  outline: 'none',
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: 13,
  transition: 'all var(--transition)',
}

export function VocabView() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<string>('all')
  const [frequency, setFrequency] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useLocalStorage<string[]>('gre-vocab-bookmarks', [])

  const filtered = useMemo(() => {
    return vocabularyWords.filter(w => {
      if (search && !w.word.toLowerCase().includes(search.toLowerCase()) && !w.definition.toLowerCase().includes(search.toLowerCase())) return false
      if (difficulty !== 'all' && w.difficulty !== difficulty) return false
      if (frequency !== 'all' && w.frequency !== frequency) return false
      return true
    })
  }, [search, difficulty, frequency])

  const toggleBookmark = (id: string) => {
    setBookmarked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
        GRE Vocabulary
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
        {vocabularyWords.length} words from Magoosh, Barron's, Manhattan Prep, and Princeton Review
      </p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            style={inputStyle}
            placeholder="Search words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          style={btnStyle}
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          style={btnStyle}
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
        >
          <option value="all">All Frequency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {filtered.map(w => {
          const isExpanded = expanded === w.id
          const isBookmarked = bookmarked.includes(w.id)
          return (
            <div
              key={w.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'all var(--transition)',
              }}
            >
              <div
                onClick={() => setExpanded(isExpanded ? null : w.id)}
                style={{
                  padding: '14px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{w.word}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {w.definition.substring(0, 80)}{w.definition.length > 80 ? '...' : ''}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    background: w.difficulty === 'easy' ? '#dcfce7' : w.difficulty === 'medium' ? '#fef9c3' : '#fecaca',
                    color: w.difficulty === 'easy' ? '#16a34a' : w.difficulty === 'medium' ? '#ca8a04' : '#dc2626',
                  }}>
                    {w.difficulty}
                  </span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                  }}>
                    {w.frequency}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); toggleBookmark(w.id) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? 'var(--primary)' : 'var(--text-muted)', padding: 4 }}
                  >
                    {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                  {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)', marginTop: 0 }}>
                  <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', marginTop: 12 }}>
                    <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{w.definition}</div>

                    {w.synonyms.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--secondary)' }}>Synonyms: </span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{w.synonyms.join(', ')}</span>
                      </div>
                    )}

                    {w.antonyms.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>Antonyms: </span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{w.antonyms.join(', ')}</span>
                      </div>
                    )}

                    {w.examples.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Examples:</span>
                        <ul style={{ paddingLeft: 16, marginTop: 4, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {w.examples.map((ex, i) => (
                            <li key={i} style={{ fontStyle: 'italic' }}>"{ex}"</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {w.mnemonics && (
                      <div style={{
                        marginTop: 8,
                        padding: '8px 12px',
                        background: '#fffbeb',
                        borderRadius: 'var(--radius)',
                        fontSize: 13,
                        border: '1px solid #fde68a',
                      }}>
                        <strong>🧠 Mnemonic:</strong> {w.mnemonics}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {w.tags.map((tag, i) => (
                        <span key={i} style={{
                          padding: '2px 8px',
                          borderRadius: 12,
                          fontSize: 11,
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          No words found matching your criteria
        </div>
      )}
    </div>
  )
}
