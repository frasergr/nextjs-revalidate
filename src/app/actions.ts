"use server"

import { createTask, deleteTaskById, updateTaskById } from "@/lib/tasks"
import { revalidatePath } from "next/cache"

export async function createTaskAction({ name, revalidate }: { name: string; revalidate?: boolean }) {
  try {
    const createdTask = await createTask({
      name,
    })

    return createdTask
  } catch (e) {
    console.error(e)
  } finally {
    if (revalidate) {
      revalidatePath("/tasks")
    }
  }
}

export async function updateTaskAction({ id, name, revalidate }: { id: number; name: string; revalidate?: boolean }) {
  try {
    const updatedTask = await updateTaskById({
      id,
      name,
    })

    return updatedTask
  } catch (e) {
    console.error(e)
  } finally {
    if (revalidate) {
      revalidatePath("/tasks")
    }
  }
}

export async function deleteTaskAction({ id, revalidate }: { id: number; revalidate?: boolean }) {
  try {
    const deletedTask = await deleteTaskById(id)

    return deletedTask
  } catch (e) {
    console.error(e)
  } finally {
    if (revalidate) {
      revalidatePath("/tasks")
    }
  }
}
