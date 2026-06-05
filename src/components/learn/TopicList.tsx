import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { curriculum } from '../../data/curriculum'

const categories = [
  { id: 'quant', label: 'Quantitative Reasoning', color: '#1a73e8', icon: '📐' },
  { id: 'verbal', label: 'Verbal Reasoning', color: '#34a853', icon: '📖' },
  { id: 'writing', label: 'Analytical Writing', color: '#ea4335', icon: '✍️' },
]

export function TopicList() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Complete GRE Curriculum
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
        Study every topic from the combined knowledge of Manhattan Prep, Kaplan, Magoosh, Barron's, Princeton Review, Nova, and ETS guides.
      </p>

      {categories.map(cat => {
        const topics = curriculum.filter(t => t.category === cat.id)
        return (
          <div key={cat.id} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 24 }}>{cat.icon}</span>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: cat.color }}>
                {cat.label}
              </h2>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                ({topics.length} topics)
              </span>
            </div>

            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {topics.map(topic => {
                const lessonCount = topic.lessons?.length || 0
                return (
                  <div
                    key={topic.id}
                    onClick={() => navigate(`/learn/${topic.id}`)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'var(--shadow)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: 24, marginRight: 8 }}>{topic.icon}</span>
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>
                          {topic.title}
                        </h3>
                      </div>
                      <ChevronRight size={18} color="var(--text-muted)" />
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
                      {topic.description}
                    </p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>{lessonCount} lessons</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
