import { useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'

const btnGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 4,
}

const calcBtn: React.CSSProperties = {
  padding: '10px',
  border: '1px solid var(--border)',
  borderRadius: 4,
  background: 'var(--bg-card)',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  textAlign: 'center',
}

const operatorBtn: React.CSSProperties = {
  ...calcBtn,
  background: 'var(--primary-light)',
  color: 'var(--primary)',
}

const equalsBtn: React.CSSProperties = {
  ...calcBtn,
  background: 'var(--primary)',
  color: '#fff',
  gridColumn: 'span 2',
}

export function CalculatorPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [display, setDisplay] = useState('0')
  const [memory, setMemory] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [prevValue, setPrevValue] = useState<number | null>(null)

  const handleNumber = (n: string) => {
    setDisplay(prev => prev === '0' ? n : prev + n)
  }

  const handleOperator = (op: string) => {
    setPrevValue(parseFloat(display))
    setOperator(op)
    setDisplay('0')
  }

  const handleEquals = () => {
    if (prevValue === null || !operator) return
    const curr = parseFloat(display)
    let result = 0
    switch (operator) {
      case '+': result = prevValue + curr; break
      case '-': result = prevValue - curr; break
      case '×': result = prevValue * curr; break
      case '÷': result = curr !== 0 ? prevValue / curr : NaN; break
    }
    setDisplay(String(result))
    setPrevValue(null)
    setOperator(null)
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 12px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          color: 'var(--text)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
        }}
      >
        <CalcIcon size={16} /> Calculator
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 260,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 16,
      zIndex: 300,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 13 }}>Calculator</span>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: 14 }}>✕</button>
      </div>

      <div style={{
        padding: '8px 12px',
        background: 'var(--bg-secondary)',
        borderRadius: 4,
        textAlign: 'right',
        fontSize: 20,
        fontFamily: 'var(--font-mono)',
        marginBottom: 8,
        minHeight: 36,
        overflow: 'hidden',
      }}>
        {display}
      </div>

      <div style={btnGrid}>
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', 'C', '+'].map((b, i) => {
          const isOperator = ['+', '-', '×', '÷'].includes(b)
          const isEquals = b === '='
          const style = b === 'C' ? { ...calcBtn, color: '#dc2626' } : isOperator ? operatorBtn : calcBtn
          return (
            <div
              key={i}
              onClick={() => {
                if (b === 'C') handleClear()
                else if (isOperator) handleOperator(b)
                else if (b === '.') handleNumber('.')
                else handleNumber(b)
              }}
              style={style}
            >
              {b}
            </div>
          )
        })}
        <div onClick={handleEquals} style={equalsBtn}>=</div>
      </div>
    </div>
  )
}
