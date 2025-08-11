import React from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log('user', user);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    await logout();
  };
  return (
    <div className='flex justify-between items-center mb-4'>
      {/* <h1 className='text-2xl md:text-2xl font-bold text-center'>
        📝 代辦清單 和UnsPlash圖片搜尋
      </h1> */}

      <div className='mx-auto'>
        {user ? (
          <div className='flex items-center gap-3'>
            <img
              src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
              className='w-7 h-7 rounded-full'
              alt=''
            />
            <span className='text-sm text-gray-600'>{user.email}</span>
            <button
              onClick={handleLogoutClick}
              className='bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600'
            >
              登出
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className='bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600'
          >
            登入
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
