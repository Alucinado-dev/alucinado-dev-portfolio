import { ImageResponse } from 'next/og'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/* eslint-disable @next/next/no-img-element -- ImageResponse/Satori embeds the local data URL through a native img. */

export const alt = 'Alucinado.dev — Desenvolvedor Frontend'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const emblem = await readFile(join(process.cwd(), 'public', 'brand', 'alucinado-logo.png'), 'base64')
  const emblemSrc = `data:image/png;base64,${emblem}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
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
            'radial-gradient(circle at 22% 50%, rgba(255,0,187,0.15), transparent 35%), radial-gradient(circle at 78% 50%, rgba(0,251,234,0.14), transparent 38%)',
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
          width: '100%',
          padding: '66px 78px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 430,
            height: 430,
            marginRight: 64,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#010205',
          }}
        >
          <img src={emblemSrc} width='430' height='430' alt='' />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 540 }}>
          <div style={{ display: 'flex', color: '#94a3b8', fontSize: 19, letterSpacing: 7 }}>
            IDENTIDADE // SINAL ATIVO
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 58, fontWeight: 800, letterSpacing: 2 }}>
            ALUCINADO.DEV
          </div>
          <div style={{ display: 'flex', marginTop: 18, color: '#cbd5e1', fontSize: 29 }}>DESENVOLVEDOR FRONTEND</div>
          <div
            style={{
              display: 'flex',
              width: 230,
              height: 4,
              marginTop: 38,
              background: 'linear-gradient(90deg, #ff00bb, #7c3aed, #00fbea)',
            }}
          />
        </div>
      </div>
    </div>,
    size,
  )
}
