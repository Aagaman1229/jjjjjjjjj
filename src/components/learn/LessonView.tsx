import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, AlertTriangle, Zap, Beaker, BookOpen, ListChecks, Lightbulb, Target, Type, CheckSquare, Square, Eye, EyeOff } from 'lucide-react'
import { getTopicById } from '../../data/curriculum'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function LessonView() {
  const { topicId, lessonId } = useParams()
  const navigate = useNavigate()
  const topic = getTopicById(topicId || '')
  const [activeLesson, setActiveLesson] = useState(lessonId || topic?.lessons?.[0]?.id || '')

  const lesson = topic?.lessons?.find(l => l.id === activeLesson)
  const activeLessonIndex = topic?.lessons?.findIndex(l => l.id === activeLesson) ?? 0

  const [fontFamily, setFontFamily] = useLocalStorage<'sans' | 'serif'>('gre-reading-font-family', 'sans')
  const [fontSize, setFontSize] = useLocalStorage<number>('gre-reading-font-size', 16)
  const [checkedGoals, setCheckedGoals] = useLocalStorage<Record<string, boolean>>('gre-lesson-checked-goals', {})
  const [activeTab, setActiveTab] = useState('guide')
  const [revealedExamples, setRevealedExamples] = useState<Record<string, Record<number, boolean>>>({})

  const availableTabs: string[] = []
  if (lesson) {
    availableTabs.push('guide')
    if (lesson.formulas && lesson.formulas.length > 0) availableTabs.push('formulas')
    if (lesson.solvedExamples && lesson.solvedExamples.length > 0) availableTabs.push('examples')
  }

  const currentTab = availableTabs.includes(activeTab) ? activeTab : 'guide'

  const toggleReveal = (index: number) => {
    setRevealedExamples(prev => ({
      ...prev,
      [activeLesson]: {
        ...(prev[activeLesson] || {}),
        [index]: !prev[activeLesson]?.[index]
      }
    }))
  }

  const isGoalChecked = (index: number) => !!checkedGoals[`${lesson?.id}-obj-${index}`]
  const toggleGoal = (index: number) => {
    setCheckedGoals(prev => ({
      ...prev,
      [`${lesson?.id}-obj-${index}`]: !prev[`${lesson?.id}-obj-${index}`]
    }))
  }

  if (!topic) {
    return (
      <div className="learn-empty-state">
        <h2>Topic not found</h2>
        <button onClick={() => navigate('/learn')}>Back to topics</button>
      </div>
    )
  }

  return (
    <div className="lesson-page">
      <button onClick={() => navigate('/learn')} className="lesson-back-btn">
        <ArrowLeft size={16} /> Back to topics
      </button>

      <section className="lesson-hero">
        <div className="lesson-hero-icon">{topic.icon}</div>
        <div>
          <div className="vocab-kicker">Focused lesson</div>
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
        </div>
        <div className="lesson-hero-chip">
          <BookOpen size={16} /> {topic.lessons?.length || 0} lessons
        </div>
      </section>

      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-card">
            <div className="lesson-sidebar-title">
              <ListChecks size={16} /> Lessons
            </div>
            {topic.lessons?.map((l, index) => (
              <button
                key={l.id}
                onClick={() => setActiveLesson(l.id)}
                className={`lesson-nav-item ${activeLesson === l.id ? 'active' : ''}`}
              >
                <span>{index + 1}</span>
                <strong>{l.title}</strong>
              </button>
            ))}
          </div>
        </aside>

        <main className="lesson-main">
          {lesson && (
            <>
              {/* Tab Bar Navigation */}
              <div className="lesson-tabs-container">
                <div className="lesson-tab-bar">
                  {availableTabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`lesson-tab-btn ${currentTab === tab ? 'active' : ''}`}
                    >
                      {tab === 'guide' && <BookOpen size={16} />}
                      {tab === 'formulas' && <Beaker size={16} />}
                      {tab === 'examples' && <Zap size={16} />}
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab: Guide */}
              {currentTab === 'guide' && (
                <div className="lesson-tab-content active">
                  <section className="lesson-reading-card featured">
                    <div className="lesson-header-row">
                      <div className="lesson-number">Lesson {activeLessonIndex + 1}</div>
                      
                      {/* Reading Settings Toolbar */}
                      <div className="reading-toolbar">
                        <button
                          onClick={() => setFontFamily(prev => prev === 'sans' ? 'serif' : 'sans')}
                          className="toolbar-btn"
                          title="Toggle Font Family"
                        >
                          <Type size={15} />
                          <span>{fontFamily === 'sans' ? 'Serif' : 'Sans'}</span>
                        </button>
                        <div className="toolbar-divider"></div>
                        <button
                          onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                          className="toolbar-btn"
                          disabled={fontSize <= 14}
                          title="Decrease Font Size"
                        >
                          A-
                        </button>
                        <span className="font-size-indicator">{fontSize}px</span>
                        <button
                          onClick={() => setFontSize(prev => Math.min(22, prev + 2))}
                          className="toolbar-btn"
                          disabled={fontSize >= 22}
                          title="Increase Font Size"
                        >
                          A+
                        </button>
                      </div>
                    </div>
                    
                    <h2>{lesson.title}</h2>

                    {/* Goals Checklist */}
                    {lesson.objectives && lesson.objectives.length > 0 && (
                      <div className="lesson-objectives">
                        <div className="lesson-section-heading compact">
                          <Target size={16} /> Learning Goals (Click to check off)
                        </div>
                        <div className="lesson-objective-grid">
                          {lesson.objectives.map((obj, i) => {
                            const checked = isGoalChecked(i)
                            return (
                              <button
                                key={i}
                                onClick={() => toggleGoal(i)}
                                className={`lesson-objective-item interactive-goal ${checked ? 'checked' : ''}`}
                              >
                                {checked ? (
                                  <CheckSquare size={16} className="goal-checkbox-icon checked" />
                                ) : (
                                  <Square size={16} className="goal-checkbox-icon" />
                                )}
                                <span>{obj}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    <div
                      className={`lesson-markdown lesson-markdown-pretty font-${fontFamily}`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
                    </div>

                    {lesson.explanation && (
                      <div className="lesson-callout blue">
                        <Lightbulb size={18} />
                        <div>
                          <strong>Key explanation</strong>
                          <p>{lesson.explanation}</p>
                        </div>
                      </div>
                    )}
                  </section>

                  {lesson.keyIdeas && lesson.keyIdeas.length > 0 && (
                    <section className="lesson-reading-card">
                      <div className="lesson-section-heading">
                        <CheckCircle size={19} /> Key Ideas
                      </div>
                      <div className="lesson-idea-list">
                        {lesson.keyIdeas.map((idea, i) => (
                          <div key={i} className="lesson-idea-item">
                            <span>{i + 1}</span>
                            <p>{idea}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                    <section className="lesson-reading-card">
                      <div className="lesson-section-heading">
                        <AlertTriangle size={19} /> Common Mistakes
                      </div>
                      <div className="lesson-warning-list">
                        {lesson.commonMistakes.map((cm, i) => (
                          <div key={i} className="lesson-warning-card">
                            <strong>{cm.mistake}</strong>
                            <span>{cm.correction}</span>
                            <p>{cm.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {lesson.shortcuts && lesson.shortcuts.length > 0 && (
                    <section className="lesson-reading-card">
                      <div className="lesson-section-heading">
                        <Zap size={19} /> Shortcuts & Tips
                      </div>
                      <div className="lesson-tip-list">
                        {lesson.shortcuts.map((sc, i) => (
                          <div key={i} className="lesson-tip-card">
                            <strong>{sc.technique}</strong>
                            <p>{sc.description}</p>
                            <span>{sc.example}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Tab: Formulas */}
              {currentTab === 'formulas' && lesson.formulas && (
                <div className="lesson-tab-content active">
                  <section className="lesson-reading-card">
                    <div className="lesson-section-heading">
                      <Beaker size={19} /> Formulas & Rules
                    </div>
                    <div className="lesson-formula-grid">
                      {lesson.formulas.map((f, i) => (
                        <div key={i} className="lesson-formula-card">
                          <h4>{f.name}</h4>
                          <div className="lesson-formula-text">{f.formula}</div>
                          <p>{f.explanation}</p>
                          <span className="formula-usage-tag">Usage: {f.usage}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Tab: Solved Examples */}
              {currentTab === 'examples' && lesson.solvedExamples && (
                <div className="lesson-tab-content active">
                  <section className="lesson-reading-card">
                    <div className="lesson-section-heading">
                      <Zap size={19} /> Active Recall Solved Examples
                    </div>
                    <p className="tab-intro-text">
                      Try to solve each problem on your own before revealing the solution and step-by-step breakdown.
                    </p>
                    <div className="lesson-example-list">
                      {lesson.solvedExamples.map((ex, i) => {
                        const isRevealed = !!revealedExamples[activeLesson]?.[i]
                        return (
                          <div
                            key={i}
                            className={`lesson-example-card active-recall-card ${
                              isRevealed ? 'solution-revealed' : 'solution-hidden'
                            }`}
                          >
                            <div className="lesson-example-header">
                              <div className="lesson-example-title">Example {i + 1}</div>
                              <button
                                className={`reveal-solution-btn ${isRevealed ? 'revealed' : ''}`}
                                onClick={() => toggleReveal(i)}
                              >
                                {isRevealed ? (
                                  <>
                                    <EyeOff size={15} /> Hide Solution
                                  </>
                                ) : (
                                  <>
                                    <Eye size={15} /> Reveal Solution
                                  </>
                                )}
                              </button>
                            </div>
                            
                            <p className="example-problem-text">
                              <strong>Problem:</strong> {ex.problem}
                            </p>

                            <div className="example-solution-accordion">
                              <div className="lesson-steps">
                                <strong>Step-by-Step Breakdown:</strong>
                                <ol>
                                  {ex.steps.map((step, j) => (
                                    <li key={j}>{step}</li>
                                  ))}
                                </ol>
                              </div>
                              <div className="lesson-answer">
                                <strong>Answer:</strong> {ex.answer}
                              </div>
                              <div className="lesson-solution-explanation">
                                <strong>Full Explanation:</strong>
                                <p>{ex.solution}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
