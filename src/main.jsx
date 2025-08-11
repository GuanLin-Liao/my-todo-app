import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './pages/LoginPage';
import './index.css';
import { TodoProvider } from './context/TodoContext';
import { AuthProvider } from './context/AuthContext';
import { UnsplashProvider } from './context/UnsplashContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UnsplashPage from './pages/UnsplashPage';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UnsplashProvider>
        <TodoProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/Unsplash' element={<UnsplashPage />}></Route>
            </Routes>
          </BrowserRouter>
        </TodoProvider>
      </UnsplashProvider>
    </AuthProvider>
  </React.StrictMode>
);
