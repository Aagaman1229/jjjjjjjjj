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

  return (
    <>
      {isOpen && <div onClick={onClose} className="topic-drawer-overlay" />}
      <aside className={`topic-drawer ${isOpen ? 'open' : ''}`}>
        <div className="topic-drawer-header">
          <div className="topic-drawer-title">
            <span><BookOpen size={19} /></span>
            <div>
              <strong>Topic Library</strong>
              <small>Jump into a lesson</small>
            </div>
          </div>
          <button onClick={onClose} className="topic-drawer-close" aria-label="Close topics">
            <X size={18} />
          </button>
        </div>

        <nav className="topic-drawer-nav" aria-label="Topic library">
          {categories.map(cat => {
            const expanded = expandedTopics.has(cat.id)
            const topics = curriculum.filter(t => t.category === cat.id)
            return (
              <div key={cat.id} className="topic-drawer-group">
                <button onClick={() => toggleTopic(cat.id)} className="topic-drawer-category">
                  <span className="topic-drawer-category-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <small>{topics.length}</small>
                  {expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                {expanded && (
                  <div className="topic-drawer-items">
                    {topics.map(topic => {
                      const active = location.pathname.includes(topic.id)
                      return (
                        <button
                          key={topic.id}
                          onClick={() => { navigate(`/learn/${topic.id}`); onClose() }}
                          className={`topic-drawer-item ${active ? 'active' : ''}`}
                        >
                          <span>{topic.icon}</span>
                          <strong>{topic.title}</strong>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
