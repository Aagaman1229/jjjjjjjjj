import Groq from 'groq-sdk'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

export interface AIResponse {
  text: string
  followUps?: string[]
  mode: 'groq'
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
- Format math expressions using LaTeX with $...$ for inline and $$...$$ for display math
- For vocabulary, provide mnemonics and usage context
- Adapt your response to the apparent skill level of the student
- If a question is ambiguous, ask for clarification
- Encourage the student with positive reinforcement

When citing formulas or rules, be precise. If asked something outside GRE scope, politely refocus on relevant material.`

export async function getAnswer(
  messages: ChatMessage[],
  apiKey: string,
): Promise<AIResponse> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.text })),
    ],
  })

  const text = completion.choices[0]?.message?.content ?? ''

  return {
    text,
    mode: 'groq',
    followUps: generateFollowUps(text),
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

const SOCRATIC_SYSTEM_PROMPT = `You are a Socratic GRE math tutor using the Socratic method. Guide students to discover solutions themselves through short, focused questions.

RULES:
- NEVER give away the answer directly
- Keep EVERY response to 1-2 sentences maximum
- Ask only ONE guiding question at a time
- Use LaTeX ($...$ or $$...$$) for math expressions
- If the student is on the right track, affirm briefly then guide further
- If they are stuck, give a small hint phrased as a question
- Be encouraging and patient
- Reference the specific numbers or relationships in the problem

The student already knows what the correct answer is — help them understand WHY it is correct through reasoning.`

export async function getSocraticResponse(
  messages: ChatMessage[],
  apiKey: string,
): Promise<AIResponse> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SOCRATIC_SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.text })),
    ],
  })

  const text = completion.choices[0]?.message?.content ?? ''

  return { text, mode: 'groq', followUps: [] }
}

const VOCAB_GAME_SYSTEM = `You are a GRE vocabulary game designer. Given a vocabulary word, create a 2-sentence GRE-style mini-story that uses the word in context. Leave a blank (marked as _____) where a synonym of the given word should go. The blank must be filled by a synonym of the original word, not the word itself. Return ONLY the story, nothing else.`

export async function getVocabGamePrompt(word: string, apiKey: string): Promise<string> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: VOCAB_GAME_SYSTEM },
      { role: 'user', content: `Word: "${word}"` },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

const GUESS_CHECK_SYSTEM = `You are a GRE vocabulary tutor. A student is playing a fill-in-the-blank game. Given the original word, the story with a blank, and the student's guess: respond with "correct" if the guess fits as a valid synonym in context, or "incorrect: [one-sentence hint]" otherwise. Be precise — the blank expects a synonym of the original word. Respond in 1 line only.`

export async function checkVocabGuess(word: string, guess: string, storyContext: string, apiKey: string): Promise<string> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: GUESS_CHECK_SYSTEM },
      { role: 'user', content: `Original word: "${word}"\nStory: "${storyContext}"\nStudent's guess: "${guess}"` },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

const SIMPLIFY_SYSTEM = `You are a GRE reading comprehension assistant. Rewrite dense academic sentences into plain, conversational English while preserving the exact meaning. Use simpler vocabulary and clearer sentence structure. Respond with ONLY the simplified version.`

export async function simplifyText(text: string, apiKey: string): Promise<string> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SIMPLIFY_SYSTEM },
      { role: 'user', content: `Simplify this sentence:\n\n"${text}"` },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

const MNEMONIC_SYSTEM = `You are a GRE vocabulary mnemonic expert. Given a word and its definition, create two things separated by a "||" delimiter:
1. A funny, unforgettable mnemonic connection technique (1-2 sentences)
2. A descriptive 1-sentence image prompt that could be used to generate a memorable visual

Example output: "Abate sounds like 'a bait' — imagine throwing bait into a storm to make it calm down.||A person tossing a piece of bait into a raging hurricane, calming the waves instantly."`

export async function generateMnemonic(word: string, definition: string, apiKey: string): Promise<{ mnemonic: string; imagePrompt: string }> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: MNEMONIC_SYSTEM },
      { role: 'user', content: `Word: "${word}"\nDefinition: "${definition}"` },
    ],
  })
  const text = completion.choices[0]?.message?.content ?? ''
  const parts = text.split('||')
  return {
    mnemonic: parts[0]?.trim() || text,
    imagePrompt: parts[1]?.trim() || '',
  }
}

const SPOKEN_CHECK_SYSTEM = `You are a GRE vocabulary tutor. A student is practicing vocabulary by speaking definitions aloud. Given a word, its correct definition, and what the student said: respond with "correct" if the student's spoken answer captures the key semantic meaning (even if phrased differently), or "incorrect: [one-sentence hint about the correct meaning]". Respond in 1 line only.`

export async function checkSpokenDefinition(word: string, definition: string, spokenText: string, apiKey: string): Promise<string> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SPOKEN_CHECK_SYSTEM },
      { role: 'user', content: `Word: "${word}"\nCorrect definition: "${definition}"\nStudent said: "${spokenText}"` },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

export async function transcribeAudio(audioBlob: Blob, apiKey: string): Promise<string> {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
  const transcription = await groq.audio.transcriptions.create({
    model: 'whisper-large-v3-turbo',
    file: audioBlob,
    response_format: 'text',
  })
  return transcription.text
}

const suggestedQuestions = [
  'What are the most common GRE math formulas?',
  'How can I improve my vocabulary for the GRE?',
  'Explain the structure of the GRE analytical writing section',
  'What strategies work best for reading comprehension?',
  'How is the GRE scored?',
]

export { suggestedQuestions }
