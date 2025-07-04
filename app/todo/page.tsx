import { createTodo } from './actions';
import { TodoList } from './TodoList';
import prisma from '@/lib/prisma';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function TodoPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-6">My Todos</h1>
      <form action={createTodo} className="flex gap-2 mb-6">
        <Input name="text" placeholder="Add a new task..." />
        <Button type="submit">Add</Button>
      </form>
      <TodoList initialTodos={todos} />
    </div>
  );
}

