import React from 'react';
import { useTodo } from '../context/useTodo';

function SearchBar() {
  const { searchText, setSearchText } = useTodo();

  return (
    <input
      type='text'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder='搜尋任務...'
      className='w-full px-3 py-2 rounded-lg border border-gray-300 mb-4 shadow-sm'
    ></input>
  );
}
export default SearchBar;
