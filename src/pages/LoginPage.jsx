import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 relative'>
      <button
        onClick={() => navigate(-1)}
        className='absolute top-4 left-4 text-2xl text-blue-500 hover:text-blue-700'
        aria-label='返回上一頁'
        title='返回上一頁'
      >
        ←
      </button>
      <AuthForm></AuthForm>
    </div>
  );
}
