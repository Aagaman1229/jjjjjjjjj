import type { UserProgress, PracticeResult, MockTestResult } from '../types'

export function calculateAccuracy(results: PracticeResult[]): number {
  if (results.length === 0) return 0
  const correct = results.filter(r => r.correct).length
  return Math.round((correct / results.length) * 100)
}

export function getWeakTopics(results: PracticeResult[]): { topic: string; accuracy: number; count: number }[] {
  const byTopic = new Map<string, PracticeResult[]>()
  for (const r of results) {
    if (!byTopic.has(r.topic)) byTopic.set(r.topic, [])
    byTopic.get(r.topic)!.push(r)
  }

  return Array.from(byTopic.entries())
    .map(([topic, rs]) => ({
      topic,
      accuracy: calculateAccuracy(rs),
      count: rs.length,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

export function getStudyStreak(history: PracticeResult[]): number {
  if (history.length === 0) return 0

  const dates = new Set(history.map(r => new Date(r.timestamp).toDateString()))
  let streak = 0
  const today = new Date()

  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (dates.has(d.toDateString())) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}

export function getMockTestAverage(results: MockTestResult[]): number {
  if (results.length === 0) return 0
  const total = results.reduce((sum, r) => sum + r.totalScore, 0)
  return Math.round(total / results.length)
}

export function getTopicMastery(progress: UserProgress, topicResults: PracticeResult[]): { topic: string; mastery: number }[] {
  const weak = getWeakTopics(topicResults)
  return weak.map(w => ({
    topic: w.topic,
    mastery: Math.max(0, Math.min(100, w.accuracy)),
  }))
}

export function getRecommendedTopics(results: PracticeResult[], threshold = 60): string[] {
  return getWeakTopics(results)
    .filter(w => w.accuracy < threshold && w.count >= 3)
    .map(w => w.topic)
}
