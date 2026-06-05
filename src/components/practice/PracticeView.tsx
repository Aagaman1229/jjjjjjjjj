import { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Timer } from 'lucide-react'
import { questions } from '../../data/questions'
import { vocabQuestions } from '../../data/questions_vocab'
import { passages } from '../../data/passages'
import { QuestionCard } from './QuestionCard'
import { formatTime } from '../../utils/helpers'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { PracticeResult, Passage } from '../../types'

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 500,
}

export function PracticeView() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type') || 'all'
  const [topic, setTopic] = useState('all')
  const [type, setType] = useState(initialType)
  const [difficulty, setDifficulty] = useState('all')
  const [started, setStarted] = useState(false)

  // Reset topic when type changes and current topic doesn't belong to that type
  const handleTypeChange = (newType: string) => {
    setType(newType)
    if (topic !== 'all') {
      const belongs = newType === 'all' || allQuestions.some(q => q.type === newType && q.topic === topic)
      if (!belongs) setTopic('all')
    }
  }
  const [currentQ, setCurrentQ] = useState(0)
  const [results, setResults] = useLocalStorage<PracticeResult[]>('gre-practice-results', [])
  const [sessionResults, setSessionResults] = useState<{ correct: boolean; timestamp: number }[]>([])
  const [elapsed, setElapsed] = useState(0)
  const sessionStartRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (started) {
      sessionStartRef.current = Date.now()
      setElapsed(0)
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - sessionStartRef.current) / 1000))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [started])

  const allQuestions = useMemo(() => {
    return [...questions, ...vocabQuestions]
  }, [])

  // Topics filtered by selected type (so quant topics only show when type=quant)
  const availableTopics = useMemo(() => {
    const pool = type === 'all' ? allQuestions : allQuestions.filter(q => q.type === type)
    return [...new Set(pool.map(q => q.topic))].sort()
  }, [type, allQuestions])

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      if (topic !== 'all' && q.topic !== topic) return false
      if (type !== 'all' && q.type !== type) return false
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false
      return true
    })
  }, [topic, type, difficulty, allQuestions])

  const currentPassage = useMemo(() => {
    const q = filteredQuestions[currentQ]
    if (!q || !q.passageId) return null
    return passages.find(p => p.id === q.passageId) || null
  }, [filteredQuestions, currentQ])

  const handleAnswer = (correct: boolean) => {
    const result: PracticeResult = {
      questionId: filteredQuestions[currentQ].id,
      correct,
      timeSpent: elapsed,
      timestamp: Date.now(),
      topic: filteredQuestions[currentQ].topic,
    }
    setResults(prev => [...prev, result])
    setSessionResults(prev => [...prev, { correct, timestamp: Date.now() }])
  }

  const nextQuestion = () => {
    if (currentQ < filteredQuestions.length - 1) {
      setCurrentQ(i => i + 1)
    }
  }

  const correctCount = sessionResults.filter(r => r.correct).length

  if (!started) {
    return (
      <div>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0 }}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Practice Questions</h1>

        <div style={{ display: 'grid', gap: 16, maxWidth: 500 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Type</label>
            <select value={type} onChange={e => handleTypeChange(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: 14 }}>
              <option value="all">All Types</option>
              <option value="quant">Quantitative</option>
              <option value="verbal">Verbal</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Topic</label>
            <select value={topic} onChange={e => setTopic(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: 14 }}>
              <option value="all">All Topics</option>
              {availableTopics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Difficulty</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: 14 }}>
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            onClick={() => { setCurrentQ(0); setSessionResults([]); setStarted(true) }}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius)',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            Start Practice ({filteredQuestions.length} questions)
          </button>
        </div>
      </div>
    )
  }

  if (currentQ >= filteredQuestions.length) {
    const total = sessionResults.length
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{pct >= 70 ? '🎉' : '💪'}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Session Complete!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
          You got {correctCount} of {total} correct ({pct}%)
        </p>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Timer size={14} /> Total time: {formatTime(elapsed)}
        </p>
        <button onClick={() => { setSessionResults([]); setCurrentQ(0); setStarted(false) }}
          style={{ padding: '12px 24px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
          Practice More
        </button>
      </div>
    )
  }

  const q = filteredQuestions[currentQ]
  if (!q) return null

  const totalSession = sessionResults.length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Practice Session</h2>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Question {currentQ + 1} of {filteredQuestions.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
            <Timer size={14} /> {formatTime(elapsed)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--secondary)' }}>
            <CheckCircle size={14} /> {correctCount}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--accent)' }}>
            <XCircle size={14} /> {totalSession - correctCount}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${((currentQ + 1) / filteredQuestions.length) * 100}%`, background: 'var(--primary)', borderRadius: 2, transition: 'width 0.3s' }} />
        </div>
      </div>

      {currentPassage && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          marginBottom: 16,
          maxHeight: 400,
          overflow: 'auto',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Passage · {currentPassage.source}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
            {currentPassage.content}
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 16 }}>
        <QuestionCard key={q.id} question={q} onAnswer={handleAnswer} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setCurrentQ(i => Math.max(0, i - 1))} disabled={currentQ === 0} style={{ ...btnStyle, opacity: currentQ === 0 ? 0.5 : 1 }}>
          Previous
        </button>
        <button onClick={nextQuestion} disabled={currentQ >= filteredQuestions.length - 1} style={{ ...btnStyle, opacity: currentQ >= filteredQuestions.length - 1 ? 0.5 : 1 }}>
          Next
        </button>
      </div>
    </div>
  )
}
