import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Shuffle, RotateCw } from 'lucide-react'
import { vocabularyWords } from '../../data/vocabulary'
import { shuffleArray } from '../../utils/helpers'
import type { VocabularyWord } from '../../types'

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  padding: '2px 10px',
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 600,
  background: bg,
  color,
})

export function FlashcardView() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shuffled, setShuffled] = useState<VocabularyWord[]>(() => shuffleArray(vocabularyWords))
  const [filter, setFilter] = useState<string>('all')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const filteredWords = useMemo(() => {
    if (filter === 'all') return shuffled
    return shuffled.filter(w => w.difficulty === filter)
  }, [shuffled, filter])

  const currentWord = filteredWords[currentIndex]
  const totalCards = filteredWords.length
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalCards) {
      setCurrentIndex(index)
      setFlipped(false)
    }
  }, [totalCards])

  const goNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      goTo(currentIndex + 1)
    }
  }, [currentIndex, totalCards, goTo])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1)
    }
  }, [currentIndex, goTo])

  const reshuffle = () => {
    setShuffled(prev => shuffleArray(prev))
    setCurrentIndex(0)
    setFlipped(false)
  }

  useEffect(() => {
    setCurrentIndex(0)
    setFlipped(false)
  }, [filter])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    const threshold = 60
    if (diff > threshold) goPrev()
    else if (diff < -threshold) goNext()
    setTouchStart(null)
  }

  const diffMap: Record<string, { bg: string; color: string }> = {
    easy: { bg: '#dcfce7', color: '#16a34a' },
    medium: { bg: '#fef9c3', color: '#ca8a04' },
    hard: { bg: '#fecaca', color: '#dc2626' },
  }

  const freqMap: Record<string, { bg: string; color: string }> = {
    high: { bg: '#e0f2fe', color: '#0284c7' },
    medium: { bg: '#f3e8ff', color: '#7c3aed' },
    low: { bg: '#f1f5f9', color: '#64748b' },
  }

  if (filteredWords.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <RotateCw size={48} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
        <h2 style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>No words found</h2>
        <p style={{ color: 'var(--text-muted)' }}>Try a different filter.</p>
      </div>
    )
  }

  if (!currentWord) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Flashcards</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{totalCards} words</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text)',
              fontSize: 13,
              fontWeight: 500,
              outline: 'none',
            }}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={reshuffle}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Shuffle size={14} /> Shuffle
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', borderRadius: 2, transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>Card {currentIndex + 1} of {totalCards}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 600, margin: '0 auto' }}>
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text)',
            cursor: currentIndex === 0 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentIndex === 0 ? 0.4 : 1,
            transition: 'all var(--transition)',
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={cardRef}
          onClick={() => setFlipped(f => !f)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            flex: 1,
            minHeight: 320,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
          }}
        >
          {!flipped ? (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
                <span style={badgeStyle(diffMap[currentWord.difficulty].bg, diffMap[currentWord.difficulty].color)}>
                  {currentWord.difficulty}
                </span>
                <span style={badgeStyle(freqMap[currentWord.frequency].bg, freqMap[currentWord.frequency].color)}>
                  {currentWord.frequency}
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', marginBottom: 16 }}>
                {currentWord.word}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Tap or press Space to reveal
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                Definition
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text)', marginBottom: 16, fontWeight: 500 }}>
                {currentWord.definition}
              </div>

              {currentWord.examples.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Example
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{currentWord.examples[0]}"
                  </div>
                </div>
              )}

              {currentWord.synonyms.length > 0 && (
                <div style={{ marginBottom: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--secondary)', fontWeight: 600, marginRight: 2 }}>Synonyms:</span>
                  {currentWord.synonyms.map((s, i) => (
                    <span key={i} style={{ padding: '1px 8px', borderRadius: 8, fontSize: 12, background: 'rgba(52,168,83,0.1)', color: 'var(--secondary)' }}>{s}</span>
                  ))}
                </div>
              )}

              {currentWord.mnemonics && (
                <div style={{
                  marginTop: 8,
                  padding: '8px 12px',
                  background: 'rgba(251,191,36,0.1)',
                  borderRadius: 'var(--radius)',
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: 'var(--text)',
                  border: '1px solid rgba(251,191,36,0.2)',
                }}>
                  <strong style={{ color: 'var(--warning)' }}>🧠 Mnemonic:</strong> {currentWord.mnemonics}
                </div>
              )}

              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                Tap to see word
              </div>
            </div>
          )}
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex >= totalCards - 1}
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: currentIndex >= totalCards - 1 ? 'var(--text-muted)' : 'var(--text)',
            cursor: currentIndex >= totalCards - 1 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentIndex >= totalCards - 1 ? 0.4 : 1,
            transition: 'all var(--transition)',
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Keyboard: ←  → navigate · Space to flip
        </span>
      </div>
    </div>
  )
}
