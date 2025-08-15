import React from 'react';

export default function card({ item, getSinglePhoto }) {
  return (
    <a
      href='#'
      className='bg-white rounded-lg shadow overflow-hidden'
      onClick={(e) => {
        e.preventDefault();
        getSinglePhoto(item.slug);
      }}
    >
      <img
        src={item.urls.regular}
        className='w-full h-[150px] object-cover'
        alt='...'
      />
    </a>
  );
}
