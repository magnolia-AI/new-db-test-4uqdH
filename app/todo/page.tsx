import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function TodoPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  async function createTodo(formData: FormData) {
    'use server';
    const text = formData.get('text') as string;
    const todos = await prisma.todo.findMany({});
    await prisma.todo.create({
      data: {
        text,
        order: todos.length,
      },
    });
    revalidatePath('/todo');
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <h1 className="text-4xl font-bold mb-8">Modern Todo App</h1>
      <form action={createTodo} className="flex gap-4 mb-8">
        <input
          type="text"
          name="text"
          className="flex-grow p-2 border rounded"
          placeholder="Add a new task..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-4 p-2 border-b">
            <span className="flex-grow">{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

