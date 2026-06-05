import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Flag, CheckCircle, Clock, Calculator as CalcIcon, BookOpen } from 'lucide-react'
import { questions } from '../../data/questions'
import { vocabQuestions } from '../../data/questions_vocab'
import { mockTests } from '../../data/mocktests'
import { passages } from '../../data/passages'
import { QuestionCard } from '../practice/QuestionCard'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { formatTime } from '../../utils/helpers'
import { Timer } from './Timer'
import type { MockTestResult, PracticeResult, Question } from '../../types'

const allQuestions: Question[] = [...questions, ...vocabQuestions]

const RANDOM_CONFIGS = [
  { id: 'random_full', name: 'Random Full Test', sections: [
    { name: 'Section 1: Quant', type: 'quant' as const, count: 20, duration: 35 * 60 },
    { name: 'Section 2: Verbal', type: 'verbal' as const, count: 20, duration: 30 * 60 },
    { name: 'Section 3: Quant', type: 'quant' as const, count: 20, duration: 35 * 60 },
    { name: 'Section 4: Verbal', type: 'verbal' as const, count: 20, duration: 30 * 60 },
  ]},
  { id: 'random_quant', name: 'Random Quant Only', sections: [
    { name: 'Quantitative Reasoning', type: 'quant' as const, count: 20, duration: 35 * 60 },
  ]},
  { id: 'random_verbal', name: 'Random Verbal Only', sections: [
    { name: 'Verbal Reasoning', type: 'verbal' as const, count: 20, duration: 30 * 60 },
  ]},
]

function lookupQuestions(ids: string[]): Question[] {
  const lookup = new Map(allQuestions.map(q => [q.id, q]))
  return ids.map(id => lookup.get(id)).filter((q): q is Question => q !== undefined)
}

export function MockTestView() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({})
  const [reachedQuestions, setReachedQuestions] = useState<Set<string>>(new Set())
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set())
  const [showCalculator, setShowCalculator] = useState(false)
  const [testResults, setTestResults] = useLocalStorage<MockTestResult[]>('gre-mock-test-results', [])
  const [, setPracticeResults] = useLocalStorage<PracticeResult[]>('gre-practice-results', [])
  const [completed, setCompleted] = useState(false)
  const [sectionScores, setSectionScores] = useState<{ correct: number; total: number }[]>([])

  const testConfig = useMemo(() => {
    if (selectedTestId === null) return null
    const fixed = mockTests.find(t => t.id === selectedTestId)
    if (fixed) {
      return { type: 'fixed' as const, data: fixed }
    }
    const random = RANDOM_CONFIGS.find(t => t.id === selectedTestId)
    if (random) {
      return { type: 'random' as const, data: random }
    }
    return null
  }, [selectedTestId])

  const sectionQuestions = useMemo((): Question[] => {
    if (!testConfig) return []

    if (testConfig.type === 'fixed') {
      const sec = testConfig.data.sections[sectionIndex]
      if (!sec) return []
      return lookupQuestions(sec.questions)
    }

    const sec = testConfig.data.sections[sectionIndex]
    if (!sec) return []
    const pool = allQuestions.filter(q => q.type === sec.type)
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, sec.count)
  }, [testConfig, sectionIndex])

  const sectionConfig = useMemo(() => {
    if (!testConfig) return null
    if (testConfig.type === 'fixed') return testConfig.data.sections[sectionIndex]
    return testConfig.data.sections[sectionIndex]
  }, [testConfig, sectionIndex])

  const q = sectionQuestions[currentQ]

  const currentPassage = useMemo(() => {
    if (!q || !q.passageId) return null
    return passages.find(p => p.id === q.passageId) || null
  }, [q])

  const handleAnswer = useCallback((_correct: boolean) => {
    if (!q) return
    setCorrectMap(prev => ({ ...prev, [q.id]: _correct }))
    if (!reachedQuestions.has(q.id)) {
      setReachedQuestions(prev => new Set(prev).add(q.id))
    }
  }, [q, reachedQuestions])

  const toggleMark = () => {
    if (!q) return
    setMarkedForReview(prev => {
      const next = new Set(prev)
      if (next.has(q.id)) next.delete(q.id)
      else next.add(q.id)
      return next
    })
  }

  const goToQuestion = (i: number) => {
    setCurrentQ(i)
  }

  const finishSection = useCallback(() => {
    const sectionQ = sectionQuestions
    const correct = sectionQ.filter(q => correctMap[q.id] === true).length
    const newScore = { correct, total: sectionQ.length }
    const allScores = [...sectionScores, newScore]

    setPracticeResults(prev => [
      ...prev,
      ...sectionQ.map(q => ({
        questionId: q.id,
        correct: correctMap[q.id] === true,
        timeSpent: 30,
        timestamp: Date.now(),
        topic: q.topic,
      })),
    ])

    if (testConfig && sectionIndex < (testConfig.type === 'fixed' ? testConfig.data.sections.length : testConfig.data.sections.length) - 1) {
      setSectionIndex(i => i + 1)
      setCurrentQ(0)
      setSectionScores(allScores)
      setReachedQuestions(new Set())
    } else {
      const totalCorrect = allScores.reduce((s, sc) => s + sc.correct, 0)
      const totalQuestions = allScores.reduce((s, sc) => s + sc.total, 0)
      const estScore = Math.round((totalCorrect / totalQuestions) * 340)

      const result: MockTestResult = {
        testId: `mock-${Date.now()}`,
        date: new Date().toISOString(),
        scores: allScores.map((s, i) => {
          const sections = testConfig && testConfig.type === 'fixed'
            ? testConfig.data.sections : RANDOM_CONFIGS[0].sections
          return { section: sections[i]?.name || `Section ${i + 1}`, correct: s.correct, total: s.total }
        }),
        totalScore: estScore,
        timePerQuestion: {},
      }
      setTestResults(prev => [...prev, result])
      setSectionScores(allScores)
      setCompleted(true)
    }
  }, [sectionQuestions, correctMap, sectionScores, sectionIndex, testConfig])

  const handleTimeUp = useCallback(() => {
    finishSection()
  }, [finishSection])

  const answeredCount = Object.keys(correctMap).length
  const markedCount = markedForReview.size

  // ── Start Screen ──
  if (!started) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Mock Tests</h1>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--text-secondary)' }}>Predefined Tests</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockTests.map(test => (
              <div
                key={test.id}
                onClick={() => { setSelectedTestId(test.id); setStarted(true) }}
                style={{
                  padding: '16px 20px',
                  border: `2px solid ${selectedTestId === test.id ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  background: selectedTestId === test.id ? 'rgba(99,102,241,0.06)' : 'var(--bg-card)',
                  transition: 'all var(--transition)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{test.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {test.sections.filter(s => s.type !== 'writing').length} sections · {test.sections.filter(s => s.type !== 'writing').reduce((s, sec) => s + sec.questions.length, 0)} questions · ~{test.duration} min
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  {test.sections.map((sec, i) => (
                    <span key={i} style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: sec.type === 'quant' ? 'rgba(26,115,232,0.1)' : sec.type === 'verbal' ? 'rgba(52,168,83,0.1)' : 'rgba(234,67,53,0.1)',
                      color: sec.type === 'quant' ? '#1a73e8' : sec.type === 'verbal' ? '#34a853' : '#ea4335',
                      fontWeight: 500,
                    }}>
                      {sec.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--text-secondary)' }}>Random Tests</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {RANDOM_CONFIGS.map(config => (
              <div
                key={config.id}
                onClick={() => { setSelectedTestId(config.id); setStarted(true) }}
                style={{
                  padding: '16px 20px',
                  border: '2px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  background: 'var(--bg-card)',
                  transition: 'all var(--transition)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{config.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {config.sections.length} section{config.sections.length > 1 ? 's' : ''} · {config.sections.reduce((s, sec) => s + sec.count, 0)} questions · ~{config.sections.reduce((s, sec) => s + Math.round(sec.duration / 60), 0)} min
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Completed Screen ──
  if (completed) {
    const totalCorrect = sectionScores.reduce((s, sc) => s + sc.correct, 0)
    const totalQuestions = sectionScores.reduce((s, sc) => s + sc.total, 0)
    const estScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 340) : 0
    const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Test Complete!</h2>
        <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>
          ~{estScore}
        </div>
        <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>
          Estimated GRE Score (out of 340)
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
          {totalCorrect}/{totalQuestions} correct ({pct}%)
        </div>
        <div style={{ display: 'grid', gap: 8, marginBottom: 24, textAlign: 'left' }}>
          {sectionScores.map((s, i) => {
            const sections = testConfig && testConfig.type === 'fixed'
              ? testConfig.data.sections : RANDOM_CONFIGS[0].sections
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
                <span style={{ fontSize: 14 }}>{sections[i]?.name || `Section ${i + 1}`}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.correct}/{s.total}</span>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={() => { setStarted(false); setCompleted(false); setSelectedTestId(null); setSectionIndex(0); setCurrentQ(0); setCorrectMap({}); setMarkedForReview(new Set()); setSectionScores([]); setReachedQuestions(new Set()) }}
            style={{ padding: '12px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: 'var(--text)' }}
          >
            Try Another Test
          </button>
          <button
            onClick={() => navigate('/analytics')}
            style={{ padding: '12px 24px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            View Analytics
          </button>
        </div>
      </div>
    )
  }

  if (!q || !sectionConfig) return null

  // ── Test Interface ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{sectionConfig.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Question {currentQ + 1} of {sectionQuestions.length}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Timer duration={sectionConfig.duration} running={!completed} onTimeUp={handleTimeUp} />
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Answered: {answeredCount}/{sectionQuestions.length}
          </div>
          {markedCount > 0 && (
            <div style={{ fontSize: 12, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flag size={12} /> {markedCount} marked
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>
        {/* Left - Question Navigator */}
        <div style={{
          width: 200,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 12,
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Questions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {sectionQuestions.map((sq, i) => {
              const isAnswered = correctMap[sq.id] !== undefined
              const isMarked = markedForReview.has(sq.id)
              const isActive = i === currentQ
              return (
                <div
                  key={sq.id}
                  onClick={() => goToQuestion(i)}
                  style={{
                    padding: '6px 4px',
                    textAlign: 'center',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isActive ? 'var(--primary)' : isAnswered ? 'var(--bg-secondary)' : 'transparent',
                    color: isActive ? '#fff' : isAnswered ? 'var(--secondary)' : 'var(--text)',
                    border: isMarked ? '2px solid var(--warning)' : '1px solid var(--border)',
                    transition: 'all var(--transition)',
                  }}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}><div style={{ width: 10, height: 10, background: 'var(--secondary)', borderRadius: 2 }} /> Answered</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}><div style={{ width: 10, height: 10, border: '2px solid var(--warning)', borderRadius: 2 }} /> Marked</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, background: 'var(--primary)', borderRadius: 2 }} /> Current</div>
          </div>
        </div>

        {/* Center - Question */}
        <div style={{
          flex: 1,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 24,
          overflowY: 'auto',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            {q.type} · {q.topic} · {q.difficulty}
          </div>

          {currentPassage && (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 20,
              marginBottom: 16,
              maxHeight: 300,
              overflow: 'auto',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                <BookOpen size={12} style={{ marginRight: 4 }} /> Passage · {currentPassage.source}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
                {currentPassage.content}
              </div>
            </div>
          )}

          <QuestionCard
            key={`${sectionIndex}-${currentQ}`}
            question={q}
            onAnswer={handleAnswer}
            mockMode
          />
        </div>

        {/* Right - Tools Panel */}
        <div style={{
          width: 180,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 16,
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            Tools
          </div>

          <button
            onClick={toggleMark}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: markedForReview.has(q.id) ? '#fffbeb' : 'var(--bg-secondary)',
              border: `1px solid ${markedForReview.has(q.id) ? '#fde68a' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              color: markedForReview.has(q.id) ? '#ca8a04' : 'var(--text)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <Flag size={14} /> {markedForReview.has(q.id) ? 'Marked' : 'Mark Review'}
          </button>

          {q.type === 'quant' && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <CalcIcon size={14} /> Calculator
            </button>
          )}

          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
            Section Progress
          </div>
          <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 2, marginBottom: 4 }}>
            <div style={{
              height: '100%',
              width: `${(answeredCount / sectionQuestions.length) * 100}%`,
              background: 'var(--secondary)',
              borderRadius: 2,
              transition: 'width 0.3s',
            }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {answeredCount}/{sectionQuestions.length}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        marginTop: 12,
      }}>
        <button
          onClick={() => setCurrentQ(i => Math.max(0, i - 1))}
          disabled={currentQ === 0}
          style={{
            padding: '10px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
            opacity: currentQ === 0 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <button
          onClick={finishSection}
          style={{
            padding: '10px 20px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {testConfig && sectionIndex < (testConfig.type === 'fixed' ? testConfig.data.sections.length : testConfig.data.sections.length) - 1
            ? 'Next Section →'
            : 'Finish Test'}
        </button>

        <button
          onClick={() => setCurrentQ(i => Math.min(sectionQuestions.length - 1, i + 1))}
          disabled={currentQ >= sectionQuestions.length - 1}
          style={{
            padding: '10px 20px',
            background: 'var(--primary)',
            border: 'none',
            borderRadius: 'var(--radius)',
            color: '#fff',
            cursor: currentQ >= sectionQuestions.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentQ >= sectionQuestions.length - 1 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
