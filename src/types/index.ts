export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  category: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  topicId: string
  content: string
  objectives: string[]
  explanation: string
  keyIdeas: string[]
  formulas: Formula[]
  examples: Example[]
  solvedExamples: SolvedExample[]
  commonMistakes: CommonMistake[]
  shortcuts: Shortcut[]
  practiceQuestions: string[]
}

export interface Formula {
  id: string
  formula: string
  name: string
  explanation: string
  usage: string
  category: 'arithmetic' | 'algebra' | 'geometry' | 'statistics' | 'probability' | 'number_properties'
  examples: string[]
}

export interface Example {
  question: string
  solution: string
  explanation: string
  options?: string[]
}

export interface SolvedExample {
  problem: string
  solution: string
  steps: string[]
  answer: string
  options?: string[]
}

export interface CommonMistake {
  mistake: string
  correction: string
  explanation: string
}

export interface Shortcut {
  technique: string
  description: string
  example: string
}

export interface FigureConfig {
  type: string
  params: Record<string, number | string | number[] | string[]>
}

export interface Question {
  id: string
  type: 'quant' | 'verbal' | 'writing'
  subtype: 'mcq' | 'numeric' | 'qc' | 'text_completion' | 'sentence_equivalence' | 'reading_comp'
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  stem: string
  choices?: string[]
  answer: string
  explanation: string
  passageId?: string
  tags: string[]
  sourceBooks: string[]
  /** For multi-blank text completions: each entry is the choices for one blank */
  blankGroups?: string[][]
  /** For sentence equivalence / select-all: how many to pick (2 for SE, 0 for any/all) */
  selectCount?: number
  /** For multi-answer questions: the set of correct answers */
  answers?: string[]
  /** Optional geometry figure to render */
  figure?: FigureConfig
}

export interface Passage {
  id: string
  title: string
  content: string
  source: string
  difficulty: 'easy' | 'medium' | 'hard'
  questions: string[]
  wordCount: number
}

export interface VocabularyWord {
  id: string
  word: string
  definition: string
  synonyms: string[]
  antonyms: string[]
  examples: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  frequency: 'high' | 'medium' | 'low'
  tags: string[]
  mnemonics?: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  lastReviewed?: number
  nextReview?: number
  interval: number
  easeFactor: number
  repetitions: number
}

export interface MockTest {
  id: string
  name: string
  sections: MockSection[]
  duration: number
  totalQuestions: number
}

export interface MockSection {
  id: string
  name: string
  type: 'quant' | 'verbal' | 'writing'
  questions: string[]
  duration: number
  questionRange: [number, number]
}

export interface UserProgress {
  topicsCompleted: string[]
  lessonsCompleted: string[]
  practiceHistory: PracticeResult[]
  mockTestHistory: MockTestResult[]
  vocabMastered: string[]
  vocabLearning: string[]
  studyStreak: number
  lastStudyDate: string
  totalStudyTime: number
}

export interface PracticeResult {
  questionId: string
  correct: boolean
  timeSpent: number
  timestamp: number
  topic: string
}

export interface MockTestResult {
  testId: string
  date: string
  scores: { section: string; correct: number; total: number }[]
  totalScore: number
  timePerQuestion: { [key: string]: number }
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard'
export type QuestionType = 'quant' | 'verbal' | 'writing'
