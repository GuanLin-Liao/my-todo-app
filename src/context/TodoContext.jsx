import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const isInitialMount = useRef(true);
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState('all');

  // 新增搜尋文字狀態
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos([...todos, { id: uuidv4(), title, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newTitle) => {
    console.log(newTitle);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  // const filteredTodos =
  //   filter === 'all'
  //     ? todos
  //     : todos.filter((t) => (filter === 'active' ? !t.completed : t.completed));

  const filteredTodos = todos
    .filter((todo) =>
      filter === 'all'
        ? true
        : filter === 'active'
        ? !todo.completed
        : todo.completed
    )
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        filter,
        setFilter,
        filteredTodos,
        searchText,
        setSearchText,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
