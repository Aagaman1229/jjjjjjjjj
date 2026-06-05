import { useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useLocalStorage<'light' | 'dark'>('gre-theme', 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
