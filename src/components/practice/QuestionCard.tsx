import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import type { Question } from '../../types'
import { GeometryFigure } from './GeometryFigure'
import { triggerSocraticTutor } from '../common/AiChat'

interface QuestionCardProps {
  question: Question
  onAnswer: (correct: boolean) => void
  showExplanation?: boolean
  mockMode?: boolean
}

const letters = 'ABCDEFGH'

function optionStyle(
  selected: boolean,
  revealed: boolean,
  isCorrect: boolean
): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 1.5,
    color: 'var(--text)',
    transition: 'all var(--transition)',
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  }

  if (!revealed) {
    return {
      ...base,
      border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
      background: selected ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
    }
  }

  if (isCorrect) {
    return {
      ...base,
      border: '2px solid var(--secondary)',
      background: 'rgba(52,168,83,0.12)',
    }
  }

  if (selected && !isCorrect) {
    return {
      ...base,
      border: '2px solid var(--accent)',
      background: 'rgba(234,67,53,0.12)',
    }
  }

  return {
    ...base,
    border: '2px solid var(--border)',
    background: 'var(--bg-card)',
    opacity: 0.5,
  }
}

function BlanksRenderer({ question, onAnswer, mockMode }: { question: Question; onAnswer: (correct: boolean) => void; mockMode?: boolean }) {
  // Support both new format (blankGroups) and old format (flat choices with "A. word" prefix)
  let blankGroups: string[][]
  if (question.blankGroups && question.blankGroups.length > 0) {
    blankGroups = question.blankGroups
  } else if (question.choices && question.choices.length > 0) {
    // Old format: single blank with choices like "A. indifference"
    const stripped = question.choices.map(c => c.replace(/^[A-Z][.)\s]+/, '').trim())
    blankGroups = [stripped]
  } else {
    blankGroups = [[]]
  }
  const numBlanks = blankGroups.length
  const [selections, setSelections] = useState<string[]>(Array(numBlanks).fill(''))
  const [revealed, setRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const allSelected = selections.every(s => s !== '')

  const handleSelect = (blankIdx: number, value: string) => {
    if (revealed) return
    const next = [...selections]
    next[blankIdx] = value
    setSelections(next)
    if (mockMode) {
      const allFilled = next.every(s => s !== '')
      if (allFilled) {
        const correctAnswers = question.answers || question.answer.split(',').map(s => s.trim())
        const correct = next.every((s, i) => {
          const expected = correctAnswers[i] || ''
          return s === expected
        })
        setIsCorrect(correct)
        onAnswer(correct)
      }
    }
  }

  const handleSubmit = () => {
    if (revealed) return
    const allFilled = selections.every(s => s !== '')
    if (!allFilled) return
    const correctAnswers = question.answers || question.answer.split(',').map(s => s.trim())
    const correct = selections.every((s, i) => {
      const expected = correctAnswers[i] || ''
      return s === expected
    })
    setIsCorrect(correct)
    onAnswer(correct)
    if (!mockMode) {
      setRevealed(true)
    }
  }

  const stemParts = question.stem.split(/\(i+\)|_{3,}|___/g)

  return (
    <div>
      {question.figure && <GeometryFigure figure={question.figure} />}
      <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>
        {stemParts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx < numBlanks && (
              <select
                value={selections[idx]}
                onChange={e => handleSelect(idx, e.target.value)}
                disabled={revealed}
                style={{
                  margin: '0 4px',
                  padding: '4px 8px',
                  border: `2px solid ${
                    revealed
                      ? selections[idx] === ((question.answers || [])[idx] || '')
                        ? 'var(--secondary)'
                        : 'var(--accent)'
                      : 'var(--border)'
                  }`,
                  borderRadius: 'var(--radius)',
                  background: 'var(--bg-card)',
                  color: 'var(--text)',
                  fontSize: 14,
                  fontWeight: 600,
                  minWidth: 120,
                }}
              >
                <option value="">______</option>
                {blankGroups[idx].map((ch, ci) => (
                  <option key={ci} value={ch}>{ch}</option>
                ))}
              </select>
            )}
          </span>
        ))}
      </div>

      {!mockMode && !revealed && (
        <button
          onClick={handleSubmit}
          disabled={!allSelected}
          style={{
            padding: '10px 24px',
            border: 'none',
            borderRadius: 'var(--radius)',
            background: allSelected ? 'var(--primary)' : 'var(--border)',
            color: allSelected ? '#fff' : 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 600,
            cursor: allSelected ? 'pointer' : 'not-allowed',
            marginBottom: 16,
          }}
        >
          Submit Answer
        </button>
      )}

      {!mockMode && revealed && (
        <div style={{
          marginTop: 16,
          padding: 20,
          borderRadius: 'var(--radius)',
          background: isCorrect ? 'rgba(52,168,83,0.1)' : 'rgba(234,67,53,0.1)',
          border: `1px solid ${isCorrect ? 'rgba(52,168,83,0.3)' : 'rgba(234,67,53,0.3)'}`,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15, color: isCorrect ? 'var(--secondary)' : 'var(--accent)' }}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
            {question.explanation || 'No explanation available.'}
          </div>
        </div>
      )}
    </div>
  )
}

function MultiSelectRenderer({ question, onAnswer, mockMode }: { question: Question; onAnswer: (correct: boolean) => void; mockMode?: boolean }) {
  const selectCount = question.selectCount || 2
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [revealed, setRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Compute correct answers: prefer `answers` array, fallback to parsing `answer` string
  const correctSet = useMemo(() => {
    if (question.answers && question.answers.length > 0) {
      return new Set(question.answers)
    }
    // Old format: "B, D" or "B,D"
    return new Set(question.answer.split(',').map(s => s.trim()).filter(Boolean))
  }, [question.answers, question.answer])

  const prevSelectedRef = useRef(selected)
  useEffect(() => {
    if (!mockMode || revealed) return
    if (prevSelectedRef.current === selected) return
    prevSelectedRef.current = selected
    const shouldSubmit = (
      (selectCount > 0 && selected.size === selectCount) ||
      (selectCount === 0 && selected.size > 0)
    )
    if (shouldSubmit) {
      handleSubmit()
    }
  }, [selected, mockMode, revealed, selectCount])

  const toggle = (label: string) => {
    if (revealed) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else if (selectCount === 0 || next.size < selectCount) {
        // selectCount=0 means "select all that apply" (no limit)
        next.add(label)
      }
      return next
    })
  }

  const handleSubmit = () => {
    if (revealed) return
    const userSet = new Set(selected)
    const correct = correctSet.size === userSet.size && [...correctSet].every(v => userSet.has(v))
    setIsCorrect(correct)
    onAnswer(correct)
    if (!mockMode) {
      setRevealed(true)
    }
  }

  const numToSelect = selectCount > 0 ? `Select ${selectCount}` : 'Select all that apply'
  const canSubmit = selectCount > 0 ? selected.size === selectCount : selected.size > 0

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, fontStyle: 'italic' }}>
        {numToSelect} {selected.size > 0 && selectCount > 0 && `(${selected.size}/${selectCount} chosen)`}
      </div>
      {question.figure && <GeometryFigure figure={question.figure} />}
      <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>
        {question.stem}
      </div>
      {question.choices && (
        <div>
          {question.choices.map((choice, i) => {
            const label = letters[i]
            const choiceText = choice.replace(/^[A-Z][.)\s]+/, '').trim()
            const isSel = selected.has(label)
            return (
              <div
                key={i}
                onClick={() => toggle(label)}
                style={optionStyle(isSel, revealed, correctSet.has(label))}
              >
                <input
                  type="checkbox"
                  checked={isSel}
                  readOnly
                  style={{ accentColor: 'var(--primary)', marginTop: 2 }}
                />
                <span><strong>{label}.</strong> {choiceText}</span>
              </div>
            )
          })}
        </div>
      )}

      {!mockMode && !revealed && (
        <button
          onClick={handleSubmit}
          disabled={selectCount > 0 && selected.size !== selectCount}
          style={{
            padding: '10px 24px',
            border: 'none',
            borderRadius: 'var(--radius)',
            background: (selectCount > 0 ? selected.size === selectCount : selected.size > 0) ? 'var(--primary)' : 'var(--border)',
            color: (selectCount > 0 ? selected.size === selectCount : selected.size > 0) ? '#fff' : 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 600,
            cursor: (selectCount > 0 ? selected.size === selectCount : selected.size > 0) ? 'pointer' : 'not-allowed',
            marginTop: 12,
          }}
        >
          Submit Answer
        </button>
      )}

      {!mockMode && revealed && (
        <div style={{
          marginTop: 16,
          padding: 20,
          borderRadius: 'var(--radius)',
          background: isCorrect ? 'rgba(52,168,83,0.1)' : 'rgba(234,67,53,0.1)',
          border: `1px solid ${isCorrect ? 'rgba(52,168,83,0.3)' : 'rgba(234,67,53,0.3)'}`,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15, color: isCorrect ? 'var(--secondary)' : 'var(--accent)' }}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
            {question.explanation || 'No explanation available.'}
          </div>
        </div>
      )}
    </div>
  )
}

export function QuestionCard({ question, onAnswer, showExplanation = true, mockMode = false }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correct, setCorrect] = useState<boolean | null>(null)

  const handleSelect = useCallback((choice: string) => {
    if (!mockMode && revealed) return
    const isCorrect = choice === question.answer
    setSelected(choice)
    setCorrect(isCorrect)
    onAnswer(isCorrect)
    if (!mockMode) {
      setRevealed(true)
    }
  }, [mockMode, revealed, question.answer, onAnswer])

  // Determine renderer based on subtype and available data
  const isTextCompletion = question.subtype === 'text_completion'
  const isSentenceEq = question.subtype === 'sentence_equivalence'
  const needsMultiSelect = isSentenceEq || question.selectCount !== undefined

  // Text completion: use blank renderer if blankGroups exist, or single-blank dropdown
  if (isTextCompletion) {
    return <BlanksRenderer question={question} onAnswer={onAnswer} mockMode={mockMode} />
  }

  // Sentence equivalence or any multi-select question
  if (needsMultiSelect) {
    const count = question.selectCount !== undefined ? question.selectCount : 2
    return <MultiSelectRenderer question={{ ...question, selectCount: count }} onAnswer={onAnswer} mockMode={mockMode} />
  }

  // Reading comp with select-all
  if (question.subtype === 'reading_comp' && question.answer === 'ALL') {
    return <MultiSelectRenderer question={{ ...question, selectCount: 0 }} onAnswer={onAnswer} mockMode={mockMode} />
  }

  // Standard single-select MCQ
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
        {question.type} · {question.topic} · {question.difficulty}
      </div>

      {question.figure && <GeometryFigure figure={question.figure} />}

      <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>
        {question.stem}
      </div>

      {question.subtype === 'qc' ? (
        <div>
          {[
            'Quantity A is greater',
            'Quantity B is greater',
            'The two quantities are equal',
            'The relationship cannot be determined from the information given',
          ].map((text, i) => {
            const label = letters[i]
            const isAnswer = label === question.answer
            return (
              <div
                key={i}
                onClick={() => handleSelect(label)}
                style={optionStyle(selected === label, revealed && !mockMode, isAnswer)}
              >
                <input
                  type="radio"
                  checked={selected === label}
                  readOnly
                  style={{ accentColor: 'var(--primary)', marginTop: 2 }}
                />
                <span><strong>{label}.</strong> {text}</span>
              </div>
            )
          })}
        </div>
      ) : question.choices && (
        <div>
          {question.choices.map((choice, i) => {
            const label = letters[i]
            const choiceText = choice.replace(/^[A-Z][.)\s]+/, '')
            const isAnswer = label === question.answer || choice.startsWith(question.answer)
            return (
              <div
                key={i}
                onClick={() => handleSelect(label)}
                style={optionStyle(selected === label, revealed && !mockMode, isAnswer)}
              >
                <input
                  type="radio"
                  checked={selected === label}
                  readOnly
                  style={{ accentColor: 'var(--primary)', marginTop: 2 }}
                />
                <span><strong>{label}.</strong> {choiceText}</span>
              </div>
            )
          })}
        </div>
      )}

      {!mockMode && revealed && showExplanation && (
        <div style={{
          marginTop: 16,
          padding: 20,
          borderRadius: 'var(--radius)',
          background: correct ? 'rgba(52,168,83,0.1)' : 'rgba(234,67,53,0.1)',
          border: `1px solid ${correct ? 'rgba(52,168,83,0.3)' : 'rgba(234,67,53,0.3)'}`,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15, color: correct ? 'var(--secondary)' : 'var(--accent)' }}>
            {correct ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
            {question.explanation || 'No explanation available.'}
          </div>
          {correct === false && (
            <button
              onClick={() => triggerSocraticTutor(question.stem, selected || '', question.answer)}
              style={{
                marginTop: 12,
                padding: '8px 18px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--primary)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Socratic Tutor
            </button>
          )}
        </div>
      )}
    </div>
  )
}
