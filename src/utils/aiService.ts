import { GoogleGenerativeAI } from '@google/generative-ai'
import { askQuestion as localAsk, getSuggestedQuestions } from './chatEngine'

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

export interface AIResponse {
  text: string
  sources?: { title: string; topicId: string }[]
  followUps?: string[]
  mode: 'gemini' | 'local'
}

const SYSTEM_PROMPT = `You are an expert GRE (Graduate Record Examination) prep tutor. You help students with:

1. **Quantitative Reasoning**: Arithmetic, algebra, geometry, data analysis, probability, statistics, and number properties
2. **Verbal Reasoning**: Reading comprehension, text completion, sentence equivalence, vocabulary
3. **Analytical Writing**: Issue analysis, argument analysis, essay structure
4. **Test Strategies**: Time management, question types, pacing, guessing strategies

Teaching style guidelines:
- Be concise but thorough
- Explain concepts step-by-step with examples
- Use simple language before introducing technical terms
- When explaining math, show the formula and walk through a solved example
- For vocabulary, provide mnemonics and usage context
- Adapt your response to the apparent skill level of the student
- If a question is ambiguous, ask for clarification
- Encourage the student with positive reinforcement

When citing formulas or rules, be precise. If asked something outside GRE scope, politely refocus on relevant material.`

const FALLBACK_PROMPT = `Based on the GRE prep curriculum, here's what I found:\n\n`

export async function getAnswer(
  messages: ChatMessage[],
  apiKey: string | null,
): Promise<AIResponse> {
  if (apiKey) {
    try {
      return await getGeminiAnswer(messages, apiKey)
    } catch (err) {
      console.warn('Gemini API failed, falling back to local:', err)
    }
  }
  return getLocalAnswer(messages)
}

async function getGeminiAnswer(
  messages: ChatMessage[],
  apiKey: string,
): Promise<AIResponse> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
  })

  const contents = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }],
  }))

  const result = await model.generateContent({ contents })
  const text = result.response.text()

  return {
    text,
    mode: 'gemini',
    followUps: generateFollowUps(text),
  }
}

function getLocalAnswer(messages: ChatMessage[]): AIResponse {
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
  const query = lastUserMsg?.text ?? ''
  const localResult = localAsk(query)

  return {
    ...localResult,
    mode: 'local',
  }
}

function generateFollowUps(text: string): string[] {
  const lower = text.toLowerCase()
  const suggestions: string[] = []

  if (lower.includes('pemdas') || lower.includes('order of operations')) {
    suggestions.push('Give me more PEMDAS examples')
  } else if (lower.includes('quadratic') || lower.includes('algebra')) {
    suggestions.push('Show me how to solve a quadratic equation step by step')
  } else if (lower.includes('geometry') || lower.includes('circle') || lower.includes('triangle') || lower.includes('area')) {
    suggestions.push('What are the key geometry formulas for the GRE?')
  } else if (lower.includes('probability') || lower.includes('permutation') || lower.includes('combination')) {
    suggestions.push('How do I know when to use permutation vs combination?')
  } else if (lower.includes('vocab') || lower.includes('word') || lower.includes('root')) {
    suggestions.push('Show me common GRE word roots')
  } else if (lower.includes('essay') || lower.includes('writing') || lower.includes('argument')) {
    suggestions.push('What structure should I use for the issue essay?')
  } else if (lower.includes('strategy') || lower.includes('time') || lower.includes('pace')) {
    suggestions.push('How should I pace myself during the GRE?')
  }

  suggestions.push('What should I study next?')
  return suggestions.slice(0, 3)
}

export { getSuggestedQuestions }
