import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  BookOpen,
  BookText,
  GraduationCap,
  SpellCheck,
  Layers,
  BarChart3,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react'
import { curriculum } from '../../data/curriculum'

const categories = [
  { id: 'quant', label: 'Quantitative Reasoning', icon: '📐', color: '#1a73e8' },
  { id: 'verbal', label: 'Verbal Reasoning', icon: '📖', color: '#34a853' },
  { id: 'writing', label: 'Analytical Writing', icon: '✍️', color: '#ea4335' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: BarChart3 },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/vocabulary', label: 'Vocabulary', icon: SpellCheck },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/practice', label: 'Practice', icon: BookText },
  { path: '/mock-test', label: 'Mock Test', icon: GraduationCap },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

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
            <GraduationCap size={22} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: 16 }}>GRE Prep</span>
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

        <nav style={{ padding: '12px 0' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
            const Icon = item.icon
            return (
              <div
                key={item.path}
                onClick={() => { navigate(item.path); onClose() }}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: isActive ? 'var(--primary)' : 'var(--text)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  borderRight: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all var(--transition)',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-secondary)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={18} />
                {item.label}
              </div>
            )
          })}
        </nav>

        <div style={{ padding: '8px 20px 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
          Topics
        </div>
        <nav style={{ padding: '4px 0' }}>
          {categories.map(cat => (
            <div key={cat.id}>
              <div
                onClick={() => toggleTopic(cat.id)}
                style={{
                  padding: '8px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
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
                        padding: '6px 20px 6px 48px',
                        cursor: 'pointer',
                        fontSize: 13,
                        color: location.pathname.includes(topic.id) ? 'var(--primary)' : 'var(--text)',
                        background: location.pathname.includes(topic.id) ? 'var(--primary-light)' : 'transparent',
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
