import type { CSSProperties } from 'react'

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

export interface ColumnConfig {
  /**
   * Label exibida no rodapé da coluna.
   * @example '01' | 'A' | 'HOME'
   */
  label?: string
  /** Cor da linha desta coluna. Sobrescreve `lineColor` global. */
  lineColor?: string
  /** Opacidade da linha desta coluna. Sobrescreve `lineOpacity` global. */
  lineOpacity?: number
  /** Estilo da linha: sólida ou tracejada. */
  lineDash?: boolean
  /** Largura da linha em px. @default 1 */
  lineWidth?: number
  /** Se `true`, esta coluna recebe destaque visual (cor + dash). */
  highlight?: boolean
  /** Cor do label. @default igual a lineColor */
  labelColor?: string
  /** Posição do label: topo ou rodapé. @default 'bottom' */
  labelPosition?: 'top' | 'bottom'
}

export interface ColumnGridProps {
  /**
   * Número de colunas no mobile.
   * @default 2
   */
  columns?: number

  /**
   * Número de colunas em telas médias (md).
   * Se omitido, usa `columns`.
   */
  columnsMd?: number

  /**
   * Número de colunas em telas grandes (lg).
   * Se omitido, usa `columnsMd`.
   */
  columnsLg?: number

  /**
   * Configuração individual por coluna.
   * O índice do array corresponde à coluna (0 = primeira).
   * Colunas sem config usam os valores globais.
   */
  columnConfigs?: ColumnConfig[]

  /**
   * Cor padrão das linhas de todas as colunas.
   * @default 'rgba(255,255,255,0.05)'
   */
  lineColor?: string

  /**
   * Opacidade global das linhas (0–1).
   * @default 1
   */
  lineOpacity?: number

  /**
   * Cor de destaque — usada nas colunas com `highlight: true`.
   * @default 'rgba(249,115,22,0.4)'
   */
  highlightColor?: string

  /**
   * Se `true`, destaca automaticamente a coluna central.
   * Pode ser combinado com `columnConfigs` para personalização adicional.
   * @default false
   */
  highlightCenter?: boolean

  /**
   * Exibe labels nas colunas.
   * @default false
   */
  showLabels?: boolean

  /**
   * Gera labels automáticas quando `showLabels=true` e a coluna não tem label definida.
   * - `'number'` → '01', '02', '03'...
   * - `'letter'` → 'A', 'B', 'C'...
   * - `'none'`   → não gera label automática
   * @default 'number'
   */
  autoLabel?: 'number' | 'letter' | 'none'

  /**
   * Posição padrão dos labels.
   * @default 'bottom'
   */
  labelPosition?: 'top' | 'bottom'

  /**
   * Cor padrão dos labels.
   * @default igual a lineColor
   */
  labelColor?: string

  /**
   * Opacidade global do componente inteiro.
   * @default 0.6
   */
  opacity?: number

  /**
   * Se `true`, cobre a viewport inteira (position fixed).
   * Se `false`, cobre o pai (position absolute).
   * @default false
   */
  fixed?: boolean

  /** @default 0 */
  zIndex?: number

  className?: string
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const autoLabelValue = (index: number, type: 'number' | 'letter' | 'none'): string => {
  if (type === 'none') return ''
  if (type === 'letter') return String.fromCharCode(65 + index) // A, B, C...
  return String(index + 1).padStart(2, '0') // 01, 02, 03...
}

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────

/**
 * `ColumnGrid`
 *
 * Grid de linhas verticais decorativas — efeito estrutural de layout tech/editorial.
 * Responsivo, totalmente configurável por coluna.
 *
 * Projetado para conviver com `BeamRain` (que anima os beams dentro das colunas),
 * `StarField`, `MeteorShower` e qualquer outra camada de background.
 *
 * @example
 * // Simples — 5 colunas com destaque central automático
 * <ColumnGrid columns={5} highlightCenter highlightColor="rgba(249,115,22,0.5)" />
 *
 * @example
 * // Com labels numéricas
 * <ColumnGrid columns={5} showLabels autoLabel="number" />
 *
 * @example
 * // Responsivo
 * <ColumnGrid columns={2} columnsMd={4} columnsLg={6} />
 *
 * @example
 * // Configuração por coluna
 * <ColumnGrid
 *   columns={5}
 *   columnConfigs={[
 *     { label: 'HOME' },
 *     { highlight: true, lineDash: true },
 *     { label: 'CENTER', highlight: true, labelColor: '#f97316' },
 *     { highlight: true, lineDash: true },
 *     { label: 'END' },
 *   ]}
 * />
 *
 * @example
 * // Stack com BeamRain
 * <div style={{ position: 'relative', height: '100vh' }}>
 *   <ColumnGrid zIndex={0} columns={5} highlightCenter />
 *   <BeamRain zIndex={1} mode="fade" beams={[
 *     { x: 20, color: '#f97316' },
 *     { x: 50, color: '#f97316', decoration: 'dot' },
 *     { x: 80, color: '#f97316' },
 *   ]} />
 * </div>
 */
export const ColumnGrid = ({
  columns = 2,
  columnsMd,
  columnsLg,
  columnConfigs = [],
  lineColor = 'rgba(255,255,255,0.05)',
  lineOpacity = 1,
  highlightColor = 'rgba(249,115,22,0.4)',
  highlightCenter = false,
  showLabels = false,
  autoLabel = 'number',
  labelPosition = 'bottom',
  labelColor,
  opacity = 0.6,
  fixed = false,
  zIndex = 0,
  className,
}: ColumnGridProps) => {
  // Resolve quantas colunas usar em cada breakpoint
  // Como é CSS puro, usamos variáveis CSS e media queries inline via style tag
  const md = columnsMd ?? columns
  const lg = columnsLg ?? md

  const containerStyle: CSSProperties = {
    position: fixed ? 'fixed' : 'absolute',
    inset: 0,
    zIndex,
    pointerEvents: 'none',
    opacity,
    display: 'flex',
    width: '100%',
    height: '100%',
  }

  // Gera array de N colunas com a config resolvida
  const resolveColumns = (count: number) =>
    Array.from({ length: count }, (_, i) => {
      const cfg = columnConfigs[i] ?? {}
      const isCenter = highlightCenter && i === Math.floor(count / 2)
      const isHighlight = cfg.highlight || isCenter

      const color = cfg.lineColor ?? (isHighlight ? highlightColor : lineColor)
      const opacity_ = cfg.lineOpacity ?? lineOpacity
      const dashed = cfg.lineDash ?? isHighlight
      const width = cfg.lineWidth ?? 1
      const lColor = cfg.labelColor ?? labelColor ?? color
      const lPos = cfg.labelPosition ?? labelPosition
      const rawLabel = cfg.label ?? (showLabels ? autoLabelValue(i, autoLabel) : '')

      return { color, opacity: opacity_, dashed, width, lColor, lPos, label: rawLabel, isHighlight, index: i }
    })

  // Renderiza para um tamanho fixo de colunas (usado dentro de media query)
  const renderColumns = (count: number, extraStyle?: CSSProperties) => (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        ...extraStyle,
      }}
    >
      {resolveColumns(count).map((col, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderLeft: `${col.width}px solid ${col.color}`,
            opacity: col.opacity,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            ...(i === count - 1 ? { borderRight: `${col.width}px solid ${col.color}` } : {}),
          }}
        >
          {/* Linha central tracejada para colunas com destaque */}
          {col.dashed && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: col.width,
                borderLeft: `${col.width}px dashed ${col.color}`,
                opacity: 0.5,
              }}
            />
          )}

          {/* Label */}
          {col.label && (
            <span
              style={{
                position: 'absolute',
                ...(col.lPos === 'top' ? { top: 16 } : { bottom: 16 }),
                left: '50%',
                transform: 'translateX(-50%)',
                color: col.lColor,
                fontSize: 10,
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                opacity: 0.6,
              }}
            >
              {col.label}
            </span>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Media queries para responsividade */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .cg-mobile { display: flex !important; }
          .cg-md     { display: none  !important; }
          .cg-lg     { display: none  !important; }
          @media (min-width: 768px) {
            .cg-mobile { display: none  !important; }
            .cg-md     { display: flex  !important; }
          }
          @media (min-width: 1024px) {
            .cg-md { display: none  !important; }
            .cg-lg { display: flex  !important; }
          }
        `,
        }}
      />

      <div aria-hidden='true' className={className} style={containerStyle}>
        {/* Mobile */}
        <div className='cg-mobile' style={{ width: '100%', height: '100%' }}>
          {renderColumns(columns)}
        </div>

        {/* md — só monta se diferente de mobile */}
        {md !== columns ? (
          <div className='cg-md' style={{ width: '100%', height: '100%' }}>
            {renderColumns(md)}
          </div>
        ) : (
          // Mesmo count que mobile — reutiliza o mesmo bloco com classe md
          <div className='cg-md' style={{ width: '100%', height: '100%' }}>
            {renderColumns(md)}
          </div>
        )}

        {/* lg — só monta se diferente de md */}
        {lg !== md ? (
          <div className='cg-lg' style={{ width: '100%', height: '100%' }}>
            {renderColumns(lg)}
          </div>
        ) : (
          <div className='cg-lg' style={{ width: '100%', height: '100%' }}>
            {renderColumns(lg)}
          </div>
        )}
      </div>
    </>
  )
}

export default ColumnGrid
