import { useEffect } from 'react';

export default function Modal({ onClose, isOpen, photoUrl, title }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animat-fadeIn'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-lg max-w-lg w-full animate-slideDown'
        onClick={(e) => e.stopPropagation()}
      >
        {/*Header*/}
        {/* <div className='flex justify-between items-center border-b p-4'>
          <h5 className='text-lg font-bold'>123</h5>
          <button>&times</button>
        </div> */}

        {/*Body*/}
        <div className='p-4'>
          <img src={photoUrl} alt='' />
        </div>
        {/*Footer*/}
        {/* <div className='flex justify-end border-t p-4 space-x-2'>
          <button
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Close
          </button>
          <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
            Save changes
          </button>
        </div> */}
      </div>
    </div>
  );
}
