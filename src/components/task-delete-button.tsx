"use client"

import React from "react"
import { deleteTaskAction } from "@/app/actions"
import { useRouter } from "next/navigation"

const TaskDeleteButton: React.FC<{
  taskId: number
}> = ({ taskId }) => {
  const router = useRouter()

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await deleteTaskAction({ id: taskId })

      router.refresh()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-sm py-2 px-4 rounded">
      Delete
    </button>
  )
}

export { TaskDeleteButton }
