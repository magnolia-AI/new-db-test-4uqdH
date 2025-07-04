'use client';

import { useState } from 'react';
import { deleteTodo, updateTodo, toggleTodo } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoItem({ id, text, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleUpdate = async () => {
    await updateTodo(id, newText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-lg">
      {isEditing ? (
        <div className="flex flex-grow items-center gap-2">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setIsEditing(false)} variant="ghost">
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={completed}
              onCheckedChange={(checked) => toggleTodo(id, !!checked)}
            />
            <span className={completed ? 'line-through text-gray-500' : ''}>
              {text}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit
            </Button>
            <Button onClick={() => deleteTodo(id)} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

