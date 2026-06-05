import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { signIn, signUp } from '../lib/db'

export function LoginPage() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = isSignUp
        ? await signUp(email, password, displayName || undefined)
        : await signIn(email, password)

      if (result.error) {
        setError(result.error.message)
      } else if (result.data?.session) {
        navigate('/', { replace: true })
      } else {
        setError('Check your email for the confirmation link.')
      }
    } catch {
      setError('Network error — check your internet connection or the Supabase URL in .env')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px 12px 44px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: 15,
    background: 'var(--bg)',
    color: 'var(--text)',
    outline: 'none',
  }

  const iconWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 40,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <GraduationCap size={40} color="var(--primary)" style={{ marginBottom: 12 }} />
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>GRE Prep</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              marginBottom: 20,
              fontSize: 14,
              background: error.includes('Check your email')
                ? 'var(--primary-light)'
                : 'rgba(234, 67, 53, 0.1)',
              color: error.includes('Check your email')
                ? 'var(--primary)'
                : 'var(--accent)',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <div style={iconWrapperStyle}>
                <Mail size={18} />
              </div>
              <input
                type="text"
                placeholder="Display name (optional)"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <div style={iconWrapperStyle}>
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={iconWrapperStyle}>
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                padding: 0,
                display: 'flex',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: 15,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => { setIsSignUp(prev => !prev); setError('') }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: 14,
              fontWeight: 500,
              padding: 0,
            }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
