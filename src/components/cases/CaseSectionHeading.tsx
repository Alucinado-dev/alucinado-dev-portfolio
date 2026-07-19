type CaseSectionHeadingProps = {
  id?: string
  eyebrow: string
  title: string
}

export function CaseSectionHeading({ id, eyebrow, title }: CaseSectionHeadingProps) {
  return (
    <div className='mb-6 space-y-2'>
      <p className='font-syne-mono text-tech-teal flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase'>
        <span className='bg-tech-teal h-px w-5' aria-hidden='true' />
        {eyebrow}
      </p>
      <h2
        id={id}
        className='font-space-grotesk max-w-2xl scroll-mt-24 text-2xl leading-tight font-semibold tracking-tight text-slate-50 md:text-3xl'
      >
        {title}
      </h2>
    </div>
  )
}
