import React, { useState } from 'react';
import { useTodo } from '../context/useTodo';

function TodoForm() {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        type='text'
        className='flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm'
        placeholder='新增任務...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
      >
        新增
      </button>
    </form>
  );
}

export default TodoForm;
