import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, BookOpen, Flame, Layers, Star, X } from 'lucide-react'
import { vocabularyWords } from '../../data/vocabulary'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px 12px 42px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text)',
  fontSize: 15,
  outline: 'none',
}

const btnStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: 13,
  transition: 'all var(--transition)',
}

const difficultyMeta = {
  easy: { label: 'Easy', bg: '#dcfce7', color: '#15803d' },
  medium: { label: 'Medium', bg: '#fef3c7', color: '#b45309' },
  hard: { label: 'Hard', bg: '#fee2e2', color: '#b91c1c' },
}

const frequencyMeta = {
  high: { label: 'High', bg: '#dbeafe', color: '#1d4ed8' },
  medium: { label: 'Medium', bg: '#f3e8ff', color: '#7e22ce' },
  low: { label: 'Low', bg: '#f1f5f9', color: '#475569' },
}

export function VocabView() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<string>('all')
  const [frequency, setFrequency] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useLocalStorage<string[]>('gre-vocab-bookmarks', [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return vocabularyWords.filter(w => {
      if (query && !w.word.toLowerCase().includes(query) && !w.definition.toLowerCase().includes(query)) return false
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

  const highFrequencyCount = vocabularyWords.filter(w => w.frequency === 'high').length
  const hardCount = vocabularyWords.filter(w => w.difficulty === 'hard').length
  const activeFilters = [difficulty !== 'all', frequency !== 'all', Boolean(search.trim())].filter(Boolean).length

  const clearFilters = () => {
    setSearch('')
    setDifficulty('all')
    setFrequency('all')
  }

  return (
    <div className="vocab-page">
      <section className="vocab-hero">
        <div>
          <div className="vocab-kicker">Verbal prep</div>
          <h1 className="vocab-title">GRE Vocabulary</h1>
          <p className="vocab-subtitle">
            Build recall with high-frequency words, concise meanings, examples, and mnemonics.
          </p>
        </div>
        <div className="vocab-stats">
          <div className="vocab-stat">
            <BookOpen size={18} />
            <span>{vocabularyWords.length}</span>
            <small>Total words</small>
          </div>
          <div className="vocab-stat">
            <Flame size={18} />
            <span>{highFrequencyCount}</span>
            <small>High frequency</small>
          </div>
          <div className="vocab-stat">
            <Layers size={18} />
            <span>{hardCount}</span>
            <small>Hard words</small>
          </div>
          <div className="vocab-stat">
            <Star size={18} />
            <span>{bookmarked.length}</span>
            <small>Saved</small>
          </div>
        </div>
      </section>

      <section className="vocab-toolbar">
        <div className="vocab-search">
          <Search size={17} />
          <input
            style={inputStyle}
            placeholder="Search by word or meaning"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="vocab-filters">
          <select style={btnStyle} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="all">All levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select style={btnStyle} value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="all">All frequency</option>
            <option value="high">High frequency</option>
            <option value="medium">Medium frequency</option>
            <option value="low">Low frequency</option>
          </select>
          {activeFilters > 0 && (
            <button className="vocab-clear-btn" onClick={clearFilters}>
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </section>

      <div className="vocab-result-row">
        <span>{filtered.length} words shown</span>
        <span>{activeFilters > 0 ? `${activeFilters} active filter${activeFilters > 1 ? 's' : ''}` : 'No filters applied'}</span>
      </div>

      <div className="vocab-list">
        {filtered.map(w => {
          const isExpanded = expanded === w.id
          const isBookmarked = bookmarked.includes(w.id)
          const diff = difficultyMeta[w.difficulty]
          const freq = frequencyMeta[w.frequency]
          return (
            <div key={w.id} className={`vocab-card ${isExpanded ? 'is-expanded' : ''}`}>
              <div onClick={() => setExpanded(isExpanded ? null : w.id)} className="vocab-card-main">
                <div className="vocab-word-block">
                  <div className="vocab-word-line">
                    <span className="vocab-word">{w.word}</span>
                    {w.mnemonics && <span className="vocab-mini-label">mnemonic</span>}
                  </div>
                  <div className="vocab-definition-preview">{w.definition}</div>
                </div>
                <div className="vocab-actions">
                  <span className="vocab-pill" style={{ background: diff.bg, color: diff.color }}>{diff.label}</span>
                  <span className="vocab-pill" style={{ background: freq.bg, color: freq.color }}>{freq.label}</span>
                  <button
                    onClick={e => { e.stopPropagation(); toggleBookmark(w.id) }}
                    className="vocab-icon-btn"
                    aria-label={isBookmarked ? `Remove ${w.word} bookmark` : `Bookmark ${w.word}`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark word'}
                  >
                    {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                  <span className="vocab-chevron">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="vocab-expanded">
                  <div className="vocab-detail-grid">
                    <div className="vocab-detail-primary">
                      <div className="vocab-section-label">Definition</div>
                      <p>{w.definition}</p>

                      {w.examples.length > 0 && (
                        <div className="vocab-example-box">
                          <div className="vocab-section-label">Example</div>
                          <p>{w.examples[0]}</p>
                        </div>
                      )}

                      {w.mnemonics && (
                        <div className="vocab-mnemonic">
                          <div className="vocab-section-label">Mnemonic</div>
                          <p>{w.mnemonics}</p>
                        </div>
                      )}
                    </div>

                    <div className="vocab-detail-side">
                      {w.synonyms.length > 0 && (
                        <div>
                          <div className="vocab-section-label">Synonyms</div>
                          <div className="vocab-chip-row">
                            {w.synonyms.map((synonym, i) => <span key={i} className="vocab-chip green">{synonym}</span>)}
                          </div>
                        </div>
                      )}

                      {w.antonyms.length > 0 && (
                        <div>
                          <div className="vocab-section-label">Antonyms</div>
                          <div className="vocab-chip-row">
                            {w.antonyms.map((antonym, i) => <span key={i} className="vocab-chip red">{antonym}</span>)}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="vocab-section-label">Tags</div>
                        <div className="vocab-chip-row">
                          {w.tags.map((tag, i) => <span key={i} className="vocab-chip">{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="vocab-empty">
          <Search size={34} />
          <strong>No words found</strong>
          <span>Try clearing filters or searching a shorter phrase.</span>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  )
}
