import { Task } from "@prisma/client"
import Link from "next/link"
import { TaskDeleteButton } from "./task-delete-button"

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="border p-4 m-2 flex justify-between">
      <div>
        <Link href={`/tasks/${task.id}`}>
          <h2 className="font-bold text-xl">{task.name}</h2>
        </Link>
        <p>Status: {task.status}</p>
        <p>Created at: {task.createdAt}</p>
        <p>Updated at: {task.updatedAt}</p>
      </div>
      <div className="space-x-2">
        <Link href={`/tasks/${task.id}`} className="bg-blue-500 hover:bg-blue-700 text-sm py-2 px-4 rounded">
          Edit
        </Link>
        <TaskDeleteButton taskId={task.id} />
      </div>
    </div>
  )
}

export { TaskItem }
