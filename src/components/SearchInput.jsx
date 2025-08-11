import React, { useState } from 'react';
import { useTodo } from '../context/useTodo';

function SearchInput({ onSearch, placeholder = '搜尋...', type }) {
  // const { searchText, setSearchText } = useTodo();
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };
  const handleKeyDown = (e) => {
    if (type === 'unsplash' && e.key === 'Enter') {
      const value = e.target.value;
      setInput(value);
      onSearch(value);
    }
  };

  return (
    <>
      {type === 'unsplash' ? (
        <input
          type='text'
          defaultValue={input}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='w-full px-3 py-2 rounded-lg border border-gray-300 mb-4 shadow-sm'
        ></input>
      ) : (
        <input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
          className='w-full px-3 py-2 rounded-lg border border-gray-300 mb-4 shadow-sm'
        ></input>
      )}
    </>
  );
}
export default SearchInput;
