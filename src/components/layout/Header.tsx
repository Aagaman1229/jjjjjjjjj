import { Menu, GraduationCap, LogOut, User } from 'lucide-react'
import { DarkModeToggle } from '../common/DarkModeToggle'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/db'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  toggleSidebar: () => void
  title?: string
}

export function Header({ toggleSidebar, title }: HeaderProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            padding: 6,
            display: 'flex',
            cursor: 'pointer',
          }}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <GraduationCap size={24} color="var(--primary)" />
        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>
          GRE Prep
        </span>
        {title && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 14, marginLeft: 8 }}>
            / {title}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
