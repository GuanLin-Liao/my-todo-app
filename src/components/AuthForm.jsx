// src/components/AuthForm.jsx
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // 登入 or 註冊模式
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-xl font-bold text-center mb-4'>
        {isLogin ? '登入' : '註冊'}
      </h2>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          className='border rounded px-3 py-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type='password'
          className='border rounded px-3 py-2'
          placeholder='密碼'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'
        >
          {isLogin ? '登入' : '註冊'}
        </button>

        <p className='text-center text-sm'>
          {isLogin ? '沒有帳號？' : '已有帳號？'}{' '}
          <button
            type='button'
            className='text-blue-500 hover:underline'
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '註冊' : '登入'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
