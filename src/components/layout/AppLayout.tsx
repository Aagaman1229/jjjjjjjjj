import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { AiChat } from '../common/AiChat'

interface AppLayoutProps {
  children: ReactNode
  title?: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-content-shell">
        <Header openTopics={() => setSidebarOpen(true)} title={title} />
        <main className="app-main">
          {children}
        </main>
      </div>
      <AiChat />
    </div>
  )
}
