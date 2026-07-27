import { ImageResponse } from 'next/og'

export const alt = 'Lucino Campos — Desenvolvedor Frontend'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: '#010205',
        color: '#f8fafc',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          background:
            'radial-gradient(circle at 78% 20%, rgba(0,251,234,0.18), transparent 34%), radial-gradient(circle at 18% 86%, rgba(139,92,246,0.2), transparent 38%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 36,
          display: 'flex',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px 92px',
          maxWidth: 980,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#14b8a6',
            fontSize: 24,
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          alucinado.dev
        </div>
        <div style={{ display: 'flex', marginTop: 30, fontSize: 76, fontWeight: 800, letterSpacing: -4 }}>
          Lucino Campos
        </div>
        <div style={{ display: 'flex', marginTop: 18, color: '#cbd5e1', fontSize: 34 }}>Desenvolvedor Frontend</div>
        <div
          style={{
            display: 'flex',
            width: 180,
            height: 4,
            marginTop: 42,
            background: 'linear-gradient(90deg, #00fbea, #8b5cf6, #ff00bb)',
          }}
        />
      </div>
    </div>,
    size,
  )
}
