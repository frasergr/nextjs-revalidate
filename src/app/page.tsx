import Link from "next/link"

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <Link
        href="/tasks"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block"
      >
        View Tasks
      </Link>
      <Link
        href="/new"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2 inline-block"
      >
        Create a New Task
      </Link>
    </div>
  )
}
