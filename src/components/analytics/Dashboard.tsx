import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Target, Brain, Clock, TrendingUp, Flame, BookOpen } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { calculateAccuracy, getWeakTopics, getStudyStreak, getRecommendedTopics } from '../../utils/analytics'
import { curriculum } from '../../data/curriculum'
import { vocabularyWords } from '../../data/vocabulary'
import type { UserProgress, PracticeResult, MockTestResult } from '../../types'

const statCardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)',
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}

export function AnalyticsDashboard() {
  const navigate = useNavigate()
  const [results] = useLocalStorage<PracticeResult[]>('gre-practice-results', [])
  const [mockResults] = useLocalStorage<MockTestResult[]>('gre-mock-test-results', [])
  const [progress] = useLocalStorage<UserProgress>('gre-progress', {
    topicsCompleted: [],
    lessonsCompleted: [],
    practiceHistory: [],
    mockTestHistory: [],
    vocabMastered: [],
    vocabLearning: [],
    studyStreak: 0,
    lastStudyDate: '',
    totalStudyTime: 0,
  })

  const accuracy = useMemo(() => calculateAccuracy(results), [results])
  const weakTopics = useMemo(() => getWeakTopics(results), [results])
  const streak = useMemo(() => getStudyStreak(results), [results])
  const recommended = useMemo(() => getRecommendedTopics(results), [results])
  const totalPractice = results.length
  const totalMockTests = mockResults.length
  const lastMockScore = mockResults.length > 0 ? mockResults[mockResults.length - 1].totalScore : null
  const avgMockScore = mockResults.length > 0 ? Math.round(mockResults.reduce((s, r) => s + r.totalScore, 0) / mockResults.length) : null

  const totalVocab = vocabularyWords.length

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={statCardStyle}>
          <Flame size={28} color="#f97316" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{streak}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Day Streak</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <Target size={28} color="var(--primary)" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{accuracy}%</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Accuracy</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <Brain size={28} color="var(--secondary)" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{totalPractice}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Questions Done</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <BarChart3 size={28} color="var(--accent)" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{avgMockScore ?? '—'}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Avg Mock Score</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <Clock size={28} color="#8b5cf6" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{mockResults.length}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Mock Tests</div>
          </div>
        </div>
        <div style={statCardStyle}>
          <BookOpen size={28} color="#06b6d4" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{totalVocab}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Vocab Words</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Topic Performance */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={20} color="var(--primary)" /> Topic Performance
          </h2>
          {weakTopics.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {weakTopics.slice(0, 8).map(w => (
                <div key={w.topic}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                    <span style={{ color: 'var(--text)' }}>{w.topic}</span>
                    <span style={{ fontWeight: 600, color: w.accuracy < 50 ? 'var(--accent)' : w.accuracy < 70 ? 'var(--warning)' : 'var(--secondary)' }}>
                      {w.accuracy}%
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.max(Math.min(w.accuracy, 100), 0)}%`,
                      background: w.accuracy < 50 ? 'var(--accent)' : w.accuracy < 70 ? 'var(--warning)' : 'var(--secondary)',
                      borderRadius: 3,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Start practicing to see your performance.</p>
          )}
        </div>

        {/* Recommendations */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={20} color="var(--accent)" /> Recommended Focus
          </h2>
          {recommended.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {recommended.slice(0, 6).map(topicId => {
                const topic = curriculum.find(t => t.id === topicId)
                return (
                  <div
                    key={topicId}
                    onClick={() => navigate(`/learn/${topicId}`)}
                    style={{
                      padding: '12px 16px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-light)',
                      transition: 'all var(--transition)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{topic?.icon} {topic?.title || topicId}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Accuracy below 60% — click to study
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Complete more practice to get recommendations.</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Practice Quant', path: '/practice?type=quant', icon: '📐', color: '#1a73e8' },
            { label: 'Practice Verbal', path: '/practice?type=verbal', icon: '📖', color: '#34a853' },
            { label: 'Study Flashcards', path: '/flashcards', icon: '🃏', color: '#8b5cf6' },
            { label: 'Review Vocabulary', path: '/vocabulary', icon: '📚', color: '#06b6d4' },
            { label: 'Take Mock Test', path: '/mock-test', icon: '📝', color: '#ea4335' },
            { label: 'View Full Analytics', path: '/analytics', icon: '📊', color: '#f97316' },
          ].map(action => (
            <div
              key={action.label}
              onClick={() => navigate(action.path)}
              style={{
                padding: '16px 24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: 24 }}>{action.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{action.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
