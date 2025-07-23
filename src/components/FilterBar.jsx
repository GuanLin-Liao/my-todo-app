import React from 'react';
import { useTodo } from '../context/useTodo';

function FilterBar() {
  const { filter, setFilter } = useTodo();

  const filterTypes = [
    { type: 'all', label: '全部' },
    { type: 'active', label: '未完成' },
    { type: 'completed', label: '已完成' },
  ];
  return (
    <div className='flex justify-center gap-4 mt-4'>
      {filterTypes.map(({ type, label }) => (
        <button
          key={type}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter(type)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
