import React from 'react';

export default function Loading({ isLoading }) {
  return (
    <div
      className='loading'
      style={{
        display: isLoading ? 'flex' : 'none',
      }}
    >
      <div className='w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
    </div>
  );
}
