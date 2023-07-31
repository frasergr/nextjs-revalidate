import { prisma } from "@/lib/db"
import { Task } from "@prisma/client"

export async function getTasks(): Promise<Task[] | []> {
  return await prisma.task.findMany()
}

export async function createTask({ name }: { name: string }) {
  return await prisma.task.create({
    data: {
      name,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
}

export async function getTaskById(id: number): Promise<Task | null> {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  })
}

export async function updateTaskById({ id, name }: { id: number; name: string }): Promise<Task | null> {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      name,
      updatedAt: new Date().toISOString(),
    },
  })
}

export async function deleteTaskById(id: number): Promise<Task | null> {
  return await prisma.task.delete({
    where: {
      id,
    },
  })
}
