import Sidebar from '@/components/layout/Sidebar'

export default function HomePage() {
  return (
    <div className='flex'>
      <Sidebar />

      <div className='flex flex-1 flex-col p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Welcome to My Application</h1>
        <p>This is the home page of my Next.js application with internationalization support.</p>
      </div>
    </div>
  )
}
