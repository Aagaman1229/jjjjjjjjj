import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../../data/questions'
import { vocabQuestions } from '../../data/questions_vocab'
import { mockTests } from '../../data/mocktests'
import { passages } from '../../data/passages'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Timer } from './Timer'
import { ETSQuestionArea } from './ETSQuestionArea'
import { ETSNavigatorGrid } from './ETSNavigatorGrid'
import type { MockTestResult, PracticeResult, Question, Passage } from '../../types'

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

const ETS_BLUE = '#0f4b8e'
const ETS_GREEN = '#2e7d32'
const ETS_TEXT = '#1a1a1a'
const ETS_MUTED = '#666666'
const ETS_WARN = '#cc3300'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function lookupQuestions(ids: string[]): Question[] {
  const lookup = new Map(allQuestions.map(q => [q.id, q]))
  return ids.map(id => lookup.get(id)).filter((q): q is Question => q !== undefined)
}

function getPassageForQuestion(q: Question): Passage | null {
  if (!q.passageId) return null
  return passages.find(p => p.id === q.passageId) || null
}

function getSectionInstructions(type: 'quant' | 'verbal', sectionName: string): string[] {
  if (type === 'quant') {
    return [
      `Section: ${sectionName}`,
      '20 Questions',
      '35 Minutes',
      'You may use a calculator for this section.',
      'All numbers used are real numbers.',
      'Figures are drawn as accurately as possible EXCEPT when it is stated that a figure is not drawn to scale.',
      'Select the single best answer choice for each question unless otherwise directed.',
    ]
  }
  return [
    `Section: ${sectionName}`,
    '20 Questions',
    '30 Minutes',
    'This section includes reading comprehension passages and questions about them.',
    'For each question, select the best answer from the choices given.',
    'Some questions will require you to select more than one answer.',
    'Answer choices that are partially correct on multiple-select questions are considered incorrect.',
  ]
}

function SectionInstructionsOverlay({
  sectionName,
  sectionType,
  onStart,
}: {
  sectionName: string
  sectionType: 'quant' | 'verbal'
  onStart: () => void
}) {
  const instructions = getSectionInstructions(sectionType, sectionName)
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: 'Arial, Helvetica, sans-serif',
    }}>
      <div style={{
        maxWidth: 600,
        padding: 48,
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#000',
          marginBottom: 32,
          letterSpacing: 0.5,
        }}>
          GRE® General Test
        </h1>
        <div style={{
          borderTop: '2px solid #000',
          borderBottom: '2px solid #000',
          padding: '24px 0',
          marginBottom: 32,
        }}>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#000' }}>
            {sectionName}
          </p>
          <p style={{ fontSize: 14, color: ETS_MUTED }}>
            {sectionType === 'quant' ? 'Quantitative Reasoning' : 'Verbal Reasoning'}
          </p>
        </div>
        <ul style={{
          textAlign: 'left',
          fontSize: 13,
          lineHeight: 1.8,
          color: ETS_TEXT,
          marginBottom: 40,
          paddingLeft: 20,
          listStyle: 'none',
        }}>
          {instructions.map((line, i) => (
            <li key={i} style={{ marginBottom: 4, position: 'relative', paddingLeft: 16 }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              {line}
            </li>
          ))}
        </ul>
        <button
          onClick={onStart}
          style={{
            padding: '12px 48px',
            background: ETS_BLUE,
            color: '#fff',
            border: 'none',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: 0.5,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function SectionEndDialog({
  answered,
  total,
  marked,
  onReview,
  onContinue,
}: {
  answered: number
  total: number
  marked: number
  onReview: () => void
  onContinue: () => void
}) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: 'Arial, Helvetica, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        padding: 32,
        maxWidth: 440,
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}>
        <h2 style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#000',
          marginBottom: 20,
        }}>
          End Section
        </h2>
        <div style={{
          fontSize: 14,
          color: ETS_TEXT,
          lineHeight: 1.8,
          marginBottom: 24,
        }}>
          <p style={{ marginBottom: 8 }}>
            You have answered <strong>{answered}</strong> of <strong>{total}</strong> questions.
          </p>
          {marked > 0 && (
            <p style={{ marginBottom: 8 }}>
              <strong>{marked}</strong> question{marked !== 1 ? 's' : ''} marked for review.
            </p>
          )}
          {answered < total && (
            <p style={{ color: ETS_WARN, fontSize: 13, marginTop: 12 }}>
              You have unanswered questions. Unanswered questions will be counted as incorrect.
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            onClick={onReview}
            style={{
              padding: '10px 24px',
              background: '#fff',
              border: '1px solid #999',
              color: ETS_TEXT,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Review Questions
          </button>
          <button
            onClick={onContinue}
            style={{
              padding: '10px 24px',
              background: ETS_BLUE,
              border: 'none',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            End Section
          </button>
        </div>
      </div>
    </div>
  )
}

function ResultsScreen({
  sectionScores,
  testConfig,
  onRetry,
}: {
  sectionScores: { correct: number; total: number }[]
  testConfig: { type: 'fixed'; data: typeof mockTests[0] } | { type: 'random'; data: typeof RANDOM_CONFIGS[0] } | null
  onRetry: () => void
}) {
  const navigate = useNavigate()
  const totalCorrect = sectionScores.reduce((s, sc) => s + sc.correct, 0)
  const totalQuestions = sectionScores.reduce((s, sc) => s + sc.total, 0)
  const estScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 340) : 0
  const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  return (
    <div style={{
      maxWidth: 520,
      margin: '40px auto',
      padding: 40,
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: ETS_TEXT,
    }}>
      <h1 style={{
        fontSize: 24,
        fontWeight: 700,
        color: '#000',
        marginBottom: 8,
        textAlign: 'center',
      }}>
        Practice Test Complete
      </h1>
      <p style={{
        fontSize: 14,
        color: ETS_MUTED,
        textAlign: 'center',
        marginBottom: 32,
      }}>
        Estimated GRE Score
      </p>

      <div style={{
        textAlign: 'center',
        marginBottom: 32,
      }}>
        <div style={{
          fontSize: 56,
          fontWeight: 700,
          color: ETS_BLUE,
          lineHeight: 1,
          marginBottom: 4,
        }}>
          ~{estScore}
        </div>
        <div style={{
          fontSize: 14,
          color: ETS_MUTED,
        }}>
          out of 340
        </div>
        <div style={{
          fontSize: 13,
          color: ETS_MUTED,
          marginTop: 4,
        }}>
          {totalCorrect}/{totalQuestions} correct ({pct}%)
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #ddd',
        paddingTop: 24,
        marginBottom: 32,
      }}>
        {sectionScores.map((s, i) => {
          const sections = testConfig?.type === 'fixed'
            ? testConfig.data.sections
            : RANDOM_CONFIGS[0].sections
          const sectionPct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
          return (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #eee',
              fontSize: 14,
            }}>
              <span style={{ fontWeight: 600 }}>{sections[i]?.name || `Section ${i + 1}`}</span>
              <span>
                {s.correct}/{s.total}
                <span style={{ color: ETS_MUTED, marginLeft: 8 }}>
                  ({sectionPct}%)
                </span>
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          onClick={onRetry}
          style={{
            padding: '12px 24px',
            background: '#fff',
            border: '1px solid #999',
            color: ETS_TEXT,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try Another Test
        </button>
        <button
          onClick={() => navigate('/analytics')}
          style={{
            padding: '12px 24px',
            background: ETS_BLUE,
            color: '#fff',
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          View Analytics
        </button>
      </div>
    </div>
  )
}

function TestSelector({
  onSelectTest,
}: {
  onSelectTest: (testId: string) => void
}) {
  return (
    <div style={{
      maxWidth: 700,
      margin: '0 auto',
      padding: 40,
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: ETS_TEXT,
    }}>
      <h1 style={{
        fontSize: 24,
        fontWeight: 700,
        color: '#000',
        marginBottom: 28,
      }}>
        GRE Practice Tests
      </h1>

      <div style={{ marginBottom: 36 }}>
        <h2 style={{
          fontSize: 13,
          fontWeight: 700,
          color: ETS_MUTED,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Predefined Tests
        </h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {mockTests.map(test => (
            <button
              key={test.id}
              onClick={() => onSelectTest(test.id)}
              style={{
                padding: '14px 20px',
                border: '1px solid #ddd',
                background: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'border-color 150ms',
                fontFamily: 'inherit',
              }}
              onMouseOver={e => (e.currentTarget.style.borderColor = ETS_BLUE)}
              onMouseOut={e => (e.currentTarget.style.borderColor = '#ddd')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#000', marginBottom: 2 }}>
                  {test.name}
                </div>
                <div style={{ fontSize: 12, color: ETS_MUTED }}>
                  {test.sections.filter(s => s.type !== 'writing').length} sections · {test.totalQuestions} questions · ~{test.duration} min
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {test.sections.map((sec, i) => (
                  <span key={i} style={{
                    fontSize: 10,
                    padding: '2px 6px',
                    background: sec.type === 'quant' ? '#e8f0fe' : '#e8f5e9',
                    color: sec.type === 'quant' ? ETS_BLUE : ETS_GREEN,
                    fontWeight: 600,
                  }}>
                    {sec.type === 'quant' ? 'Q' : sec.type === 'verbal' ? 'V' : 'W'}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{
          fontSize: 13,
          fontWeight: 700,
          color: ETS_MUTED,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Random Tests
        </h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {RANDOM_CONFIGS.map(config => (
            <button
              key={config.id}
              onClick={() => onSelectTest(config.id)}
              style={{
                padding: '14px 20px',
                border: '1px solid #ddd',
                background: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 150ms',
                fontFamily: 'inherit',
              }}
              onMouseOver={e => (e.currentTarget.style.borderColor = ETS_BLUE)}
              onMouseOut={e => (e.currentTarget.style.borderColor = '#ddd')}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: '#000', marginBottom: 2 }}>
                {config.name}
              </div>
              <div style={{ fontSize: 12, color: ETS_MUTED }}>
                {config.sections.length} section{config.sections.length > 1 ? 's' : ''} · {config.sections.reduce((s, sec) => s + sec.count, 0)} questions
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MockTestView() {
  const [started, setStarted] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({})
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set())
  const [showCalculator, setShowCalculator] = useState(false)
  const [, setTestResults] = useLocalStorage<MockTestResult[]>('gre-mock-test-results', [])
  const [, setPracticeResults] = useLocalStorage<PracticeResult[]>('gre-practice-results', [])
  const [completed, setCompleted] = useState(false)
  const [sectionScores, setSectionScores] = useState<{ correct: number; total: number }[]>([])
  const [showInstructions, setShowInstructions] = useState(true)
  const [showSectionEnd, setShowSectionEnd] = useState(false)
  const [sectionTimerKey, setSectionTimerKey] = useState(0)

  const mainRef = useRef<HTMLDivElement>(null)

  const testConfig = useMemo(() => {
    if (selectedTestId === null) return null
    const fixed = mockTests.find(t => t.id === selectedTestId)
    if (fixed) return { type: 'fixed' as const, data: fixed }
    const random = RANDOM_CONFIGS.find(t => t.id === selectedTestId)
    if (random) return { type: 'random' as const, data: random }
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
    return shuffleArray(pool).slice(0, sec.count)
  }, [testConfig, sectionIndex])

  const sectionConfig = useMemo(() => {
    if (!testConfig) return null
    const sections = testConfig.type === 'fixed' ? testConfig.data.sections : testConfig.data.sections
    return sections[sectionIndex] || null
  }, [testConfig, sectionIndex])

  const q = sectionQuestions[currentQ]
  const currentPassage = useMemo(() => q ? getPassageForQuestion(q) : null, [q])

  const answeredCount = useMemo(
    () => sectionQuestions.filter(sq => correctMap[sq.id] !== undefined).length,
    [sectionQuestions, correctMap]
  )
  const markedCount = markedForReview.size

  const timerRunning = started && !showInstructions && !completed

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (started && !completed) {
        e.preventDefault()
        e.returnValue = 'You are in the middle of a practice test. Are you sure you want to leave?'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [started, completed])

  const handleStartTest = (testId: string) => {
    setSelectedTestId(testId)
    setStarted(true)
    setSectionIndex(0)
    setCurrentQ(0)
    setCorrectMap({})
    setMarkedForReview(new Set())
    setSectionScores([])
    setCompleted(false)
    setShowInstructions(true)
    setShowSectionEnd(false)
    setSectionTimerKey(k => k + 1)
  }

  const handleStartSection = () => {
    setShowInstructions(false)
    setSectionTimerKey(k => k + 1)
  }

  const handleAnswer = useCallback((_correct: boolean) => {
    if (!q) return
    setCorrectMap(prev => ({ ...prev, [q.id]: _correct }))
  }, [q])

  const toggleMark = () => {
    if (!q) return
    setMarkedForReview(prev => {
      const next = new Set(prev)
      if (next.has(q.id)) next.delete(q.id)
      else next.add(q.id)
      return next
    })
  }

  const clearResponse = () => {
    if (!q) return
    setCorrectMap(prev => {
      const next = { ...prev }
      delete next[q.id]
      return next
    })
  }

  const goToQuestion = (i: number) => {
    setCurrentQ(i)
  }

  const handleSectionEnd = useCallback(() => {
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

    const totalSections = testConfig?.type === 'fixed'
      ? testConfig.data.sections.length
      : (testConfig?.data.sections.length || 0)

    if (testConfig && sectionIndex < totalSections - 1) {
      setShowInstructions(true)
      setSectionIndex(i => i + 1)
      setCurrentQ(0)
      setSectionScores(allScores)
      setShowSectionEnd(false)
    } else {
      const totalCorrect = allScores.reduce((s, sc) => s + sc.correct, 0)
      const totalQuestions = allScores.reduce((s, sc) => s + sc.total, 0)
      const estScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 340) : 0

      const result: MockTestResult = {
        testId: `mock-${Date.now()}`,
        date: new Date().toISOString(),
        scores: allScores.map((s, i) => {
          const sections = testConfig?.type === 'fixed'
            ? testConfig.data.sections
            : RANDOM_CONFIGS[0].sections
          return { section: sections[i]?.name || `Section ${i + 1}`, correct: s.correct, total: s.total }
        }),
        totalScore: estScore,
        timePerQuestion: {},
      }
      setTestResults(prev => [...prev, result])
      setSectionScores(allScores)
      setShowSectionEnd(false)
      setCompleted(true)
      setTimerRunning(false)
    }
  }, [sectionQuestions, correctMap, sectionScores, sectionIndex, testConfig, setPracticeResults, setTestResults])

  const handleTimeUp = useCallback(() => {
    handleSectionEnd()
  }, [handleSectionEnd])

  const openSectionEnd = () => {
    setShowSectionEnd(true)
  }

  if (!started) {
    return <TestSelector onSelectTest={handleStartTest} />
  }

  if (completed) {
    return (
      <ResultsScreen
        sectionScores={sectionScores}
        testConfig={testConfig}
        onRetry={() => {
          setStarted(false)
          setCompleted(false)
          setSelectedTestId(null)
          setSectionIndex(0)
          setCurrentQ(0)
          setCorrectMap({})
          setMarkedForReview(new Set())
          setSectionScores([])
          setShowInstructions(true)
          setShowSectionEnd(false)
        }}
      />
    )
  }

  if (showInstructions && sectionConfig) {
    return (
      <SectionInstructionsOverlay
        sectionName={sectionConfig.name}
        sectionType={'type' in sectionConfig ? (sectionConfig as { type: 'quant' | 'verbal' }).type : 'quant'}
        onStart={handleStartSection}
      />
    )
  }

  if (showSectionEnd) {
    return (
      <SectionEndDialog
        answered={answeredCount}
        total={sectionQuestions.length}
        marked={markedCount}
        onReview={() => setShowSectionEnd(false)}
        onContinue={handleSectionEnd}
      />
    )
  }

  if (!q || !sectionConfig) {
    const allScores = [...sectionScores, { correct: 0, total: 0 }]
    setSectionScores(allScores)
    return null
  }

  const isQuant = q.type === 'quant'
  const isVerbalRC = q.subtype === 'reading_comp' && currentPassage
  const cols = isVerbalRC ? '1fr 1fr' : '1fr'

  return (
    <div
      ref={mainRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: ETS_TEXT,
        background: '#fff',
        position: 'fixed',
        inset: 0,
        zIndex: 500,
      }}
    >
      {/* ── TOP BAR ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 50,
        background: '#f0f0f0',
        borderBottom: '1px solid #ccc',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>
          {sectionConfig.name}
          <span style={{ fontWeight: 400, color: ETS_MUTED, marginLeft: 8, fontSize: 12 }}>
            ({q.type === 'quant' ? 'Quantitative' : 'Verbal'} Reasoning)
          </span>
        </div>
        <Timer
          key={sectionTimerKey}
          duration={(sectionConfig as { duration: number }).duration || 2100}
          running={timerRunning}
          onTimeUp={handleTimeUp}
        />
        <div style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>
          Question <span style={{ color: ETS_BLUE }}>{currentQ + 1}</span> of {sectionQuestions.length}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Question Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          padding: isVerbalRC ? 0 : 24,
        }}>
          {isVerbalRC && currentPassage ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: cols,
              flex: 1,
              overflow: 'hidden',
            }}>
              <div style={{
                overflow: 'auto',
                padding: 24,
                borderRight: '1px solid #ddd',
                background: '#fafafa',
              }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: ETS_MUTED,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 16,
                }}>
                  Passage
                </div>
                <div style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: ETS_TEXT,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}>
                  {currentPassage.content}
                </div>
                <div style={{
                  marginTop: 16,
                  fontSize: 11,
                  color: ETS_MUTED,
                  fontStyle: 'italic',
                }}>
                  Source: {currentPassage.source} · {currentPassage.wordCount} words
                </div>
              </div>
              <div style={{ overflow: 'auto', padding: 24 }}>
                <ETSQuestionArea
                  question={q}
                  onAnswer={handleAnswer}
                  correctMap={correctMap}
                />
              </div>
            </div>
          ) : (
            <div style={{
              flex: 1,
              overflow: 'auto',
              maxWidth: 800,
              margin: '0 auto',
              width: '100%',
            }}>
              <ETSQuestionArea
                question={q}
                onAnswer={handleAnswer}
                correctMap={correctMap}
              />
            </div>
          )}
        </div>

        {/* ── NAVIGATOR SIDEBAR ── */}
        <div style={{
          width: 200,
          borderLeft: '1px solid #ddd',
          padding: 16,
          overflowY: 'auto',
          flexShrink: 0,
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <ETSNavigatorGrid
            total={sectionQuestions.length}
            current={currentQ}
            correctMap={correctMap}
            markedForReview={markedForReview}
            sectionQuestions={sectionQuestions}
            onGoTo={goToQuestion}
          />

          {isQuant && (
            <button
              onClick={() => setShowCalculator(v => !v)}
              style={{
                marginTop: 16,
                padding: '8px 12px',
                background: showCalculator ? '#e8f0fe' : '#fff',
                border: '1px solid #999',
                color: ETS_TEXT,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
            </button>
          )}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderTop: '1px solid #ccc',
        background: '#f0f0f0',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setCurrentQ(i => Math.max(0, i - 1))}
            disabled={currentQ === 0}
            style={{
              padding: '8px 20px',
              background: '#fff',
              border: '1px solid #999',
              color: currentQ === 0 ? '#ccc' : ETS_TEXT,
              fontSize: 13,
              fontWeight: 600,
              cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQ === 0 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQ(i => Math.min(sectionQuestions.length - 1, i + 1))}
            disabled={currentQ >= sectionQuestions.length - 1}
            style={{
              padding: '8px 20px',
              background: ETS_BLUE,
              border: 'none',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: currentQ >= sectionQuestions.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentQ >= sectionQuestions.length - 1 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={toggleMark}
            style={{
              padding: '8px 16px',
              background: markedForReview.has(q.id) ? '#fff3cd' : '#fff',
              border: `1px solid ${markedForReview.has(q.id) ? '#ffc107' : '#999'}`,
              color: markedForReview.has(q.id) ? '#856404' : ETS_TEXT,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {markedForReview.has(q.id) ? 'Marked for Review' : 'Mark for Review'}
          </button>
          <button
            onClick={clearResponse}
            style={{
              padding: '8px 16px',
              background: '#fff',
              border: '1px solid #999',
              color: ETS_TEXT,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Clear Response
          </button>
        </div>

        <button
          onClick={openSectionEnd}
          style={{
            padding: '8px 20px',
            background: '#fff',
            border: '1px solid #999',
            color: ETS_TEXT,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {testConfig && sectionIndex < (testConfig.type === 'fixed' ? testConfig.data.sections.length : testConfig.data.sections.length) - 1
            ? 'Section End'
            : 'Finish Test'}
        </button>
      </div>

      {/* ── CALCULATOR OVERLAY ── */}
      {showCalculator && isQuant && (
        <ETSCalculatorModal onClose={() => setShowCalculator(false)} />
      )}
    </div>
  )
}

function ETSCalculatorModal({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0')
  const [memory, setMemory] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [newEntry, setNewEntry] = useState(true)
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: 80 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleNumber = (n: string) => {
    if (newEntry) {
      setDisplay(n)
      setNewEntry(false)
    } else {
      setDisplay(prev => prev === '0' ? n : prev + n)
    }
  }

  const handleOperator = (op: string) => {
    setPrevValue(parseFloat(display))
    setOperator(op)
    setNewEntry(true)
  }

  const handleEquals = () => {
    if (prevValue === null || !operator) return
    const curr = parseFloat(display)
    let result = 0
    switch (operator) {
      case '+': result = prevValue + curr; break
      case '-': result = prevValue - curr; break
      case '×': result = prevValue * curr; break
      case '÷': result = curr !== 0 ? prevValue / curr : NaN; break
    }
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
    setNewEntry(true)
  }

  const handleSqrt = () => {
    const curr = parseFloat(display)
    if (curr >= 0) {
      setDisplay(String(Math.sqrt(curr)))
      setNewEntry(true)
    }
  }

  const handlePlusMinus = () => {
    setDisplay(prev => String(-parseFloat(prev)))
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setNewEntry(true)
  }

  const handleClearEntry = () => {
    setDisplay('0')
    setNewEntry(true)
  }

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setDisplay(String(memory))
      setNewEntry(true)
    }
  }

  const handleMemoryClear = () => setMemory(null)
  const handleMemoryPlus = () => setMemory((memory || 0) + parseFloat(display))
  const handleMemoryMinus = () => setMemory((memory || 0) - parseFloat(display))

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  useEffect(() => {
    if (!dragging) return
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y })
    }
    const handleMouseUp = () => setDragging(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const btnBase: React.CSSProperties = {
    padding: 8,
    border: '1px solid #808080',
    background: '#fff',
    color: '#000',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  }

  const opBtn: React.CSSProperties = {
    ...btnBase,
    background: '#f0f0f0',
  }

  const memBtn: React.CSSProperties = {
    ...btnBase,
    fontSize: 10,
    fontWeight: 700,
    background: '#e8e8e8',
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 260,
        background: '#f5f5f5',
        border: '2px solid #666',
        boxShadow: '4px 4px 12px rgba(0,0,0,0.25)',
        zIndex: 2000,
        fontFamily: 'Arial, sans-serif',
        userSelect: 'none',
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 10px',
          background: '#e0e0e0',
          borderBottom: '1px solid #999',
          cursor: 'move',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#000' }}>Calculator</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer',
            color: '#333',
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: 8 }}>
        <div style={{
          padding: '6px 8px',
          background: '#fff',
          border: '1px solid #999',
          textAlign: 'right',
          fontSize: 18,
          fontFamily: '"Courier New", monospace',
          fontWeight: 700,
          marginBottom: 8,
          minHeight: 32,
          overflow: 'hidden',
          color: '#000',
        }}>
          {display}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          <div onClick={handleMemoryClear} style={memBtn}>MC</div>
          <div onClick={handleMemoryRecall} style={memBtn}>MR</div>
          <div onClick={handleMemoryPlus} style={memBtn}>M+</div>
          <div onClick={handleMemoryMinus} style={memBtn}>M−</div>

          <div onClick={() => handleNumber('7')} style={btnBase}>7</div>
          <div onClick={() => handleNumber('8')} style={btnBase}>8</div>
          <div onClick={() => handleNumber('9')} style={btnBase}>9</div>
          <div onClick={() => handleOperator('÷')} style={opBtn}>÷</div>

          <div onClick={() => handleNumber('4')} style={btnBase}>4</div>
          <div onClick={() => handleNumber('5')} style={btnBase}>5</div>
          <div onClick={() => handleNumber('6')} style={btnBase}>6</div>
          <div onClick={() => handleOperator('×')} style={opBtn}>×</div>

          <div onClick={() => handleNumber('1')} style={btnBase}>1</div>
          <div onClick={() => handleNumber('2')} style={btnBase}>2</div>
          <div onClick={() => handleNumber('3')} style={btnBase}>3</div>
          <div onClick={() => handleOperator('-')} style={opBtn}>−</div>

          <div onClick={() => handleNumber('0')} style={btnBase}>0</div>
          <div onClick={() => handleNumber('.')} style={btnBase}>.</div>
          <div onClick={handlePlusMinus} style={opBtn}>±</div>
          <div onClick={() => handleOperator('+')} style={opBtn}>+</div>

          <div onClick={handleClear} style={{ ...btnBase, fontWeight: 700, color: '#c00' }}>C</div>
          <div onClick={handleClearEntry} style={btnBase}>CE</div>
          <div onClick={handleSqrt} style={opBtn}>√</div>
          <div onClick={handleEquals} style={{ ...btnBase, background: ETS_BLUE, color: '#fff', fontWeight: 700 }}>=</div>
        </div>
      </div>
    </div>
  )
}

export default MockTestView
