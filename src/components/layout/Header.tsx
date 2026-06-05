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
    <header className="app-header">
      <div className="app-brand-wrap">
        <button onClick={() => navigate('/')} className="app-brand" aria-label="Go to dashboard">
          <span className="app-brand-icon"><GraduationCap size={22} /></span>
          <span>GRE Prep</span>
        </button>
        {title && <span className="app-title-crumb">/ {title}</span>}
      </div>

      <nav className="app-nav" aria-label="Primary navigation">
        {navLinks.map(link => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
          const Icon = link.icon
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`app-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </button>
          )
        })}
        <button onClick={openTopics} className="app-nav-link">
          <BookOpen size={16} />
          <span>Topics</span>
        </button>
      </nav>

      <div className="app-header-actions">
        {user && (
          <div className="app-user-pill">
            <div className="app-user-avatar">
              {user.email?.[0].toUpperCase() || <User size={16} />}
            </div>
            <span>{user.email}</span>
            <button onClick={handleSignOut} className="app-icon-action danger" title="Sign out" aria-label="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}
