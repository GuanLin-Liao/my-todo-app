import React from 'react';

export default function card({item}) {
  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <img
        src={item.urls.regular}
        className='w-full h-[150px] object-cover'
        alt='...'
      />
    </div>
  );
}
