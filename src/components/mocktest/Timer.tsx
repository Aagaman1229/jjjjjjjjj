import { useEffect, useState, useRef } from 'react'

interface TimerProps {
  duration: number
  running: boolean
  onTimeUp: () => void
}

const ETS_WARN = '#cc3300'

export function Timer({ duration, running, onTimeUp }: TimerProps) {
  const [remaining, setRemaining] = useState(duration)
  const timeUpCalled = useRef(false)

  useEffect(() => {
    if (!running) return
    timeUpCalled.current = false
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          if (!timeUpCalled.current) {
            timeUpCalled.current = true
            onTimeUp()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running, onTimeUp, duration])

  const isLow = remaining < 300
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      fontSize: 20,
      color: isLow ? ETS_WARN : '#000',
      letterSpacing: 1,
    }}>
      {isLow && (
        <span style={{ fontSize: 14, color: ETS_WARN, fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>
          ⚠
        </span>
      )}
      <span>{timeStr}</span>
      <span style={{
        fontSize: 11,
        color: '#999',
        fontWeight: 400,
        fontFamily: 'Arial, sans-serif',
      }}>
        remaining
      </span>
    </div>
  )
}
