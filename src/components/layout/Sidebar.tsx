export default function Sidebar() {
  return (
    <aside className='w-64 bg-gray-200 p-4'>
      <ul className='space-y-2'>
        <li>
          <a href='#' className='hover:underline'>
            Link 1
          </a>
        </li>
        <li>
          <a href='#' className='hover:underline'>
            Link 2
          </a>
        </li>
        <li>
          <a href='#' className='hover:underline'>
            Link 3
          </a>
        </li>
      </ul>
    </aside>
  )
}
