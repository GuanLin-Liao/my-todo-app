import axios from 'axios';
import SearchInput from '../components/SearchInput';
import Card from '../components/Card';
import React, { useEffect, useState } from 'react';
import { useUnsplash } from '../context/useUnsplash';
export default function UnsplashPage() {
  const api = 'https://api.unsplash.com/search/photos/';
  const accessKey = '2D-eTcEkI8n0ILUyZde-xMjwZTlfSkWlA-bkHojuCHU';
  const { keyword, setKeyword, jsonData, setJsonData } = useUnsplash();
  console.log('keyword', keyword);
  // const [keyword, setKeyword] = useState('animal');
  // const [jsonData, setJsonData] = useState([]);
  const handSearch = (text) => {
    setKeyword(text);
  };

  const getPhotos = async () => {
    try {
      const result = await axios.get(
        `${api}?client_id=${accessKey}&query=${keyword}`
      );
      console.log(result);
      setJsonData(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, [keyword]);

  return (
    <div>
      <h1 className='text-2xl md:text-3xl font-bold text-center my-4'>
        Unsplash API查詢圖片
      </h1>
      <SearchInput
        onSearch={handSearch}
        placeholder='搜尋圖片...'
        type='unsplash'
      />
      <div className='grid grid-cols-2 gap-3'>
        {jsonData.map((item) => {
          return (
            <div className='' key={item.id}>
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
