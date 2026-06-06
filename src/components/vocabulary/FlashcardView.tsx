import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Shuffle, RotateCw, Lightbulb, Mic, MicOff } from 'lucide-react'
import { vocabularyWords } from '../../data/vocabulary'
import { shuffleArray } from '../../utils/helpers'
import { generateMnemonic, checkSpokenDefinition, transcribeAudio } from '../../utils/aiService'
import { useLocalStorage } from '../../hooks/useLocalStorage'
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
  const [apiKey] = useLocalStorage<string | null>('gre-groq-key', null)

  const [aiMnemonic, setAiMnemonic] = useState('')
  const [imagePrompt, setImagePrompt] = useState('')
  const [mnemonicLoading, setMnemonicLoading] = useState(false)

  const [isRecording, setIsRecording] = useState(false)
  const [audioResult, setAudioResult] = useState('')
  const [audioLoading, setAudioLoading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleMnemonic = async () => {
    if (!currentWord || mnemonicLoading || !apiKey) return
    setMnemonicLoading(true)
    try {
      const result = await generateMnemonic(currentWord.word, currentWord.definition, apiKey)
      setAiMnemonic(result.mnemonic)
      setImagePrompt(result.imagePrompt)
    } catch {
      setAiMnemonic('Failed to generate mnemonic. Check your API key.')
    }
    setMnemonicLoading(false)
  }

  const startRecording = async () => {
    if (!apiKey) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        if (blob.size < 100) return

        setAudioLoading(true)
        try {
          const transcript = await transcribeAudio(blob, apiKey)
          const result = await checkSpokenDefinition(
            currentWord?.word || '',
            currentWord?.definition || '',
            transcript,
            apiKey
          )
          setAudioResult(result.startsWith('correct') ? '✓ Correct!' : '✗ ' + result)
        } catch {
          setAudioResult('✗ Error checking answer.')
        }
        setAudioLoading(false)
      }

      audioChunksRef.current = []
      recorder.start()
      setIsRecording(true)

      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop()
          setIsRecording(false)
        }
      }, 4000)
    } catch {
      setAudioResult('✗ Microphone access denied.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

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
    setAiMnemonic('')
    setImagePrompt('')
    setAudioResult('')
  }, [currentIndex])

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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {apiKey && (
                  <button
                    onClick={e => { e.stopPropagation(); isRecording ? stopRecording() : startRecording() }}
                    style={{
                      background: isRecording ? 'var(--accent)' : 'var(--bg-card)',
                      border: '2px solid var(--primary)',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isRecording ? '#fff' : 'var(--primary)',
                      transition: 'all 0.2s',
                    }}
                    title={isRecording ? 'Stop recording' : 'Speak the definition'}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                )}
                {!isRecording && audioResult && (
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: audioResult.startsWith('✓') ? 'var(--secondary)' : 'var(--accent)',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                    {audioResult}
                  </div>
                )}
                {audioLoading && (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Transcribing...</div>
                )}
              </div>
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

              {apiKey && (
                <section className="flash-answer-section" style={{ borderStyle: 'dashed' }}>
                  {!aiMnemonic ? (
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={e => { e.stopPropagation(); handleMnemonic() }}
                        disabled={mnemonicLoading}
                        style={{
                          background: 'none',
                          border: '1px solid var(--primary)',
                          borderRadius: 'var(--radius)',
                          padding: '8px 16px',
                          color: 'var(--primary)',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: mnemonicLoading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          opacity: mnemonicLoading ? 0.6 : 1,
                        }}
                      >
                        <Lightbulb size={14} />
                        {mnemonicLoading ? 'Generating...' : 'Help me remember'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flash-label" style={{ color: 'var(--primary)' }}>AI Mnemonic</div>
                      <p style={{ fontSize: 15, lineHeight: 1.6 }}>{aiMnemonic}</p>
                      {imagePrompt && (
                        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid var(--border-light)', paddingTop: 8 }}>
                          Image prompt: {imagePrompt}
                        </div>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); setAiMnemonic(''); setImagePrompt('') }}
                        style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', padding: 0 }}
                      >
                        Clear
                      </button>
                    </div>
                  )}
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
