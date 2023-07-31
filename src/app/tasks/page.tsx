import { TaskList } from "@/components/task-list"
import { getTasks } from "@/lib/tasks"

export default async function Tasks() {
  const tasks = await getTasks()

  if (!tasks || !tasks.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col p-4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl">No Tasks Found</h2>
          </div>
        </div>
      </div>
    )
  }

  return <TaskList tasks={tasks} />
}
