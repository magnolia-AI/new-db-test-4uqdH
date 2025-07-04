'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function createTodo(formData: FormData) {
  const text = formData.get('text') as string;

  const maxOrder = await prisma.todo.aggregate({
    _max: {
      order: true,
    },
  });

  await prisma.todo.create({
    data: {
      text,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });

  revalidatePath('/todo');
}

export async function updateTodo(id: string, text: string) {
  await prisma.todo.update({
    where: { id },
    data: { text },
  });
  revalidatePath('/todo');

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath('/todo');
}

export async function reorderTodos(todos: { id: string; order: number }[]) {
  const updates = todos.map((todo) =>
    prisma.todo.update({
      where: { id: todo.id },
      data: { order: todo.order },
    })
  );
  await prisma.$transaction(updates);
  revalidatePath('/todo');
}


}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath('/todo');
}

