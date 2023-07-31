import { TaskItem } from "@/components/task-item"
import { Task } from "@prisma/client"

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export { TaskList }
