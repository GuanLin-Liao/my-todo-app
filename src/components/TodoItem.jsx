import React from 'react';
import { useTodo } from '../context/useTodo';

function TodoItem({ todo }) {
  const { toggleTodo, removeTodo } = useTodo();

  return (
    <div className='bg-white border px-4 py-2 rounded-lg shadow flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          className={`${todo.completed ? 'line-through text-gray-400' : ''}`}
        >
          {todo.title}
        </span>
      </div>
      <button
        className='text-red-500 hover:text-red-700'
        onClick={() => removeTodo(todo.id)}
      >
        刪除
      </button>
    </div>
  );
}

export default TodoItem;
