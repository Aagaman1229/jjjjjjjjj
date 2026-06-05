import { supabase } from './supabase'
import type { PracticeResult, MockTestResult, UserProgress } from '../types'

// ─── Auth ───────────────────────────────────────────────────

export async function signUp(email: string, password: string, displayName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  return supabase.auth.signOut()
}

export function onAuthChange(callback: (userId: string | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user?.id ?? null)
  }).data.subscription
}

// ─── Profile ────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

export async function updateProfile(userId: string, updates: { display_name?: string }) {
  return supabase.from('profiles').update(updates).eq('id', userId)
}

export async function tickStudyStreak(userId: string) {
  return supabase.rpc('tick_study_streak', { p_user_id: userId })
}

// ─── Practice Results ───────────────────────────────────────

export async function savePracticeResult(userId: string, result: PracticeResult) {
  return supabase.from('practice_results').insert({
    user_id: userId,
    question_id: result.questionId,
    correct: result.correct,
    time_spent: result.timeSpent,
    topic: result.topic,
  })
}

export async function getPracticeResults(userId: string): Promise<PracticeResult[]> {
  const { data } = await supabase
    .from('practice_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data || []).map(r => ({
    questionId: r.question_id,
    correct: r.correct,
    timeSpent: r.time_spent,
    timestamp: new Date(r.created_at).getTime(),
    topic: r.topic,
  }))
}

// ─── Mock Test Results ──────────────────────────────────────

export async function saveMockTestResult(userId: string, result: MockTestResult) {
  return supabase.from('mock_test_results').insert({
    user_id: userId,
    test_id: result.testId,
    total_score: result.totalScore,
    scores: JSON.parse(JSON.stringify(result.scores)),
    time_per_question: result.timePerQuestion,
  })
}

export async function getMockTestResults(userId: string): Promise<MockTestResult[]> {
  const { data } = await supabase
    .from('mock_test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data || []).map(r => ({
    testId: r.test_id,
    date: r.created_at,
    scores: r.scores as MockTestResult['scores'],
    totalScore: r.total_score,
    timePerQuestion: r.time_per_question as Record<string, number>,
  }))
}

// ─── User Progress ──────────────────────────────────────────

export async function upsertProgress(userId: string, progress: Partial<UserProgress>) {
  return supabase.from('user_progress').upsert({
    user_id: userId,
    topics_completed: progress.topicsCompleted || [],
    lessons_completed: progress.lessonsCompleted || [],
    vocab_mastered: progress.vocabMastered || [],
    vocab_learning: progress.vocabLearning || [],
  })
}

export async function getProgress(userId: string): Promise<UserProgress | null> {
  const { data } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (!data) return null
  return {
    topicsCompleted: data.topics_completed,
    lessonsCompleted: data.lessons_completed,
    practiceHistory: [],
    mockTestHistory: [],
    vocabMastered: data.vocab_mastered,
    vocabLearning: data.vocab_learning,
    studyStreak: 0,
    lastStudyDate: '',
    totalStudyTime: 0,
  }
}

// ─── Vocabulary Bookmarks ───────────────────────────────────

export async function addBookmark(userId: string, wordId: string) {
  return supabase.from('vocab_bookmarks').insert({ user_id: userId, word_id: wordId })
}

export async function removeBookmark(userId: string, wordId: string) {
  return supabase.from('vocab_bookmarks').delete().match({ user_id: userId, word_id: wordId })
}

export async function getBookmarks(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from('vocab_bookmarks')
    .select('word_id')
    .eq('user_id', userId)
  return (data || []).map(r => r.word_id)
}

// ─── Chat Messages ──────────────────────────────────────────

export async function saveChatMessage(userId: string, role: string, content: string) {
  return supabase.from('chat_messages').insert({ user_id: userId, role, content })
}

export async function getChatHistory(userId: string) {
  const { data } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
  return (data || []).map(m => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content }))
}
