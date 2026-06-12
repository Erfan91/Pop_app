import { useEffect, useRef } from 'react'
import '../styles/moods.css'

function drawAvatar(ctx, img, S, C, R) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(C, C, R - 6, 0, Math.PI * 2)
    ctx.clip()
    if (img && img.complete) {
        ctx.drawImage(img, C - (R - 6), C - (R - 6), (R - 6) * 2, (R - 6) * 2)
    } else {
        ctx.fillStyle = '#3a7bd5'
        ctx.fill()
    }
    ctx.restore()
}

function drawFire(ctx, t, phase, S, C, R) {
    for (let i = 0; i < 32; i++) {
        const angle = (i / 32) * Math.PI * 2
        const flicker = 1 + 0.3 * Math.sin(t * 8 + i * 0.9 + phase)
        const r1 = R * 0.88
        const r2 = R * flicker
        const x1 = C + Math.cos(angle) * r1
        const y1 = C + Math.sin(angle) * r1
        const x2 = C + Math.cos(angle) * r2
        const y2 = C + Math.sin(angle) * r2
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, `hsla(15, 100%, 60%, 0.9)`)
        grad.addColorStop(1, `hsla(40, 100%, 70%, 0)`)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2.5
        ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(C, C, R * 0.88, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(25, 100%, 65%, ${0.6 + 0.3 * Math.sin(t * 6 + phase)})`
    ctx.lineWidth = 2
    ctx.stroke()
}

function drawChill(ctx, t, phase, S, C, R) {
    for (let ring = 0; ring < 3; ring++) {
        const scale = 1 + ring * 0.12 + 0.04 * Math.sin(t * 1.5 + phase + ring)
        const alpha = (0.4 - ring * 0.12) * (0.7 + 0.3 * Math.sin(t * 1.5 + phase))
        ctx.beginPath()
        ctx.arc(C, C, R * scale * 0.9, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(100, 210, 255, ${alpha})`
        ctx.lineWidth = 1.5 - ring * 0.4
        ctx.stroke()
    }
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.4 + phase
        const dist = R * (0.92 + 0.04 * Math.sin(t * 2 + i))
        const x = C + Math.cos(angle) * dist
        const y = C + Math.sin(angle) * dist
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 230, 255, ${0.6 + 0.4 * Math.sin(t * 2 + i)})`
        ctx.fill()
    }
}

function drawLit(ctx, t, phase, S, C, R) {
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + phase
        const spark = Math.max(0, Math.sin(t * 10 + i * 1.7 + phase))
        if (spark < 0.3) continue
        const len = R * 0.25 * spark
        const x1 = C + Math.cos(angle) * R * 0.85
        const y1 = C + Math.sin(angle) * R * 0.85
        const x2 = C + Math.cos(angle) * (R * 0.85 + len)
        const y2 = C + Math.sin(angle) * (R * 0.85 + len)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 220, 50, ${spark})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x2, y2, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 240, 100, ${spark})`
        ctx.fill()
    }
    ctx.beginPath()
    ctx.arc(C, C, R * 0.88, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255, 200, 30, ${0.4 + 0.4 * Math.abs(Math.sin(t * 8 + phase))})`
    ctx.lineWidth = 2.5
    ctx.stroke()
}

function drawWavy(ctx, t, phase, S, C, R) {
    for (let ring = 0; ring < 4; ring++) {
        const progress = ((t * 0.8 + ring * 0.35 + phase) % 1.5) / 1.5
        const radius = R * 0.7 * (1 + progress * 0.5)
        const alpha = 0.7 * (1 - progress)
        ctx.beginPath()
        ctx.arc(C, C, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(80, 200, 240, ${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
    }
    ctx.beginPath()
    for (let a = 0; a < Math.PI * 2; a += 0.05) {
        const wave = Math.sin(a * 5 + t * 3 + phase) * 3
        const r = R * 0.88 + wave
        const x = C + Math.cos(a) * r
        const y = C + Math.sin(a) * r
        if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = `rgba(100, 220, 255, 0.8)`
    ctx.lineWidth = 1.5
    ctx.stroke()
}

function drawVibes(ctx, t, phase, S, C, R) {
    const hue = (t * 60 + phase * 50) % 360
    ctx.beginPath()
    ctx.arc(C, C, R * 0.9, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.9)`
    ctx.lineWidth = 3
    ctx.stroke()
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + t * 0.8 + phase
        const r = R * (0.82 + 0.06 * Math.sin(t * 3 + i + phase))
        const x = C + Math.cos(angle) * r
        const y = C + Math.sin(angle) * r
        const dotHue = (hue + i * 45) % 360
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${dotHue}, 90%, 75%, 0.9)`
        ctx.fill()
    }
}

function drawLove(ctx, t, phase, S, C, R) {
    const beat = 0.5 + 0.5 * Math.abs(Math.sin(t * 3 + phase))
    for (let i = 0; i < 3; i++) {
        const scale = (1 + i * 0.06) * (1 + beat * 0.04)
        ctx.beginPath()
        ctx.arc(C, C, R * 0.88 * scale, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 80, 120, ${(0.7 - i * 0.2) * beat})`
        ctx.lineWidth = 2
        ctx.stroke()
    }
    const heartSize = 9 + beat * 3
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + t * 0.5 + phase
        const x = C + Math.cos(angle) * R * 0.88
        const y = C + Math.sin(angle) * R * 0.88
        ctx.font = `${Math.round(heartSize)}px Arial, serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3 + i + phase)
        ctx.fillText('♥', x, y)
        ctx.globalAlpha = 1
    }
}

function drawGrind(ctx, t, phase, S, C, R) {
    const shake = Math.sin(t * 15 + phase) * 1.5
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const burst = Math.abs(Math.sin(t * 12 + i * 0.8 + phase))
        const x1 = C + shake + Math.cos(angle) * R * 0.82
        const y1 = C + Math.sin(angle) * R * 0.82
        const x2 = C + shake + Math.cos(angle) * R * (0.88 + 0.15 * burst)
        const y2 = C + Math.sin(angle) * R * (0.88 + 0.15 * burst)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 160, 30, ${0.5 + 0.5 * burst})`
        ctx.lineWidth = 2.5
        ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(C + shake, C, R * 0.88, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255, 120, 20, 0.8)`
    ctx.lineWidth = 2
    ctx.stroke()
}

function drawMoody(ctx, t, phase, S, C, R) {
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.15 + phase
        const twinkle = 0.5 + 0.5 * Math.sin(t * 4 + i * 2.1 + phase)
        const dist = R * (0.85 + 0.1 * Math.sin(t + i))
        const x = C + Math.cos(angle) * dist
        const y = C + Math.sin(angle) * dist
        ctx.beginPath()
        ctx.arc(x, y, 1.5 + twinkle * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 160, 255, ${twinkle * 0.8})`
        ctx.fill()
    }
    ctx.beginPath()
    ctx.arc(C, C, R * 0.9, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(120, 100, 200, ${0.5 + 0.3 * Math.sin(t * 0.8 + phase)})`
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 6])
    ctx.stroke()
    ctx.setLineDash([])
}

function drawGlowing(ctx, t, phase, S, C, R) {
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + t * 1.2 + phase
        const twinkle = Math.abs(Math.sin(t * 5 + i * 1.3 + phase))
        const x = C + Math.cos(angle) * R * 0.9
        const y = C + Math.sin(angle) * R * 0.9
        const s = 2 + twinkle * 3
        ctx.beginPath()
        ctx.moveTo(x - s, y); ctx.lineTo(x + s, y)
        ctx.moveTo(x, y - s); ctx.lineTo(x, y + s)
        ctx.strokeStyle = `rgba(255, 240, 100, ${twinkle * 0.9})`
        ctx.lineWidth = 1.5
        ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(C, C, R * 0.88, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255, 220, 80, ${0.4 + 0.4 * Math.sin(t * 2 + phase)})`
    ctx.lineWidth = 2.5
    ctx.stroke()
}

function drawRainy(ctx, t, phase, S, C, R) {
    ctx.beginPath()
    ctx.arc(C, C, R * 0.88, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(100, 140, 255, 0.7)`
    ctx.lineWidth = 1.5
    ctx.stroke()
    for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 + phase
        const speed = 0.8 + (i % 3) * 0.3
        const drop = ((t * speed + i * 0.43) % 1)
        const r = R * 0.75 + (R * 0.13) * drop
        const x = C + Math.cos(angle) * r
        const y = C + Math.sin(angle) * r
        const alpha = drop < 0.8 ? drop * 0.8 : (1 - drop) * 4
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 180, 255, ${Math.max(0, alpha)})`
        ctx.fill()
    }
}

const moodDrawers = {
    fire: drawFire, chill: drawChill, lit: drawLit,
    wavy: drawWavy, vibes: drawVibes, love: drawLove,
    grind: drawGrind, moody: drawMoody, glowing: drawGlowing,
    rainy: drawRainy
}

export const MoodBubble = ({ mood, user, onClick, size = 80 }) => {
    const canvasRef = useRef(null)
    const imgRef = useRef(null)
    const rafRef = useRef(null)
    const timeRef = useRef(Math.random() * 10)
    const phase = useRef(Math.random() * Math.PI * 2)

    useEffect(() => {
        if (user?.image?.[0]) {
            const img = new Image()
            img.src = user.image[0]
            imgRef.current = img
        }

        const S = size
        const C = S / 2
        const R = S / 2 - 4

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const drawFn = moodDrawers[mood] || drawVibes

        const loop = () => {
            timeRef.current += 0.016
            ctx.clearRect(0, 0, S, S)
            drawFn(ctx, timeRef.current, phase.current, S, C, R)
            drawAvatar(ctx, imgRef.current, S, C, R)
            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(rafRef.current)
    }, [mood, user, size])

    return (
        <div className="mood-bubble-wrapper" onClick={onClick}>
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="mood-canvas"
            />
            {/* <span className="mood-username">{user?.username}</span> */}
            {/* <span className="mood-label">{mood}</span> */}
        </div>
    )
}

export const MoodPicker = ({ selected, onSelect }) => {
    const moods = [
        { id: 'fire', label: '🔥 Fire' },
        { id: 'chill', label: '💙 Chill' },
        { id: 'lit', label: '💥 Lit' },
        { id: 'wavy', label: '🌊 Wavy' },
        { id: 'vibes', label: '💜 Vibes' },
        { id: 'love', label: '❤️ Love' },
        { id: 'grind', label: '😤 Grind' },
        { id: 'moody', label: '🌙 Moody' },
        { id: 'glowing', label: '✨ Glowing' },
        { id: 'rainy', label: '🌧️ Rainy' },
    ]

    return (
        <div className="mood-picker">
            <p className="mood-picker-title">What's your mood?</p>
            <div className="mood-picker-grid">
                {moods.map(m => (
                    <div
                        key={m.id}
                        className={`mood-option ${selected === m.id ? 'mood-selected' : ''}`}
                        onClick={() => onSelect(m.id)}
                    >
                        <span>{m.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const moods = [
    { id: 'fire' }, { id: 'chill' }, { id: 'lit' }, { id: 'wavy' },
    { id: 'vibes' }, { id: 'love' }, { id: 'grind' }, { id: 'moody' },
    { id: 'glowing' }, { id: 'rainy' }
]

export default MoodBubble