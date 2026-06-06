import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Settings, Bot, Key, ExternalLink, Check, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { getAnswer, getSocraticResponse, suggestedQuestions } from '../../utils/aiService'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { saveApiKey as saveApiKeyToDb, getApiKey as getApiKeyFromDb } from '../../lib/db'
import { useAuth } from '../../contexts/AuthContext'
import type { ChatMessage } from '../../utils/aiService'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  followUps?: string[]
}

const fabStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 52,
  height: 52,
  borderRadius: '50%',
  background: 'var(--primary)',
  color: '#fff',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 300,
  transition: 'all 0.2s ease',
}

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 400,
  height: '100vh',
  background: 'var(--bg-card)',
  borderLeft: '1px solid var(--border)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 300,
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
}

const headerStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'var(--primary-light)',
  flexShrink: 0,
}

const messagesContainerStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const inputContainerStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  gap: 8,
  background: 'var(--bg-card)',
  flexShrink: 0,
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px 14px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
  resize: 'none',
  fontFamily: 'inherit',
}

const sendBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'var(--primary)',
  color: '#fff',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
}

const userBubbleStyle: React.CSSProperties = {
  maxWidth: '88%',
  padding: '10px 14px',
  borderRadius: '16px 16px 4px 16px',
  background: 'var(--primary)',
  color: '#fff',
  fontSize: 14,
  lineHeight: 1.5,
  alignSelf: 'flex-end',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}

const botBubbleStyle: React.CSSProperties = {
  maxWidth: '88%',
  padding: '12px 16px',
  borderRadius: '16px 16px 16px 4px',
  background: 'var(--bg-secondary)',
  color: 'var(--text)',
  fontSize: 14,
  lineHeight: 1.6,
  alignSelf: 'flex-start',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  zIndex: 299,
}

const settingsPanelStyle: React.CSSProperties = {
  padding: '16px',
  borderBottom: '1px solid var(--border)',
  background: 'var(--bg)',
  flexShrink: 0,
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  borderRadius: 10,
  fontSize: 11,
  fontWeight: 600,
}

const markdownComponents = {
  p: ({ children }: { children: React.ReactNode }) => (
    <p style={{ margin: '4px 0', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul style={{ margin: '4px 0', paddingLeft: 20 }}>{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol style={{ margin: '4px 0', paddingLeft: 20 }}>{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li style={{ marginBottom: 2 }}>{children}</li>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code style={{
          background: 'var(--bg)',
          padding: '2px 6px',
          borderRadius: 4,
          fontSize: 13,
          fontFamily: 'monospace',
        }}>{children}</code>
      )
    }
    return (
      <pre style={{
        background: 'var(--bg)',
        padding: 12,
        borderRadius: 'var(--radius)',
        overflowX: 'auto',
        fontSize: 13,
        fontFamily: 'monospace',
        lineHeight: 1.4,
      }}>
        <code>{children}</code>
      </pre>
    )
  },
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong style={{ fontWeight: 700 }}>{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em>{children}</em>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div style={{ overflowX: 'auto', margin: '8px 0' }}>
      <table style={{
        borderCollapse: 'collapse',
        fontSize: 13,
        width: '100%',
      }}>{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th style={{
      border: '1px solid var(--border)',
      padding: '6px 10px',
      background: 'var(--bg)',
      textAlign: 'left',
      fontWeight: 600,
    }}>{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td style={{
      border: '1px solid var(--border)',
      padding: '6px 10px',
    }}>{children}</td>
  ),
}

type SocraticArgs = { question: string; wrongAnswer: string; correctAnswer: string }
let _socraticTrigger: ((args: SocraticArgs) => void) | null = null

export function triggerSocraticTutor(question: string, wrongAnswer: string, correctAnswer: string) {
  _socraticTrigger?.({ question, wrongAnswer, correctAnswer })
}

export function AiChat() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useLocalStorage<Message[]>('gre-chat-history', [])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage<string | null>('gre-groq-key', null)
  const [keyInput, setKeyInput] = useState('')
  const [keySaved, setKeySaved] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [socraticSession, setSocraticSession] = useState<SocraticArgs | null>(null)
  const initialSocraticSentRef = useRef(false)
  const socraticApiKeyRef = useRef(apiKey)
  socraticApiKeyRef.current = apiKey
  const socraticContextRef = useRef('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!apiKey && user) {
      getApiKeyFromDb(user.id, 'groq').then(key => {
        if (key) setApiKey(key)
      })
    }
  }, [user, apiKey, setApiKey])

  useEffect(() => {
    _socraticTrigger = (args) => {
      initialSocraticSentRef.current = false
      setSocraticSession(args)
      setIsOpen(true)
      setMessages([])
    }
    return () => { _socraticTrigger = null }
  }, [setMessages, setIsOpen])

  useEffect(() => {
    if (!socraticSession || initialSocraticSentRef.current) return
    const key = socraticApiKeyRef.current
    if (!key) return

    initialSocraticSentRef.current = true
    setIsTyping(true)

    const { question, wrongAnswer, correctAnswer } = socraticSession
    socraticContextRef.current = `I'm working on this GRE problem:\n\n${question}\n\nI chose "${wrongAnswer}" but the correct answer is "${correctAnswer}". Help me understand why using the Socratic method — guide me with questions, don't give me the answer.`

    getSocraticResponse([{ role: 'user', text: socraticContextRef.current }], key)
      .then(response => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: response.text,
        }
        setMessages([botMsg])
        setIsTyping(false)
      })
      .catch(() => {
        setIsTyping(false)
      })
  }, [socraticSession])

  const handleSend = async (text: string) => {
    const q = text.trim()
    if (!q || isTyping || !apiKey) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    let chatHistory: ChatMessage[] = messages
      .filter(m => m.role === 'user' || m.role === 'bot')
      .slice(-6)
      .map(m => ({ role: m.role === 'user' ? 'user' as const : 'assistant' as const, text: m.text }))

    if (socraticSession) {
      chatHistory = [
        { role: 'user' as const, text: socraticContextRef.current },
        ...chatHistory,
      ]
    }

    chatHistory.push({ role: 'user', text: q })

    try {
      const response = socraticSession
        ? await getSocraticResponse(chatHistory, apiKey)
        : await getAnswer(chatHistory, apiKey)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response.text,
        followUps: response.followUps,
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Sorry, I ran into an error. Please check your API key and try again.',
        followUps: ['What is PEMDAS?', 'Explain the quadratic formula'],
      }
      setMessages(prev => [...prev, botMsg])
    }
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  const saveApiKeyHandler = async () => {
    const k = keyInput.trim()
    if (!k) return

    setApiKey(k)
    setKeySaved(true)
    setTimeout(() => setKeySaved(false), 2000)
    setShowSettings(false)

    if (user) {
      await saveApiKeyToDb(user.id, 'groq', k)
    }
  }

  const clearApiKey = () => {
    setApiKey(null)
    setKeyInput('')
  }

  const clearMessages = () => {
    setMessages([])
    setSocraticSession(null)
    setShowClearConfirm(false)
  }

  const needsKey = !apiKey

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={fabStyle}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        aria-label="Open AI Chat"
        title="Ask AI about GRE topics"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && <div style={overlayStyle} onClick={() => setIsOpen(false)} />}

      <div style={{ ...panelStyle, transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} color="var(--primary)" />
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>GRE Assistant</span>
            {apiKey && (
              <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                <Bot size={10} /> AI
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {messages.length > 0 && !showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
                title="Clear messages"
              >
                <Trash2 size={16} />
              </button>
            ) : showClearConfirm ? (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--accent)' }}>Clear all?</span>
                <button
                  onClick={clearMessages}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: '2px 4px' }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 12, padding: '2px 4px' }}
                >
                  No
                </button>
              </div>
            ) : null}
            <button
              onClick={() => { setShowSettings(!showSettings); setKeyInput(apiKey || '') }}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
              title="Settings"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div style={settingsPanelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Key size={14} color="var(--text-secondary)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Groq API Key</span>
              {apiKey && (
                <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32', fontSize: 10 }}>
                  <Check size={8} /> Connected
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>
              Connect your free Groq API key for AI-powered answers using Llama 3.1. Get one at{' '}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)' }}
              >
                console.groq.com <ExternalLink size={10} style={{ display: 'inline' }} />
              </a>
              {' '}(free tier available).
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="Paste your Groq API key (gsk_...)..."
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontSize: 13,
                  outline: 'none',
                }}
                onKeyDown={e => { if (e.key === 'Enter') saveApiKeyHandler() }}
              />
              <button
                onClick={saveApiKeyHandler}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  background: keySaved ? 'var(--secondary)' : 'var(--primary)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {keySaved ? 'Saved!' : 'Save'}
              </button>
            </div>
            {apiKey && (
              <button
                onClick={clearApiKey}
                style={{
                  marginTop: 8,
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontSize: 12,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Remove API key
              </button>
            )}
            {keySaved && (
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--secondary)' }}>
                ✓ API key saved! You can now ask questions.
              </div>
            )}
          </div>
        )}

        <div style={messagesContainerStyle}>
          {messages.length === 0 && !isTyping && (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-secondary)' }}>
              <Sparkles size={32} color="var(--primary)" style={{ marginBottom: 12 }} />
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: 'var(--text)' }}>
                Hi! I'm your GRE study assistant
              </p>
              {needsKey ? (
                <>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
                    To get started, connect a free Groq API key. It powers the AI with Llama 3.1 for fast, accurate GRE help.
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    <button
                      onClick={() => setShowSettings(true)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--primary)',
                        background: 'transparent',
                        color: 'var(--primary)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Key size={12} style={{ marginRight: 4 }} /> Configure Groq API
                    </button>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary)' }}
                    >
                      Don't have a key? Get one free <ExternalLink size={10} style={{ display: 'inline' }} />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
                    Ask me anything about GRE concepts, strategies, or practice problems.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius)',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          color: 'var(--primary)',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)' }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {socraticSession && (
            <div style={{
              background: 'var(--primary-light)',
              border: '1px solid var(--primary)',
              borderRadius: 'var(--radius)',
              padding: '12px 14px',
              marginBottom: 8,
              fontSize: 13,
              lineHeight: 1.5,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Socratic Tutoring
                </span>
                <button
                  onClick={() => { setSocraticSession(null); setMessages([]) }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}
                >
                  Exit
                </button>
              </div>
              <div style={{ color: 'var(--text)', marginBottom: 4, whiteSpace: 'pre-wrap' }}>
                {socraticSession.question}
              </div>
              <div style={{ color: 'var(--accent)', fontSize: 12 }}>
                You answered: <strong>{socraticSession.wrongAnswer}</strong>
              </div>
              <div style={{ color: 'var(--secondary)', fontSize: 12 }}>
                Correct answer: <strong>{socraticSession.correctAnswer}</strong>
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id}>
              {msg.role === 'bot' && (
                <div style={{ marginLeft: 4, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                    <Bot size={10} /> AI
                  </span>
                </div>
              )}
              <div style={msg.role === 'user' ? userBubbleStyle : botBubbleStyle}>
                {msg.role === 'user' ? (
                  msg.text.split('\n').map((line, i) => (
                    <span key={i}>{i > 0 ? <br /> : null}{line}</span>
                  ))
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={markdownComponents}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
              {msg.role === 'bot' && msg.followUps && msg.followUps.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4, marginLeft: 4 }}>
                  {msg.followUps.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--primary)',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div>
              <div style={{ marginLeft: 4, marginBottom: 2 }}>
                <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                  <Bot size={10} /> AI
                </span>
              </div>
              <div style={{ ...botBubbleStyle, display: 'flex', gap: 5, alignItems: 'center', padding: '14px 18px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.6 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.3 }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={inputContainerStyle}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={needsKey ? 'Add an API key in settings to start...' : 'Ask anything about GRE...'}
            rows={1}
            style={inputStyle}
            disabled={isTyping || needsKey}
          />
          <button
            onClick={() => handleSend(input)}
            style={{ ...sendBtnStyle, opacity: input.trim() && !isTyping && !needsKey ? 1 : 0.5 }}
            disabled={!input.trim() || isTyping || needsKey}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
