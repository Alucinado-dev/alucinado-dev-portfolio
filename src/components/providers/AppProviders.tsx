import { BackgroundWrapper } from '@/components/providers/BackgroundProvider'
import LanguageProvider from '@/components/providers/LanguageProvider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackgroundWrapper />
      <LanguageProvider>{children}</LanguageProvider>
    </>
  )
}
