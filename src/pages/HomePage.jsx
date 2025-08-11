import React, { useState } from 'react';
import TodoPage from './TodoPage';
import UnsplashPage from './UnsplashPage';
export default function HomePage() {
  const [activePage, setActivePage] = useState('unsplash');

  return (
    <div>
      <div className='flex mb-2 border-b border-gray-300'>
        <button className='mr-2' onClick={() => setActivePage('todos')}>
          Todo-list
        </button>
        <button
          onClick={() => {
            setActivePage('unsplash');
          }}
        >
          Unsplash
        </button>
      </div>
      {activePage === 'todos' && <TodoPage />}
      {activePage === 'unsplash' && <UnsplashPage />}
    </div>
  );
}
