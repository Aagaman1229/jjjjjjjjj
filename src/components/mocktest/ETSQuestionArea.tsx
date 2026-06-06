import { useState, useRef, useEffect, useMemo } from 'react'
import type { Question } from '../../types'
import { GeometryFigure } from '../practice/GeometryFigure'

const letters = 'ABCDEFGH'
const ETS_BLUE = '#0f4b8e'
const ETS_TEXT = '#1a1a1a'
const ETS_MUTED = '#666666'
const ETS_BORDER = '#c0c0c0'
const ETS_GREEN = '#2e7d32'

interface ETSQuestionAreaProps {
  question: Question
  onAnswer: (correct: boolean) => void
  correctMap: Record<string, boolean>
}

function QCOptions({ question, onAnswer, answered }: { question: Question; onAnswer: (label: string) => void; answered: boolean }) {
  const labels = ['A', 'B', 'C', 'D']
  const texts = [
    'Quantity A is greater.',
    'Quantity B is greater.',
    'The two quantities are equal.',
    'The relationship cannot be determined from the information given.',
  ]

  return (
    <div>
      {texts.map((text, i) => {
        const label = labels[i]
        const isSelected = question.answer === label && answered
        return (
          <div
            key={i}
            onClick={() => !answered && onAnswer(label)}
            style={{
              padding: '10px 14px',
              marginBottom: 6,
              border: `1px solid ${isSelected ? ETS_BLUE : ETS_BORDER}`,
              background: isSelected ? '#e8f0fe' : '#fff',
              cursor: answered ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 14,
              lineHeight: 1.5,
              color: ETS_TEXT,
              opacity: answered && !isSelected ? 0.5 : 1,
            }}
          >
            <input
              type="radio"
              checked={isSelected}
              readOnly
              style={{ marginTop: 2, accentColor: ETS_BLUE }}
            />
            <span><strong>{label}.</strong> {text}</span>
          </div>
        )
      })}
    </div>
  )
}

function StandardMCQ({ question, onAnswer, answered }: { question: Question; onAnswer: (label: string) => void; answered: boolean }) {
  return (
    <div>
      {question.choices?.map((choice, i) => {
        const label = letters[i]
        const choiceText = choice.replace(/^[A-Z][.)\s]+/, '').trim()
        const isAnswer = answered && label === question.answer
        return (
          <div
            key={i}
            onClick={() => !answered && onAnswer(label)}
            style={{
              padding: '10px 14px',
              marginBottom: 6,
              border: `1px solid ${isAnswer ? ETS_BLUE : ETS_BORDER}`,
              background: isAnswer ? '#e8f0fe' : '#fff',
              cursor: answered ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 14,
              lineHeight: 1.5,
              color: ETS_TEXT,
              opacity: answered && !isAnswer ? 0.5 : 1,
            }}
          >
            <input
              type="radio"
              checked={isAnswer}
              readOnly
              style={{ marginTop: 2, accentColor: ETS_BLUE }}
            />
            <span><strong>{label}.</strong> {choiceText}</span>
          </div>
        )
      })}
    </div>
  )
}

function MultiSelect({ question, onAnswer, answered }: { question: Question; onAnswer: (selected: string[]) => void; answered: boolean }) {
  const selectCount = question.selectCount || 2
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const prevSelectedRef = useRef(selected)

  useEffect(() => {
    if (prevSelectedRef.current === selected) return
    prevSelectedRef.current = selected
    if (selectCount > 0 && selected.size === selectCount) {
      onAnswer(Array.from(selected))
    }
  }, [selected, selectCount, onAnswer])

  const toggle = (label: string) => {
    if (answered) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else if (selectCount === 0 || next.size < selectCount) {
        next.add(label)
      }
      return next
    })
  }

  const correctSet = useMemo(() => {
    if (question.answers && question.answers.length > 0) {
      return new Set(question.answers)
    }
    return new Set(question.answer.split(',').map(s => s.trim()).filter(Boolean))
  }, [question.answers, question.answer])

  return (
    <div>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: ETS_MUTED,
        marginBottom: 12,
        fontStyle: 'italic',
      }}>
        {selectCount > 1 ? `Select exactly ${selectCount} answer choices.` : 'Select all that apply.'}
        {selected.size > 0 && selectCount > 0 && (
          <span> ({selected.size}/{selectCount} chosen)</span>
        )}
      </div>
      {question.choices?.map((choice, i) => {
        const label = letters[i]
        const choiceText = choice.replace(/^[A-Z][.)\s]+/, '').trim()
        const isSel = selected.has(label)
        const isCorrect = correctSet.has(label)
        return (
          <div
            key={i}
            onClick={() => toggle(label)}
            style={{
              padding: '10px 14px',
              marginBottom: 6,
              border: `1px solid ${
                answered && isCorrect ? ETS_GREEN
                : answered && isSel ? '#c00'
                : isSel ? ETS_BLUE
                : ETS_BORDER
              }`,
              background: answered && isCorrect ? '#e8f5e9'
                : answered && isSel && !isCorrect ? '#ffebee'
                : isSel ? '#e8f0fe'
                : '#fff',
              cursor: answered ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 14,
              lineHeight: 1.5,
              color: ETS_TEXT,
            }}
          >
            <input
              type="checkbox"
              checked={isSel || (answered && isCorrect)}
              readOnly
              style={{ marginTop: 2, accentColor: ETS_BLUE }}
            />
            <span><strong>{label}.</strong> {choiceText}</span>
          </div>
        )
      })}
    </div>
  )
}

function TextCompletion({ question, onAnswer, answered }: { question: Question; onAnswer: () => void; answered: boolean }) {
  let blankGroups: string[][]
  if (question.blankGroups && question.blankGroups.length > 0) {
    blankGroups = question.blankGroups
  } else if (question.choices && question.choices.length > 0) {
    const stripped = question.choices.map(c => c.replace(/^[A-Z][.)\s]+/, '').trim())
    blankGroups = [stripped]
  } else {
    blankGroups = [[]]
  }

  const numBlanks = blankGroups.length
  const [selections, setSelections] = useState<string[]>(Array(numBlanks).fill(''))
  const allSelected = selections.every(s => s !== '')

  useEffect(() => {
    if (allSelected && !answered) {
      onAnswer()
    }
  }, [allSelected, answered, onAnswer])

  const handleSelect = (blankIdx: number, value: string) => {
    if (answered) return
    const next = [...selections]
    next[blankIdx] = value
    setSelections(next)
  }

  const correctAnswers = useMemo(() => {
    return question.answers || question.answer.split(',').map(s => s.trim())
  }, [question.answers, question.answer])

  const stemParts = question.stem.split(/\(i+\)|_{3,}|___/g)

  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: ETS_MUTED, marginBottom: 12, fontStyle: 'italic' }}>
        For each blank, select the word or phrase that best completes the text.
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
        {stemParts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx < numBlanks && (
              <select
                value={selections[idx]}
                onChange={e => handleSelect(idx, e.target.value)}
                disabled={answered}
                style={{
                  margin: '0 4px',
                  padding: '4px 8px',
                  border: `2px solid ${
                    answered
                      ? selections[idx] === (correctAnswers[idx] || '') ? ETS_GREEN : '#c00'
                      : ETS_BORDER
                  }`,
                  borderRadius: 0,
                  background: '#fff',
                  color: ETS_TEXT,
                  fontSize: 14,
                  fontWeight: 600,
                  minWidth: 130,
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
    </div>
  )
}

export function ETSQuestionArea({ question, onAnswer, correctMap }: ETSQuestionAreaProps) {
  const answered = correctMap[question.id] !== undefined

  const handleSelect = (label: string) => {
    if (answered) return
    const isCorrect = label === question.answer
    onAnswer(isCorrect)
  }

  const handleMultiSelect = (selected: string[]) => {
    if (answered) return
    const correctSet = new Set(
      question.answers?.length
        ? question.answers
        : question.answer.split(',').map(s => s.trim()).filter(Boolean)
    )
    const isCorrect = correctSet.size === selected.length && selected.every(v => correctSet.has(v))
    onAnswer(isCorrect)
  }

  const handleTextCompletion = () => {
    onAnswer(true)
  }

  const isTextCompletion = question.subtype === 'text_completion'
  const isSentenceEq = question.subtype === 'sentence_equivalence'
  const isMultiSelect = isSentenceEq || question.selectCount !== undefined
  const isQC = question.subtype === 'qc'

  const showAnswerFeedback = answered && correctMap[question.id]

  return (
    <div>
      {/* Question Stem */}
      {question.figure && <GeometryFigure figure={question.figure} />}

      <div style={{
        fontSize: 15,
        lineHeight: 1.7,
        marginBottom: 20,
        fontWeight: 500,
        color: '#000',
      }}>
        {question.stem}
      </div>

      {/* Answer Area */}
      {isTextCompletion ? (
        <TextCompletion
          question={question}
          onAnswer={handleTextCompletion}
          answered={answered}
        />
      ) : isMultiSelect ? (
        <MultiSelect
          question={question}
          onAnswer={handleMultiSelect}
          answered={answered}
        />
      ) : isQC ? (
        <QCOptions
          question={question}
          onAnswer={handleSelect}
          answered={answered}
        />
      ) : (
        <StandardMCQ
          question={question}
          onAnswer={handleSelect}
          answered={answered}
        />
      )}

      {/* Answer feedback */}
      {answered && (
        <div style={{
          marginTop: 16,
          padding: 12,
          background: showAnswerFeedback ? '#e8f5e9' : '#ffebee',
          border: `1px solid ${showAnswerFeedback ? ETS_GREEN : '#c00'}`,
          fontSize: 13,
          color: ETS_TEXT,
          lineHeight: 1.6,
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: 14,
            color: showAnswerFeedback ? ETS_GREEN : '#c00',
            marginBottom: 6,
          }}>
            {showAnswerFeedback ? '✓ Correct' : '✗ Incorrect'}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {question.explanation || 'No explanation available.'}
          </div>
        </div>
      )}
    </div>
  )
}
