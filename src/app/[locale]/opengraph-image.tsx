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
          alignItems: 'center',
          padding: '84px 92px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', width: 176, height: 176, marginRight: 56 }}>
          <svg viewBox='0 0 64 64' width='176' height='176'>
            <path d='M5 58 24.5 6H36L16.5 58H5Z' fill='#00fbea' />
            <path d='M38 6 59 58H46L32.5 23.5 38 6Z' fill='#00fbea' />
            <path d='M21 39H41.5L46 50H17L21 39Z' fill='#00fbea' />
            <path d='m32 31 5.5 8H27l5-8Z' fill='#010205' />
            <path d='M49 11h9v3h-9z' fill='#00fbea' opacity='.42' />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          <div
            style={{
              display: 'flex',
              color: '#14b8a6',
              fontSize: 22,
              letterSpacing: 8,
              textTransform: 'uppercase',
            }}
          >
            identidade // sinal ativo
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 70, fontWeight: 800, letterSpacing: 6 }}>
            ALUCINADO
          </div>
          <div style={{ display: 'flex', marginTop: 16, color: '#cbd5e1', fontSize: 31 }}>por Lucino Campos</div>
          <div
            style={{
              display: 'flex',
              width: 180,
              height: 4,
              marginTop: 38,
              background: 'linear-gradient(90deg, #00fbea, #8b5cf6)',
            }}
          />
        </div>
      </div>
    </div>,
    size,
  )
}
