import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useAuth } from './useAuth';
const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { user } = useAuth();
  const isInitialMount = useRef(true);
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState('all');

  // 新增搜尋文字狀態
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosArray = querySnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));
        setTodos(todosArray);
      });
      return () => unsubscribe();
    } else {
      loadTodosFromLocal();
    }
  }, [user]);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //     return;
  //   }
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  // 未登入情況下，從 localStorage 讀取
  const loadTodosFromLocal = () => {
    const stored = localStorage.getItem('todos');
    setTodos(stored ? JSON.parse(stored) : []);
  };

  // 已登入情況下，從 Firestore 讀取

  // const loadTodosFromFirestore = async (uid) => {
  //   const q = query(collection(db, 'todos'), where('uid', '==', uid));
  //   const querySnapshot = await getDocs(q);
  //   console.log('querySnapshot', querySnapshot);
  //   const todosArray = querySnapshot.docs.map((docItem) => ({
  //     id: docItem.id,
  //     ...docItem.data(),
  //   }));
  //   setTodos(todosArray);
  // };

  const addTodo = async (title) => {
    if (user) {
      await addDoc(collection(db, 'todos'), {
        title,
        completed: false,
        uid: user.uid,
      });
    } else {
      const newTodos = [...todos, { id: uuidv4(), title, completed: false }];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  const toggleTodo = async (id) => {
    if (user) {
      const todoRef = doc(db, 'todos', id);
      const target = todos.find((t) => t.id === id);
      await updateDoc(todoRef, { completed: !target.completed });
      loadTodosFromFirestore(user.uid);
    } else {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  const removeTodo = async (id) => {
    if (user) {
      await deleteDoc(doc(db, 'todos', id));
      loadTodosFromFirestore(user.uid);
    } else {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  const updateTodo = async (id, newTitle) => {
    if (user) {
      await updateDoc(doc(db, 'todos', id), { title: newTitle });
      loadTodosFromFirestore(user.uid);
    } else {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
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
