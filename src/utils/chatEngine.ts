import { curriculum } from '../data/curriculum'
import { formulas } from '../data/formulas'
import type { Topic, Lesson } from '../types'

interface SearchResult {
  text: string
  score: number
  topicId: string
  topicTitle: string
  lessonId: string
  lessonTitle: string
  type: string
}

interface ChatResponse {
  answer: string
  sources: { title: string; topicId: string }[]
  followUps: string[]
}

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1)
}

function scoreTokens(queryTokens: string[], text: string): number {
  const textLower = text.toLowerCase()
  const textTokens = new Set(tokenize(textLower))
  let score = 0
  for (const qt of queryTokens) {
    if (textTokens.has(qt)) score += 2
    for (const tt of textTokens) {
      if (tt.length > 3 && (tt.includes(qt) || qt.includes(tt))) score += 1
    }
  }
  if (textLower.includes(queryTokens.join(' '))) score += 5
  return score
}

function getAllSearchableItems(): SearchResult[] {
  const items: SearchResult[] = []
  for (const topic of curriculum) {
    for (const lesson of topic.lessons) {
      items.push({ text: lesson.title, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'title' })
      items.push({ text: lesson.explanation, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'explanation' })
      for (const ki of lesson.keyIdeas) items.push({ text: ki, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'keyIdea' })
      items.push({ text: lesson.content, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'content' })
      for (const f of lesson.formulas) items.push({ text: `${f.name}: ${f.formula} - ${f.explanation}`, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'formula' })
      for (const e of lesson.examples) items.push({ text: `${e.question} ${e.solution} ${e.explanation}`, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'example' })
      for (const se of lesson.solvedExamples) items.push({ text: `${se.problem} ${se.solution} ${se.steps.join(' ')}`, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'example' })
      for (const cm of lesson.commonMistakes) items.push({ text: `${cm.mistake} ${cm.correction} ${cm.explanation}`, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'commonMistake' })
      for (const s of lesson.shortcuts) items.push({ text: `${s.technique}: ${s.description} (Example: ${s.example})`, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'shortcut' })
      for (const o of lesson.objectives) items.push({ text: o, score: 0, topicId: topic.id, topicTitle: topic.title, lessonId: lesson.id, lessonTitle: lesson.title, type: 'objective' })
    }
  }
  for (const f of formulas) {
    const topicName = f.category.charAt(0).toUpperCase() + f.category.slice(1)
    items.push({ text: `${f.name}: ${f.formula} - ${f.explanation}`, score: 0, topicId: f.category, topicTitle: topicName, lessonId: '', lessonTitle: f.name, type: 'formula' })
  }
  return items
}

let cachedItems: SearchResult[] | null = null

function getItems(): SearchResult[] {
  if (!cachedItems) cachedItems = getAllSearchableItems()
  return cachedItems
}

const commonGREQuestions: Record<string, string> = {
  'pemdas': 'PEMDAS stands for Parentheses, Exponents, Multiplication and Division (same level, left to right), and Addition and Subtraction (same level, left to right). Multiplication and division have equal priority; process left to right. Same for addition and subtraction.',
  'quadratic formula': 'The quadratic formula solves ax² + bx + c = 0: x = [-b ± √(b² - 4ac)] / 2a. The discriminant Δ = b² - 4ac determines the number of real solutions.',
  'area of triangle': 'Area of a triangle = ½ × base × height. For a right triangle, the legs are the base and height.',
  'area of circle': 'Area of a circle = πr². Circumference = 2πr or πd.',
  'pythagorean theorem': 'In a right triangle: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle).',
  'mean median mode': 'Mean = sum ÷ count. Median = middle value when sorted. Mode = most frequent value. Range = max - min.',
  'standard deviation': 'Standard deviation measures spread around the mean. Low SD = data clustered near mean. High SD = data spread out.',
  'probability': 'Probability = favorable outcomes / total outcomes. For independent events: P(A and B) = P(A) × P(B). For mutually exclusive: P(A or B) = P(A) + P(B).',
  'permutation combination': 'Permutations (order matters): nPr = n!/(n-r)!. Combinations (order doesn\'t matter): nCr = n!/(r!(n-r)!).',
}

export function askQuestion(query: string): ChatResponse {
  const trimmed = query.trim()
  if (!trimmed) return { answer: 'Please ask a question about a GRE topic.', sources: [], followUps: [] }

  const queryTokens = tokenize(trimmed)

  const items = getItems()
  const scored = items.map(item => ({
    ...item,
    score: scoreTokens(queryTokens, item.text),
  }))
  scored.sort((a, b) => b.score - a.score)
  const top = scored.filter(s => s.score > 0).slice(0, 20)

  if (top.length === 0) {
    return {
      answer: 'I couldn\'t find specific information about that in the GRE curriculum. Try asking about a specific topic like arithmetic, algebra, geometry, or vocabulary.',
      sources: [],
      followUps: ['What is PEMDAS?', 'Explain the quadratic formula', 'How do I calculate probability?', 'What are the most common GRE math topics?'],
    }
  }

  const seenLessons = new Set<string>()
  const uniqueTop: SearchResult[] = []
  for (const item of top) {
    const key = `${item.topicId}:${item.lessonId}`
    if (!seenLessons.has(key)) {
      seenLessons.add(key)
      uniqueTop.push(item)
    }
  }

  const usedLessons = uniqueTop.slice(0, 4)

  const answerParts: string[] = []
  const answerTypes = new Set<string>()
  for (const result of usedLessons) {
    if (answerTypes.has(result.type)) continue
    answerTypes.add(result.type)
    if (result.type === 'explanation') {
      answerParts.push(`**${result.lessonTitle}**\n${result.text}`)
    } else if (result.type === 'keyIdea') {
      answerParts.push(`📌 ${result.text}`)
    } else if (result.type === 'formula') {
      answerParts.push(`📐 ${result.text}`)
    } else if (result.type === 'shortcut') {
      answerParts.push(`⚡ ${result.text}`)
    } else if (result.type === 'commonMistake') {
      answerParts.push(`⚠️ ${result.text}`)
    } else if (result.type === 'example') {
      answerParts.push(`💡 ${result.text.slice(0, 300)}`)
    } else if (result.type === 'objective') {
      answerParts.push(`🎯 ${result.text}`)
    }
  }

  const sources = [...new Set(usedLessons.map(r => r.topicTitle))].map(title => {
    const topic = curriculum.find(t => t.title === title)
    return { title, topicId: topic?.id ?? '' }
  })

  const topicTitles = [...new Set(usedLessons.map(r => r.topicTitle))]
  const followUps: string[] = []
  const suggestQuestions: Record<string, string> = {
    'Arithmetic': 'How do I handle absolute value equations?',
    'Algebra': 'How do I solve systems of equations?',
    'Geometry': 'What are the circle formulas I need to know?',
    'Statistics': 'When do I use standard deviation vs variance?',
    'Probability': 'How do I tell permutations from combinations?',
    'Number Properties': 'What are the divisibility rules?',
  }
  for (const t of topicTitles.slice(0, 2)) {
    if (suggestQuestions[t]) followUps.push(suggestQuestions[t])
  }
  if (followUps.length < 3) {
    followUps.push('What should I study next?')
  }

  const answer = answerParts.length > 0
    ? answerParts.join('\n\n')
    : uniqueTop[0]?.text.slice(0, 500) ?? 'Try rephrasing your question about a GRE topic.'

  return { answer, sources, followUps: followUps.slice(0, 3) }
}

export function getSuggestedQuestions(): string[] {
  return [
    'Explain PEMDAS with examples',
    'What is the quadratic formula?',
    'How do I find the area of a triangle?',
    'What\'s the difference between mean and median?',
    'How do probability and combinations work?',
    'Common mistakes in integer operations',
  ]
}
