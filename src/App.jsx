import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoItem from './components/TodoItem';
import SearchBar from './components/SearchInput';
import { useTodo } from './context/useTodo';
import { Outlet } from 'react-router-dom';

function App() {
  // const { filteredTodos } = useTodo();

  return (
    <div className='min-h-screen bg-gray-100 text-gray-800 p-4 md:p-8'>
      <div className='max-w-xl mx-auto'>
        <Header />
        <main className='mt-8'>
          <Outlet />
        </main>
        {/* <SearchBar></SearchBar>
        <TodoForm></TodoForm>
        <FilterBar></FilterBar>
        <div className='mt-4 space-y-2'>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div> */}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}

export default App;
