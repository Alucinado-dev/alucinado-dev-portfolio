import Image from 'next/image'
import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-900 text-white'>
      <Header />

      <div className='flex h-full items-center justify-center gap-8'>
        <h1 className='text-6xl font-bold text-slate-400'>Página Não Encontrada</h1>
        <Image src='/src/assets/svg/Error 404 on Laptop.svg' alt='404' width={200} height={200} />
        <p className='text-2xl'>A página que você está procurando não foi encontrada ou não existe. </p>

        <Link
          href='/'
          className='mt-4 rounded border border-[#7c3aed] bg-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-transparent hover:text-[#7c3aed]'
        >
          Voltar para a página inicial
        </Link>
      </div>

      <Footer />
    </div>
  )
}
