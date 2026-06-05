import { GraduationCap, LogOut, User, LayoutGrid, BookOpen, SpellCheck, Layers, BookText, BarChart3 } from 'lucide-react'
import { DarkModeToggle } from '../common/DarkModeToggle'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/db'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  openTopics: () => void
  title?: string
}

const navLinks = [
  { path: '/', label: 'Dashboard', icon: LayoutGrid },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/vocabulary', label: 'Vocabulary', icon: SpellCheck },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/practice', label: 'Practice', icon: BookText },
  { path: '/mock-test', label: 'Mock Test', icon: GraduationCap },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export function Header({ openTopics, title }: HeaderProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <header
      style={{
        height: 'var(--header-height)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background: 'var(--bg-card)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <GraduationCap size={24} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>
            GRE Prep
          </span>
        </div>
        {title && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            / {title}
          </span>
        )}
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 2, overflow: 'hidden' }}>
        {navLinks.map(link => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
          const Icon = link.icon
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
            >
              <Icon size={16} />
              {link.label}
            </button>
          )
        })}
        <button
          onClick={openTopics}
          style={{
            padding: '6px 12px',
            borderRadius: 'var(--radius)',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
            transition: 'all var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <BookOpen size={16} />
          Topics
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {user.email?.[0].toUpperCase() || <User size={16} />}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                padding: 6,
                display: 'flex',
                cursor: 'pointer',
                borderRadius: 'var(--radius)',
              }}
              title="Sign out"
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}
