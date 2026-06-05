import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, AlertTriangle, Zap, Beaker } from 'lucide-react'
import { curriculum, getTopicById } from '../../data/curriculum'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function LessonView() {
  const { topicId, lessonId } = useParams()
  const navigate = useNavigate()
  const topic = getTopicById(topicId || '')
  const [activeLesson, setActiveLesson] = useState(lessonId || topic?.lessons?.[0]?.id || '')

  const lesson = topic?.lessons?.find(l => l.id === activeLesson)

  if (!topic) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <h2>Topic not found</h2>
        <button onClick={() => navigate('/learn')} style={{ marginTop: 16, padding: '8px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)' }}>
          Back to topics
        </button>
      </div>
    )
  }

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    marginBottom: 20,
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  }

  return (
    <div>
      <button
        onClick={() => navigate('/learn')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: 0,
          marginBottom: 16,
          fontSize: 14,
        }}
      >
        <ArrowLeft size={16} /> Back to topics
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 28 }}>{topic.icon}</span>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>{topic.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{topic.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{
            ...sectionStyle,
            padding: 12,
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Lessons
            </h3>
            {topic.lessons?.map(l => (
              <div
                key={l.id}
                onClick={() => setActiveLesson(l.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontSize: 13,
                  background: activeLesson === l.id ? 'var(--primary-light)' : 'transparent',
                  color: activeLesson === l.id ? 'var(--primary)' : 'var(--text)',
                  fontWeight: activeLesson === l.id ? 600 : 400,
                  marginBottom: 2,
                  transition: 'all var(--transition)',
                }}
              >
                {l.title}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 3, minWidth: 0 }}>
          {lesson && (
            <>
              <div style={sectionStyle}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                  {lesson.title}
                </h2>

                {lesson.objectives && (
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      Learning Objectives
                    </h3>
                    <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
                      {lesson.objectives.map((obj, i) => (
                        <li key={i} style={{ color: 'var(--text-secondary)' }}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="lesson-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.content}
                  </ReactMarkdown>
                </div>

                {lesson.explanation && (
                  <div style={{
                    marginTop: 20,
                    padding: 16,
                    background: 'var(--primary-light)',
                    borderRadius: 'var(--radius)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    border: '1px solid var(--border-light)',
                  }}>
                    <strong>Key Explanation:</strong>
                    <div style={{ marginTop: 8 }}>{lesson.explanation}</div>
                  </div>
                )}
              </div>

              {lesson.keyIdeas && lesson.keyIdeas.length > 0 && (
                <div style={sectionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <CheckCircle size={18} color="var(--secondary)" />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Key Ideas</h3>
                  </div>
                  <ul style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2 }}>
                    {lesson.keyIdeas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.formulas && lesson.formulas.length > 0 && (
                <div style={sectionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Beaker size={18} color="var(--primary)" />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Formulas</h3>
                  </div>
                  {lesson.formulas.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 16,
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius)',
                        marginBottom: 12,
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{f.name}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 18,
                        padding: '8px 12px',
                        background: 'var(--bg-card)',
                        borderRadius: 4,
                        marginBottom: 8,
                        textAlign: 'center',
                        color: 'var(--primary)',
                      }}>
                        {f.formula}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{f.explanation}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Usage: {f.usage}</div>
                    </div>
                  ))}
                </div>
              )}

              {lesson.solvedExamples && lesson.solvedExamples.length > 0 && (
                <div style={sectionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Zap size={18} color="var(--warning)" />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Solved Examples</h3>
                  </div>
                  {lesson.solvedExamples.map((ex, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 16,
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius)',
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Example {i + 1}</div>
                      <div style={{ fontSize: 14, marginBottom: 8, color: 'var(--text)' }}>
                        <strong>Problem: </strong>{ex.problem}
                      </div>
                      <div style={{ fontSize: 13, marginBottom: 8, color: 'var(--text-secondary)' }}>
                        <strong>Steps:</strong>
                        <ol style={{ paddingLeft: 20, marginTop: 4, lineHeight: 1.8 }}>
                          {ex.steps.map((step, j) => (
                            <li key={j}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--secondary)', fontWeight: 600 }}>
                        Answer: {ex.answer}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                        {ex.solution}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                <div style={sectionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <AlertTriangle size={18} color="var(--accent)" />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Common Mistakes</h3>
                  </div>
                  {lesson.commonMistakes.map((cm, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 12,
                        background: '#fef2f2',
                        borderRadius: 'var(--radius)',
                        marginBottom: 8,
                        border: '1px solid #fecaca',
                      }}
                    >
                      <div style={{ fontSize: 13, color: '#dc2626' }}>
                        <strong>❌ {cm.mistake}</strong>
                      </div>
                      <div style={{ fontSize: 13, color: '#16a34a', marginTop: 4 }}>
                        <strong>✅ {cm.correction}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                        {cm.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lesson.shortcuts && lesson.shortcuts.length > 0 && (
                <div style={sectionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Zap size={18} color="var(--warning)" />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Shortcuts & Tips</h3>
                  </div>
                  {lesson.shortcuts.map((sc, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 12,
                        background: '#fffbeb',
                        borderRadius: 'var(--radius)',
                        marginBottom: 8,
                        border: '1px solid #fde68a',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 600 }}>⚡ {sc.technique}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                        {sc.description}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
                        {sc.example}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
