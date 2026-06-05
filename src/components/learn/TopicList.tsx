import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight, Clock, Layers } from 'lucide-react'
import { curriculum } from '../../data/curriculum'

const categories = [
  { id: 'quant', label: 'Quantitative Reasoning', color: '#1a73e8', icon: '📐' },
  { id: 'verbal', label: 'Verbal Reasoning', color: '#16a34a', icon: '📖' },
  { id: 'writing', label: 'Analytical Writing', color: '#ea4335', icon: '✍️' },
]

export function TopicList() {
  const navigate = useNavigate()

  return (
    <div className="learn-home">
      <section className="learn-hero-panel">
        <div>
          <div className="vocab-kicker">GRE study path</div>
          <h1>Complete GRE Curriculum</h1>
          <p>
            Pick one topic, read a focused lesson, then move straight into practice. The layout is tuned for quick scanning and steady progress.
          </p>
        </div>
        <div className="learn-hero-stats">
          <div>
            <BookOpen size={18} />
            <strong>{curriculum.length}</strong>
            <span>Topics</span>
          </div>
          <div>
            <Layers size={18} />
            <strong>{curriculum.reduce((sum, topic) => sum + (topic.lessons?.length || 0), 0)}</strong>
            <span>Lessons</span>
          </div>
          <div>
            <Clock size={18} />
            <strong>15m</strong>
            <span>Study blocks</span>
          </div>
        </div>
      </section>

      {categories.map(cat => {
        const topics = curriculum.filter(t => t.category === cat.id)
        return (
          <section key={cat.id} className="learn-category">
            <div className="learn-category-header">
              <div className="learn-category-title">
                <span className="learn-category-icon" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</span>
                <div>
                  <h2 style={{ color: cat.color }}>{cat.label}</h2>
                  <span>{topics.length} topics</span>
                </div>
              </div>
            </div>

            <div className="learn-topic-grid">
              {topics.map(topic => {
                const lessonCount = topic.lessons?.length || 0
                return (
                  <button
                    key={topic.id}
                    onClick={() => navigate(`/learn/${topic.id}`)}
                    className="learn-topic-card"
                    style={{ '--topic-color': cat.color } as React.CSSProperties}
                  >
                    <div className="learn-topic-top">
                      <span className="learn-topic-icon">{topic.icon}</span>
                      <ChevronRight size={20} />
                    </div>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                    <div className="learn-topic-meta">
                      <span>{lessonCount} lessons</span>
                      <span>Start topic</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
