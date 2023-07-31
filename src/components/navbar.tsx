import Link from "next/link"

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 mr-6">
          <span className="font-semibold text-xl tracking-tight">Task Demo</span>
        </div>
      </Link>
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
        <div className="text-sm md:flex-grow">
          <Link href="/" className="block mt-4 md:inline-block md:mt-0 hover:text-white hover:underline mr-4">
            Home
          </Link>
          <Link href="/tasks" className="block mt-4 md:inline-block md:mt-0 hover:text-white hover:underline mr-4">
            Tasks
          </Link>
        </div>
        <Link
          href="/new"
          className="block mt-4 text-sm rounded bg-blue-500 p-2 hover:bg-blue-700 md:inline-block md:mt-0"
        >
          + New Task
        </Link>
      </div>
    </nav>
  )
}

export { NavBar }
