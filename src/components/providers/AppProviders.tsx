import { BackgroundWrapper } from '@/components/providers/BackgroundProvider'
import LanguageProvider from '@/components/providers/LanguageProvider'
import ToastProvider from '@/components/providers/ToastProvider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      <BackgroundWrapper />
      {children}
      <ToastProvider />
    </LanguageProvider>
  )
}
