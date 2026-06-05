import { BrowserRouter, Routes, Route, Navigate, type ReactNode } from 'react-router-dom'
import { ThemeProvider } from './components/common/ThemeProvider'
import { AppLayout } from './components/layout/AppLayout'
import { TopicList } from './components/learn/TopicList'
import { LessonView } from './components/learn/LessonView'
import { VocabView } from './components/vocabulary/VocabView'
import { FlashcardView } from './components/vocabulary/FlashcardView'
import { PracticeView } from './components/practice/PracticeView'
import { MockTestView } from './components/mocktest/MockTestView'
import { AnalyticsDashboard } from './components/analytics/Dashboard'
import { LoginPage } from './pages/LoginPage'
import { useAuth } from './contexts/AuthContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function HomePage() {
  return <AnalyticsDashboard />
}

function LearnPage() {
  return <TopicList />
}

function FlashcardsPage() {
  return (
    <AppLayout title="Flashcards">
      <FlashcardView />
    </AppLayout>
  )
}

function VocabPage() {
  return (
    <AppLayout title="Vocabulary">
      <VocabView />
    </AppLayout>
  )
}

function PracticePage() {
  return (
    <AppLayout title="Practice">
      <PracticeView />
    </AppLayout>
  )
}

function MockTestPage() {
  return (
    <AppLayout title="Mock Test">
      <MockTestView />
    </AppLayout>
  )
}

function AnalyticsPage() {
  return (
    <AppLayout title="Analytics">
      <AnalyticsDashboard />
    </AppLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><AppLayout><HomePage /></AppLayout></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><AppLayout title="Curriculum"><LearnPage /></AppLayout></ProtectedRoute>} />
          <Route path="/learn/:topicId" element={<ProtectedRoute><AppLayout><LessonView /></AppLayout></ProtectedRoute>} />
          <Route path="/learn/:topicId/:lessonId" element={<ProtectedRoute><AppLayout><LessonView /></AppLayout></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
          <Route path="/vocabulary" element={<ProtectedRoute><VocabPage /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
          <Route path="/mock-test" element={<ProtectedRoute><MockTestPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
