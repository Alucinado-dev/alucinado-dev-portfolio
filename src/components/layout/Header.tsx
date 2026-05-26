import Navbar from '@/components/layout/Navbar'
import Logo from '@/components/ui/Logo'

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-gray-800/25 p-4 text-white blur-xs'>
      <Logo />
      <Navbar />
    </header>
  )
}
