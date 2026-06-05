import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { formatTime } from '../../utils/helpers'

interface TimerProps {
  duration: number
  running: boolean
  onTimeUp: () => void
}

export function Timer({ duration, running, onTimeUp }: TimerProps) {
  const [remaining, setRemaining] = useState(duration)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running, onTimeUp])

  useEffect(() => {
    setRemaining(duration)
  }, [duration])

  const isLow = remaining < 300
  const elapsed = duration - remaining

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: isLow ? 'var(--accent)' : 'var(--text)',
      fontWeight: 600,
      fontSize: 15,
      fontFamily: 'var(--font-mono)',
    }}>
      <Clock size={16} color={isLow ? 'var(--accent)' : 'var(--text-muted)'} />
      <span>{formatTime(remaining)}</span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>
        / {formatTime(duration)}
      </span>
    </div>
  )
}
