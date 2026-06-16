'use client'

import { NavItem } from '@/components/ui/NavItem'

export const Navbar = () => {
  // Passamos as rotas cruas ("limpas"), o NavItem cuida da localização
  const navigationLinks = [
    { href: '/', index: '0x00', label: 'Dashboard' },
    { href: '/about', index: '0x01', label: 'Sobre o Operador' },
    { href: '/projects', index: '0x02', label: 'Repositórios' },
  ]

  return (
    <nav className='relative flex h-14 items-center border-l border-white/5'>
      {navigationLinks.map(link => (
        <NavItem key={link.href} href={link.href} index={link.index}>
          {link.label}
        </NavItem>
      ))}
    </nav>
  )
}
