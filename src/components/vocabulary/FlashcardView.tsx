import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Shuffle, RotateCw } from 'lucide-react'
import { vocabularyWords } from '../../data/vocabulary'
import { shuffleArray } from '../../utils/helpers'
import type { VocabularyWord } from '../../types'

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  padding: '4px 12px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 750,
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

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setCurrentIndex(0)
    setFlipped(false)
  }

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
    easy: { bg: '#dcfce7', color: '#15803d' },
    medium: { bg: '#fef3c7', color: '#b45309' },
    hard: { bg: '#fee2e2', color: '#b91c1c' },
  }

  const freqMap: Record<string, { bg: string; color: string }> = {
    high: { bg: '#dbeafe', color: '#1d4ed8' },
    medium: { bg: '#f3e8ff', color: '#7e22ce' },
    low: { bg: '#f1f5f9', color: '#475569' },
  }

  if (filteredWords.length === 0) {
    return (
      <div className="flash-empty">
        <RotateCw size={48} />
        <h2>No words found</h2>
        <p>Try a different level.</p>
      </div>
    )
  }

  if (!currentWord) return null

  return (
    <div className="flash-page">
      <div className="flash-header">
        <div>
          <div className="vocab-kicker">Vocabulary drill</div>
          <h1 className="flash-title">Flashcards</h1>
          <p className="flash-subtitle">Large cards for focused word recall and quick review.</p>
        </div>
        <div className="flash-controls">
          <select value={filter} onChange={e => handleFilterChange(e.target.value)} className="flash-select">
            <option value="all">All levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={reshuffle} className="flash-button">
            <Shuffle size={15} /> Shuffle
          </button>
        </div>
      </div>

      <div className="flash-progress-wrap">
        <div className="flash-progress-track">
          <div className="flash-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="flash-progress-meta">
          <span>Card {currentIndex + 1} of {totalCards}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      <div className="flash-stage">
        <button onClick={goPrev} disabled={currentIndex === 0} className="flash-nav-btn" aria-label="Previous card">
          <ChevronLeft size={24} />
        </button>

        <div
          ref={cardRef}
          onClick={() => setFlipped(f => !f)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`flash-card ${flipped ? 'is-flipped' : ''}`}
        >
          {!flipped ? (
            <div className="flash-front">
              <div className="flash-badges">
                <span style={badgeStyle(diffMap[currentWord.difficulty].bg, diffMap[currentWord.difficulty].color)}>
                  {currentWord.difficulty}
                </span>
                <span style={badgeStyle(freqMap[currentWord.frequency].bg, freqMap[currentWord.frequency].color)}>
                  {currentWord.frequency} frequency
                </span>
              </div>
              <div className="flash-word">{currentWord.word}</div>
              <div className="flash-hint">Tap card or press Space to reveal meaning</div>
            </div>
          ) : (
            <div className="flash-back">
              <div className="flash-answer-top">
                <div>
                  <div className="flash-label">Word</div>
                  <h2>{currentWord.word}</h2>
                </div>
                <div className="flash-badges compact">
                  <span style={badgeStyle(diffMap[currentWord.difficulty].bg, diffMap[currentWord.difficulty].color)}>
                    {currentWord.difficulty}
                  </span>
                </div>
              </div>

              <section className="flash-answer-section primary">
                <div className="flash-label">Definition</div>
                <p>{currentWord.definition}</p>
              </section>

              {currentWord.examples.length > 0 && (
                <section className="flash-answer-section">
                  <div className="flash-label">Example</div>
                  <p>{currentWord.examples[0]}</p>
                </section>
              )}

              {currentWord.synonyms.length > 0 && (
                <section className="flash-answer-section">
                  <div className="flash-label">Synonyms</div>
                  <div className="flash-chip-row">
                    {currentWord.synonyms.map((s, i) => <span key={i} className="flash-chip green">{s}</span>)}
                  </div>
                </section>
              )}

              {currentWord.mnemonics && (
                <section className="flash-answer-section mnemonic">
                  <div className="flash-label">Mnemonic</div>
                  <p>{currentWord.mnemonics}</p>
                </section>
              )}

              <div className="flash-hint bottom">Tap again to return to the word</div>
            </div>
          )}
        </div>

        <button onClick={goNext} disabled={currentIndex >= totalCards - 1} className="flash-nav-btn" aria-label="Next card">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flash-keyboard-note">Use Arrow keys to move between cards. Press Space to flip.</div>
    </div>
  )
}
