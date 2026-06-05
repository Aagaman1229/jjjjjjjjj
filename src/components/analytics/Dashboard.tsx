import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Target, Brain, Clock, TrendingUp, Flame, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { calculateAccuracy, getWeakTopics, getStudyStreak, getRecommendedTopics } from '../../utils/analytics'
import { curriculum } from '../../data/curriculum'
import { vocabularyWords } from '../../data/vocabulary'
import type { PracticeResult, MockTestResult } from '../../types'

export function AnalyticsDashboard() {
  const navigate = useNavigate()
  const [results] = useLocalStorage<PracticeResult[]>('gre-practice-results', [])
  const [mockResults] = useLocalStorage<MockTestResult[]>('gre-mock-test-results', [])

  const accuracy = useMemo(() => calculateAccuracy(results), [results])
  const weakTopics = useMemo(() => getWeakTopics(results), [results])
  const streak = useMemo(() => getStudyStreak(results), [results])
  const recommended = useMemo(() => getRecommendedTopics(results), [results])
  const totalPractice = results.length
  const avgMockScore = mockResults.length > 0 ? Math.round(mockResults.reduce((s, r) => s + r.totalScore, 0) / mockResults.length) : null
  const totalVocab = vocabularyWords.length

  const stats = [
    { label: 'Day streak', value: streak, icon: Flame, tone: 'orange' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: Target, tone: 'blue' },
    { label: 'Questions done', value: totalPractice, icon: Brain, tone: 'green' },
    { label: 'Avg mock score', value: avgMockScore ?? '-', icon: BarChart3, tone: 'red' },
    { label: 'Mock tests', value: mockResults.length, icon: Clock, tone: 'purple' },
    { label: 'Vocab words', value: totalVocab, icon: BookOpen, tone: 'cyan' },
  ]

  const quickActions = [
    { label: 'Practice Quant', path: '/practice?type=quant', icon: '📐', color: '#1a73e8' },
    { label: 'Practice Verbal', path: '/practice?type=verbal', icon: '📖', color: '#16a34a' },
    { label: 'Study Flashcards', path: '/flashcards', icon: '🃏', color: '#7c3aed' },
    { label: 'Review Vocabulary', path: '/vocabulary', icon: '📚', color: '#0891b2' },
    { label: 'Take Mock Test', path: '/mock-test', icon: '📝', color: '#ea4335' },
    { label: 'Full Analytics', path: '/analytics', icon: '📊', color: '#f97316' },
  ]

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <div className="vocab-kicker">Study command center</div>
          <h1>Dashboard</h1>
          <p>Track your GRE momentum, pick the next useful task, and keep the session lightweight.</p>
        </div>
        <button onClick={() => navigate('/learn')} className="dashboard-primary-action">
          <Sparkles size={17} /> Continue learning
        </button>
      </section>

      <section className="dashboard-stats-grid">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`dashboard-stat-card ${stat.tone}`}>
              <div className="dashboard-stat-icon"><Icon size={23} /></div>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          )
        })}
      </section>

      <section className="dashboard-panels">
        <div className="dashboard-panel">
          <div className="dashboard-panel-title">
            <Target size={20} /> Topic Performance
          </div>
          {weakTopics.length > 0 ? (
            <div className="dashboard-topic-bars">
              {weakTopics.slice(0, 8).map(w => (
                <div key={w.topic} className="dashboard-topic-row">
                  <div>
                    <span>{w.topic}</span>
                    <strong className={w.accuracy < 50 ? 'low' : w.accuracy < 70 ? 'mid' : 'high'}>{w.accuracy}%</strong>
                  </div>
                  <div className="dashboard-bar-track">
                    <div
                      className={w.accuracy < 50 ? 'low' : w.accuracy < 70 ? 'mid' : 'high'}
                      style={{ width: `${Math.max(Math.min(w.accuracy, 100), 0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-panel">
              <Brain size={28} />
              <strong>No practice data yet</strong>
              <span>Answer a few questions to see topic performance.</span>
            </div>
          )}
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-title accent">
            <TrendingUp size={20} /> Recommended Focus
          </div>
          {recommended.length > 0 ? (
            <div className="dashboard-recommend-list">
              {recommended.slice(0, 6).map(topicId => {
                const topic = curriculum.find(t => t.id === topicId)
                const weakTopic = weakTopics.find(w => w.topic === topicId)
                const topicAccuracy = weakTopic ? weakTopic.accuracy : null
                return (
                  <button key={topicId} onClick={() => navigate(`/learn/${topicId}`)} className="dashboard-recommend-card">
                    <span className="recommend-icon">{topic?.icon || '📘'}</span>
                    <div className="recommend-details">
                      <div className="recommend-title-row">
                        <strong>{topic?.title || topicId}</strong>
                        {topic?.category && (
                          <span className={`category-badge ${topic.category}`}>
                            {topic.category.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <small>
                        {topicAccuracy !== null ? `Current Accuracy: ${topicAccuracy}%` : 'Accuracy below 60%'} • Review this next
                      </small>
                    </div>
                    <ArrowRight size={16} className="recommend-arrow" />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="dashboard-empty-panel">
              <TrendingUp size={28} />
              <strong>No weak spots yet</strong>
              <span>Complete more practice to unlock recommendations.</span>
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-actions-section">
        <div className="dashboard-section-heading">Quick Actions</div>
        <div className="dashboard-actions-grid">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="dashboard-action-card"
              style={{ '--action-color': action.color } as React.CSSProperties}
            >
              <span>{action.icon}</span>
              <strong>{action.label}</strong>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
