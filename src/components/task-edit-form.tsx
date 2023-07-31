"use client"

import React, { useEffect } from "react"
import { deleteTaskAction, updateTaskAction } from "@/app/actions"
import { useRouter } from "next/navigation"

type Message = {
  status: "error" | "success"
  text: string
}

const TaskEditForm: React.FC<{
  taskId: number
  taskName: string
}> = ({ taskId, taskName }) => {
  // Define state variables for each input field
  const [name, setName] = React.useState(taskName)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [revalidatePath, setRevalidatePath] = React.useState(0)
  const [deleteTask, setDeleteTask] = React.useState(0)
  const [prefetch, setPrefetch] = React.useState(0)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error messages
    setMessages([])

    // Check for empty fields and set corresponding error message
    if (!name.trim()) {
      setMessages([{ status: "error", text: "Name cannot be empty" }])
      return
    }

    try {
      const updatedTask = await updateTaskAction({
        id: taskId,
        name,
        revalidate: Boolean(revalidatePath),
      })

      if (!updatedTask) {
        setMessages([{ status: "error", text: "Task update failed!" }])
        return
      }

      if (prefetch) {
        router.prefetch("/tasks")
      }

      router.push("/tasks")
    } catch (error: any) {
      console.error(error.message)
      setMessages([{ status: "error", text: "Task update failed!" }])
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error messages
    setMessages([])

    try {
      const deletedTask = await deleteTaskAction({ id: taskId, revalidate: Boolean(revalidatePath) })

      if (!deletedTask) {
        setMessages([{ status: "error", text: "Task deletion failed!" }])
        return
      }

      if (prefetch) {
        router.prefetch("/tasks")
      }

      router.push("/tasks")
    } catch (error: any) {
      console.error(error.message)

      setMessages([{ status: "error", text: "Task deletion failed!" }])
    }
  }

  useEffect(() => {
    setName(taskName)
  }, [taskName])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col p-4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Update Task</h2>
        </div>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded text-white ${message.status === "error" ? "bg-red-500" : "bg-green-500"}`}
            >
              {message.text}
            </div>
          ))}
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean(deleteTask)}
              onChange={(e) => setDeleteTask(Number(e.target.checked))}
            />
            <span>Delete Task</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean(revalidatePath)}
              onChange={(e) => setRevalidatePath(Number(e.target.checked))}
            />
            <span>revalidatePath</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean(prefetch)}
              onChange={(e) => setPrefetch(Number(e.target.checked))}
            />
            <span>{"router.prefetch('/tasks') before router.push('/tasks') on submit"}</span>
          </label>
        </div>
        <button
          onClick={deleteTask ? handleDelete : handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export { TaskEditForm }
