import React, { useState } from 'react';
import { useTodo } from '../context/useTodo';

function TodoItem({ todo }) {
  const { toggleTodo, removeTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isRemoving, setIsRemoving] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };
  return (
    <div
      className={`bg-white border px-4 py-2 rounded-lg shadow flex justify-between items-center transition-all duration-399 transform ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <input
            className='border border-gray-300 rounded px-2 py-1'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onkeydown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          ></input>
        ) : (
          <span
            className={`${
              todo.completed ? 'line-through text-gray-400' : ''
            } truncate max-w-[200px] block`}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className='flex gap-2'>
        {isEditing ? (
          <>
            <button
              className='text-green-600 hover:text-green-800'
              onClick={handleSave}
            >
              儲存
            </button>
            <button
              className='text-gray-500 hover:text-gray-700'
              onClick={handleCancel}
            >
              取消
            </button>
          </>
        ) : (
          <>
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={handleEdit}
            >
              編輯
            </button>
            <button
              className='text-red-500 hover:text-red-700'
              onClick={() => {
                setIsRemoving(true);
                setTimeout(() => removeTodo(todo.id), 300);
              }}
            >
              刪除
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
