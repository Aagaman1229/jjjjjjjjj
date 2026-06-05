import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, X, BookOpen } from 'lucide-react'
import { curriculum } from '../../data/curriculum'

const categories = [
  { id: 'quant', label: 'Quantitative Reasoning', icon: '📐' },
  { id: 'verbal', label: 'Verbal Reasoning', icon: '📖' },
  { id: 'writing', label: 'Analytical Writing', icon: '✍️' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sidebarStyle: React.CSSProperties = {
    width: 'var(--sidebar-width)',
    height: '100vh',
    borderRight: '1px solid var(--border)',
    background: 'var(--bg-card)',
    overflowY: 'auto',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 200,
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 199,
          }}
        />
      )}
      <aside style={sidebarStyle}>
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={20} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: 16 }}>Topics</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <nav style={{ padding: '8px 0' }}>
          {categories.map(cat => (
            <div key={cat.id}>
              <div
                onClick={() => toggleTopic(cat.id)}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                <span>{cat.icon}</span>
                <span style={{ flex: 1 }}>{cat.label}</span>
                {expandedTopics.has(cat.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              {expandedTopics.has(cat.id) &&
                curriculum
                  .filter(t => t.category === cat.id)
                  .map(topic => (
                    <div
                      key={topic.id}
                      onClick={() => { navigate(`/learn/${topic.id}`); onClose() }}
                      style={{
                        padding: '8px 20px 8px 48px',
                        cursor: 'pointer',
                        fontSize: 13,
                        color: location.pathname.includes(topic.id) ? 'var(--primary)' : 'var(--text)',
                        background: location.pathname.includes(topic.id) ? 'var(--primary-light)' : 'transparent',
                        fontWeight: location.pathname.includes(topic.id) ? 600 : 400,
                        transition: 'all var(--transition)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)' }}
                      onMouseLeave={e => {
                        if (!location.pathname.includes(topic.id))
                          e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {topic.icon} {topic.title}
                    </div>
                  ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
