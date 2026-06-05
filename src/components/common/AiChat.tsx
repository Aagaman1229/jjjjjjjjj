import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Settings, Bot, BookOpen, Key, ExternalLink, Check } from 'lucide-react'
import { getAnswer, getSuggestedQuestions } from '../../utils/aiService'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { ChatMessage } from '../../utils/aiService'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  mode?: 'gemini' | 'local'
  sources?: { title: string; topicId: string }[]
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
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
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

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useLocalStorage<Message[]>('gre-chat-history', [])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage<string | null>('gre-gemini-key', null)
  const [keyInput, setKeyInput] = useState('')
  const [keySaved, setKeySaved] = useState(false)
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

  const handleSend = async (text: string) => {
    const q = text.trim()
    if (!q || isTyping) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const chatHistory: ChatMessage[] = messages
      .filter(m => m.role === 'user' || m.role === 'bot')
      .slice(-6)
      .map(m => ({ role: m.role === 'user' ? 'user' as const : 'model' as const, text: m.text }))

    chatHistory.push({ role: 'user', text: q })

    try {
      const response = await getAnswer(chatHistory, apiKey)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response.text,
        mode: response.mode,
        sources: response.sources,
        followUps: response.followUps,
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Sorry, I ran into an error. Please try again.',
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

  const saveApiKey = () => {
    const k = keyInput.trim()
    if (k.startsWith('AIza')) {
      setApiKey(k)
      setKeySaved(true)
      setTimeout(() => setKeySaved(false), 2000)
      setShowSettings(false)
    }
  }

  const clearApiKey = () => {
    setApiKey(null)
    setKeyInput('')
  }

  const suggestedQuestions = getSuggestedQuestions()

  const renderText = (text: string | undefined | null) => {
    const lines = (text || '').split('\n')
    const elements: React.ReactNode[] = []
    let inList = false
    let listItems: React.ReactNode[] = []

    lines.forEach((line, i) => {
      const trimmed = line.trim()
      const isListItem = /^[\d]+\.\s/.test(trimmed) || /^[-*]\s/.test(trimmed)

      if (isListItem) {
        inList = true
        const content = trimmed.replace(/^[\d]+\.\s/, '').replace(/^[-*]\s/, '')
        listItems.push(
          <li key={`li-${i}`} style={{ marginLeft: 16, marginBottom: 2 }}>
            {renderInline(content)}
          </li>
        )
        return
      }

      if (inList) {
        elements.push(<ul key={`list-${i}`} style={{ margin: '4px 0', padding: 0 }}>{listItems}</ul>)
        listItems = []
        inList = false
      }

      if (!trimmed) {
        elements.push(<br key={`br-${i}`} />)
        return
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        elements.push(
          <div key={`h-${i}`} style={{ fontWeight: 700, fontSize: 15, marginTop: 8, marginBottom: 4 }}>
            {trimmed.slice(2, -2)}
          </div>
        )
        return
      }

      elements.push(
        <div key={`p-${i}`} style={{ marginBottom: 2 }}>
          {renderInline(line)}
        </div>
      )
    })

    if (inList) {
      elements.push(<ul key="list-end" style={{ margin: '4px 0', padding: 0 }}>{listItems}</ul>)
    }

    return elements
  }

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return <span key={i}>{part}</span>
    })
  }

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
            {apiKey ? (
              <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                <Bot size={10} /> AI
              </span>
            ) : (
              <span style={{ ...badgeStyle, background: '#fff3e0', color: '#e65100' }}>
                <BookOpen size={10} /> Local
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
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
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Gemini API Key</span>
              {apiKey && (
                <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32', fontSize: 10 }}>
                  <Check size={8} /> Connected
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>
              Connect your free Google Gemini API key for AI-powered answers beyond the curriculum. Get one at{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)' }}
              >
                Google AI Studio <ExternalLink size={10} style={{ display: 'inline' }} />
              </a>
              {' '}(free, no credit card, never expires).
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="Paste your Gemini API key..."
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
                onKeyDown={e => { if (e.key === 'Enter') saveApiKey() }}
              />
              <button
                onClick={saveApiKey}
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
                ✓ API key saved! Messages will now use Gemini AI.
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
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
                  {apiKey
                    ? `I'm powered by Gemini AI — ask me anything about GRE concepts, strategies, or practice problems.`
                    : `I search the GRE curriculum to help you. Connect a free Gemini API key in settings for AI-powered answers!`}
              </p>
              {!apiKey && (
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
                    <Key size={12} style={{ marginRight: 4 }} /> Configure Gemini API
                  </button>
                </div>
              )}
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
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id}>
              {msg.role === 'bot' && msg.mode && (
                <div style={{ marginLeft: 4, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {msg.mode === 'gemini' ? (
                    <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                      <Bot size={10} /> AI
                    </span>
                  ) : (
                    <span style={{ ...badgeStyle, background: '#fff3e0', color: '#e65100' }}>
                      <BookOpen size={10} /> Local
                    </span>
                  )}
                </div>
              )}
              <div style={msg.role === 'user' ? userBubbleStyle : botBubbleStyle}>
                {renderText(msg.text)}
                {msg.role === 'bot' && msg.sources && msg.sources.length > 0 && msg.mode === 'local' && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border-light)', fontSize: 12, color: 'var(--text-muted)' }}>
                    📚 Sources: {msg.sources.map((s, i) => (
                      <span key={i}>{i > 0 && ', '}{s.title}</span>
                    ))}
                  </div>
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
                {apiKey ? (
                  <span style={{ ...badgeStyle, background: '#e8f5e9', color: '#2e7d32' }}>
                    <Bot size={10} /> AI
                  </span>
                ) : (
                  <span style={{ ...badgeStyle, background: '#fff3e0', color: '#e65100' }}>
                    <BookOpen size={10} /> Local
                  </span>
                )}
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
            placeholder={apiKey ? 'Ask anything about GRE...' : 'Ask a question about GRE topics...'}
            rows={1}
            style={inputStyle}
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend(input)}
            style={{ ...sendBtnStyle, opacity: input.trim() && !isTyping ? 1 : 0.5 }}
            disabled={!input.trim() || isTyping}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
