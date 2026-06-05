import type { FigureConfig } from '../../types'

function coord(s: number[], scale: number): string {
  return s.map((v, i) => `${(v * scale) + (i % 2 === 0 ? 200 : 200)}`).join(',')
}

function pointOnCircle(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function textOffset(angleDeg: number, dist = 18): [number, number] {
  const rad = (angleDeg * Math.PI) / 180
  return [dist * Math.cos(rad), dist * Math.sin(rad)]
}

export function GeometryFigure({ figure }: { figure: FigureConfig }) {
  const { type, params } = figure
  const s = 200
  const viewBox = `0 0 ${s * 2} ${s * 2}`

  const commonProps = {
    stroke: 'var(--text)',
    fill: 'none',
    strokeWidth: 2,
  }

  const renderFigure = () => {
    switch (type) {
      case 'inscribed_circle_square': {
        const side = (params.side as number) || 10
        const scale = s * 0.8 / side
        const half = (side * scale) / 2
        const cx = s - half
        const cy = s - half
        const r = half
        return (
          <>
            <rect x={cx - half} y={cy - half} width={half * 2} height={half * 2} {...commonProps} />
            <circle cx={cx} cy={cy} r={r} {...commonProps} />
            <text x={cx} y={s * 2 - 12} textAnchor="middle" fontSize={14} fill="var(--text-muted)">side = {side}</text>
          </>
        )
      }

      case 'square_inscribed_circle': {
        const r = (params.radius as number) || 5
        const scale = s * 0.8 / (r * 2)
        const cx = s
        const cy = s
        const half = r * scale
        const diag = half * Math.SQRT2
        return (
          <>
            <circle cx={cx} cy={cy} r={half} {...commonProps} />
            <rect x={cx - diag} y={cy - diag} width={diag * 2} height={diag * 2} {...commonProps} transform={`rotate(45 ${cx} ${cy})`} />
            <text x={cx} y={cy + half + 24} textAnchor="middle" fontSize={14} fill="var(--text-muted)">r = {r}</text>
          </>
        )
      }

      case 'triangle': {
        const sides = params.sides as number[] | undefined
        const angles = params.angles as number[] | undefined
        const labels = params.labels as string[] | undefined
        const scale = s * 0.7 / ((sides?.[0] as number) || 10)
        const a: [number, number] = [s - 140, s + 100]
        const b: [number, number] = [s + 140, s + 100]
        const baseLen = b[0] - a[0]
        const sideAC = (sides?.[1] as number) || baseLen
        const sideBC = (sides?.[2] as number) || baseLen
        const cx_ = (a[0] + b[0]) / 2
        const cy_ = a[1]
        const h = Math.sqrt(sideAC * sideAC - (baseLen / 2) * (baseLen / 2))
        const c: [number, number] = [cx_, cy_ - h * scale]
        const pts = `${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]}`
        return (
          <>
            <polygon points={pts} {...commonProps} />
            {labels && (
              <>
                <text x={a[0] - 16} y={a[1] + 6} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[0] || 'A'}</text>
                <text x={b[0] + 8} y={b[1] + 6} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[1] || 'B'}</text>
                <text x={c[0] - 8} y={c[1] - 10} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[2] || 'C'}</text>
              </>
            )}
            {sides && (
              <text x={s} y={s * 2 - 8} textAnchor="middle" fontSize={13} fill="var(--text-muted)">
                sides: {sides.join(', ')}
              </text>
            )}
            {angles && (
              <text x={s} y={s * 2 - 8} textAnchor="middle" fontSize={13} fill="var(--text-muted)">
                angles: {angles.join('°, ')}°
              </text>
            )}
          </>
        )
      }

      case 'right_triangle': {
        const sides = params.sides as number[] || [3, 4, 5]
        const labels = params.labels as string[] || ['A', 'B', 'C']
        const scale = s * 0.6 / (Math.max(...sides))
        const legA = sides[0] * scale
        const legB = sides[1] * scale
        const rightAngle: [number, number] = [s - legA * 0.4, s + legB * 0.4]
        const top: [number, number] = [rightAngle[0], rightAngle[1] - legB]
        const right: [number, number] = [rightAngle[0] + legA, rightAngle[1]]
        const pts = `${rightAngle[0]},${rightAngle[1]} ${top[0]},${top[1]} ${right[0]},${right[1]}`
        return (
          <>
            <polygon points={pts} {...commonProps} />
            <polyline points={`${rightAngle[0] + 10},${rightAngle[1]} ${rightAngle[0] + 10},${rightAngle[1] - 10} ${rightAngle[0]},${rightAngle[1] - 10}`} {...commonProps} strokeWidth={1.5} />
            <text x={rightAngle[0] - 16} y={rightAngle[1] + 6} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[0]}</text>
            <text x={top[0] - 10} y={top[1] - 8} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[1]}</text>
            <text x={right[0] + 8} y={right[1] + 6} fontSize={15} fill="var(--primary)" fontWeight={700}>{labels[2]}</text>
            {sides[0] && <text x={(rightAngle[0] + right[0]) / 2} y={rightAngle[1] + 20} textAnchor="middle" fontSize={13} fill="var(--text)">{sides[0]}</text>}
            {sides[1] && <text x={rightAngle[0] - 16} y={(rightAngle[1] + top[1]) / 2} textAnchor="middle" fontSize={13} fill="var(--text)">{sides[1]}</text>}
            {sides[2] && <text x={(rightAngle[0] + right[0]) / 2 + 10} y={(rightAngle[1] + top[1]) / 2 - 10} textAnchor="middle" fontSize={13} fill="var(--text)">{sides[2]}</text>}
          </>
        )
      }

      case 'tangent_circles': {
        const r1 = (params.radius1 as number) || 4
        const r2 = (params.radius2 as number) || 2
        const scale = s * 0.6 / (r1 + r2)
        const gap = (r1 + r2) * scale + 4
        const cx1 = s - gap / 2
        const cx2 = s + gap / 2
        const cy_ = s
        return (
          <>
            <circle cx={cx1} cy={cy_} r={r1 * scale} {...commonProps} />
            <circle cx={cx2} cy={cy_} r={r2 * scale} {...commonProps} />
            {params.labelA && <text x={cx1} y={cy_ + r1 * scale + 20} textAnchor="middle" fontSize={13} fill="var(--text)">{params.labelA as string}</text>}
            {params.labelB && <text x={cx2} y={cy_ + r2 * scale + 20} textAnchor="middle" fontSize={13} fill="var(--text)">{params.labelB as string}</text>}
            {params.showPointB && <circle cx={cx1 + r1 * scale} cy={cy_} r={3} fill="var(--accent)" stroke="none" />}
            {params.showPointB && <text x={cx1 + r1 * scale + 8} y={cy_ - 8} fontSize={13} fill="var(--accent)" fontWeight={600}>B</text>}
          </>
        )
      }

      case 'circle_triangle': {
        const r = (params.radius as number) || 5
        const scale = s * 0.7 / r
        const cx = s
        const cy = s
        const angles = (params.inscribedAngles as number[]) || [0, 120, 240]
        const pts = angles.map(a => pointOnCircle(cx, cy, r * scale, a))
        const polyPts = pts.map(p => `${p[0]},${p[1]}`).join(' ')
        const labels = params.labels as string[] || ['A', 'B', 'C']
        return (
          <>
            <circle cx={cx} cy={cy} r={r * scale} {...commonProps} />
            <polygon points={polyPts} {...commonProps} />
            {params.showCenter && <circle cx={cx} cy={cy} r={3} fill="var(--text)" stroke="none" />}
            {params.showCenter && <text x={cx + 8} y={cy + 4} fontSize={14} fill="var(--primary)" fontWeight={700}>O</text>}
            {pts.map((p, i) => (
              <text key={i} x={p[0] + textOffset(angles[i], 16)[0]} y={p[1] + textOffset(angles[i], 16)[1]} textAnchor="middle" fontSize={14} fill="var(--primary)" fontWeight={700}>{labels[i]}</text>
            ))}
          </>
        )
      }

      case 'trapezoid': {
        const labels = params.labels as string[] || ['E', 'F', 'G', 'H']
        const topW = (params.topWidth as number) || 6
        const botW = (params.bottomWidth as number) || 10
        const h = (params.height as number) || 6
        const scale = s * 0.6 / (Math.max(botW, h))
        const bLeft = s - (botW * scale) / 2
        const bRight = s + (botW * scale) / 2
        const tLeft = s - (topW * scale) / 2
        const tRight = s + (topW * scale) / 2
        const topY = s - (h * scale) / 2
        const botY = s + (h * scale) / 2
        const pts = `${tLeft},${topY} ${tRight},${topY} ${bRight},${botY} ${bLeft},${botY}`
        return (
          <>
            <polygon points={pts} {...commonProps} />
            {labels.map((l, i) => {
              const positions = [
                [tLeft - 16, topY],
                [tRight + 8, topY],
                [bRight + 8, botY],
                [bLeft - 16, botY],
              ]
              return <text key={i} x={positions[i][0]} y={positions[i][1] + 5} fontSize={14} fill="var(--primary)" fontWeight={700}>{l}</text>
            })}
          </>
        )
      }

      case 'rectangle': {
        const w = (params.width as number) || 8
        const h = (params.height as number) || 6
        const labels = params.labels as string[] || ['A', 'B', 'C', 'D']
        const scale = s * 0.6 / (Math.max(w, h))
        const rw = w * scale
        const rh = h * scale
        const rx = s - rw / 2
        const ry = s - rh / 2
        return (
          <>
            <rect x={rx} y={ry} width={rw} height={rh} {...commonProps} />
            <text x={rx - 14} y={ry + 5} fontSize={14} fill="var(--primary)" fontWeight={700}>{labels[0]}</text>
            <text x={rx + rw + 4} y={ry + 5} fontSize={14} fill="var(--primary)" fontWeight={700}>{labels[1]}</text>
            <text x={rx + rw + 4} y={ry + rh + 5} fontSize={14} fill="var(--primary)" fontWeight={700}>{labels[2]}</text>
            <text x={rx - 14} y={ry + rh + 5} fontSize={14} fill="var(--primary)" fontWeight={700}>{labels[3]}</text>
          </>
        )
      }

      case 'coordinate_plane': {
        const pts = params.points as string[] | undefined
        const showLine = params.showLine as string | undefined
        return (
          <>
            <line x1={40} y1={s} x2={s * 2 - 40} y2={s} {...commonProps} strokeWidth={1} />
            <line x1={s} y1={40} x2={s} y2={s * 2 - 40} {...commonProps} strokeWidth={1} />
            <polygon points={`${s * 2 - 40},${s} ${s * 2 - 46},${s - 5} ${s * 2 - 46},${s + 5}`} fill="var(--text)" stroke="none" />
            <polygon points={`${s},${40} ${s - 5},${46} ${s + 5},${46}`} fill="var(--text)" stroke="none" />
            <text x={s * 2 - 32} y={s + 5} fontSize={13} fill="var(--text-muted)">x</text>
            <text x={s + 6} y={34} fontSize={13} fill="var(--text-muted)">y</text>
            {pts?.map((pt, i) => {
              const [x, y, label] = pt.split(',')
              const px = s + Number(x) * 30
              const py = s - Number(y) * 30
              return (
                <g key={i}>
                  <circle cx={px} cy={py} r={4} fill="var(--primary)" stroke="none" />
                  <text x={px + 8} y={py + 4} fontSize={13} fill="var(--primary)" fontWeight={600}>{label || `(${x},${y})`}</text>
                </g>
              )
            })}
            {showLine && (() => {
              const [x1, y1, x2, y2] = showLine.split(',').map(Number)
              return <line x1={s + x1 * 30} y1={s - y1 * 30} x2={s + x2 * 30} y2={s - y2 * 30} {...commonProps} stroke="var(--accent)" strokeDasharray="6,3" />
            })()}
          </>
        )
      }

      case 'circle': {
        const circR = (params.radius as number) || 5
        const label = params.label as string | undefined
        const scale = s * 0.7 / circR
        const cx = s
        const cy = s
        return (
          <>
            <circle cx={cx} cy={cy} r={circR * scale} {...commonProps} />
            {label && <text x={cx} y={cy - circR * scale - 12} textAnchor="middle" fontSize={14} fill="var(--text)">{label}</text>}
            {params.showRadius && <line x1={cx} y1={cy} x2={cx + circR * scale} y2={cy} {...commonProps} stroke="var(--secondary)" strokeWidth={1.5} />}
            {params.showRadius && <text x={cx + (circR * scale) / 2} y={cy - 8} textAnchor="middle" fontSize={12} fill="var(--secondary)">r</text>}
            {params.showCenter && <circle cx={cx} cy={cy} r={3} fill="var(--text)" stroke="none" />}
            {params.showCenter && <text x={cx + 8} y={cy + 4} fontSize={14} fill="var(--primary)" fontWeight={700}>O</text>}
          </>
        )
      }

      default:
        return <text x={s} y={s} textAnchor="middle" fontSize={14} fill="var(--text-muted)">Figure not available</text>
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <svg
        viewBox={viewBox}
        style={{
          width: '100%',
          maxWidth: 360,
          height: 'auto',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-light)',
        }}
      >
        {renderFigure()}
      </svg>
    </div>
  )
}
