import type { Question } from '../../types'

const ETS_BLUE = '#0f4b8e'
const ETS_GREEN = '#2e7d32'
const ETS_WARN = '#ed6c02'
const ETS_TEXT = '#1a1a1a'
const ETS_MUTED = '#666666'
const ETS_BORDER = '#c0c0c0'

interface ETSNavigatorGridProps {
  total: number
  current: number
  correctMap: Record<string, boolean>
  markedForReview: Set<string>
  sectionQuestions: Question[]
  onGoTo: (index: number) => void
}

export function ETSNavigatorGrid({
  total,
  current,
  correctMap,
  markedForReview,
  sectionQuestions,
  onGoTo,
}: ETSNavigatorGridProps) {
  const cols = Math.min(5, Math.max(4, Math.ceil(total / 5)))

  return (
    <div>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: ETS_MUTED,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
      }}>
        Question Navigator
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 4,
      }}>
        {Array.from({ length: total }, (_, i) => {
          const sq = sectionQuestions[i]
          const isAnswered = sq ? correctMap[sq.id] !== undefined : false
          const isMarked = sq ? markedForReview.has(sq.id) : false
          const isActive = i === current
          const isNotVisited = !isAnswered && !isActive

          let bg = '#fff'
          let border = ETS_BORDER
          let textColor = ETS_TEXT
          const cursor = 'pointer'

          if (isActive) {
            bg = ETS_BLUE
            border = ETS_BLUE
            textColor = '#fff'
          } else if (isAnswered) {
            bg = '#e8f5e9'
            border = ETS_GREEN
            textColor = ETS_GREEN
          } else if (isNotVisited) {
            bg = '#fff'
            border = '#c0c0c0'
            textColor = ETS_MUTED
          }

          if (isMarked && !isActive) {
            border = ETS_WARN
          }

          const flagIndicator = isMarked && !isActive ? '⚑' : ''

          return (
            <div
              key={i}
              onClick={() => onGoTo(i)}
              title={
                (isAnswered ? 'Answered' : 'Not answered') +
                (isMarked ? ' · Marked for review' : '') +
                ` · Question ${i + 1}`
              }
              style={{
                width: '100%',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                background: bg,
                border: `2px solid ${border}`,
                color: textColor,
                cursor,
                position: 'relative',
                transition: 'background 100ms, border-color 100ms',
              }}
              onMouseOver={e => {
                if (!isActive) e.currentTarget.style.borderColor = ETS_BLUE
              }}
              onMouseOut={e => {
                if (isActive) e.currentTarget.style.borderColor = ETS_BLUE
                else if (isMarked) e.currentTarget.style.borderColor = ETS_WARN
                else if (isAnswered) e.currentTarget.style.borderColor = ETS_GREEN
                else e.currentTarget.style.borderColor = '#c0c0c0'
              }}
            >
              {i + 1}
              {flagIndicator && (
                <span style={{
                  position: 'absolute',
                  top: 1,
                  right: 3,
                  fontSize: 9,
                  color: ETS_WARN,
                }}>
                  {flagIndicator}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontSize: 10,
        color: ETS_MUTED,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, background: ETS_BLUE, border: `1px solid ${ETS_BLUE}` }} />
          Current
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, background: '#e8f5e9', border: `1px solid ${ETS_GREEN}` }} />
          Answered
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, background: '#fff', border: '1px solid #c0c0c0' }} />
          Not Answered
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 12, height: 12, background: '#fff',
            border: '2px solid',
            borderColor: ETS_WARN,
          }} />
          Marked for Review
        </div>
        </div>
    </div>
  )
}
