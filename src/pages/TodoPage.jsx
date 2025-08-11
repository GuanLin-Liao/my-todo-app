import React from 'react';
import TodoForm from '../components/TodoForm';
import FilterBar from '../components/FilterBar';
import TodoItem from '../components/TodoItem';
import SearchInput from '../components/SearchInput';
import { useTodo } from '../context/useTodo';

const TodoPage = () => {
  const { setSearchText, filteredTodos } = useTodo();

  return (
    <div>
      <h1 className='text-2xl md:text-3xl font-bold text-center my-4'>
        📝 我的代辦清單
      </h1>
      <SearchInput onSearch={setSearchText} placeholder='搜尋任務...' />
      <TodoForm />
      <FilterBar />
      <div className='mt-4 space-y-2'>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
