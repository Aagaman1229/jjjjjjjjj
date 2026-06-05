import { Sun, Moon } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const btnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '8px',
  color: 'var(--text)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all var(--transition)',
}

export function DarkModeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('gre-theme', 'light')

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button onClick={toggle} style={btnStyle} aria-label="Toggle dark mode" title="Toggle dark mode">
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
