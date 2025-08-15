import axios from 'axios';
import SearchInput from '../components/SearchInput';
import Card from '../components/Card';
import React, { useEffect, useRef, useState } from 'react';
import { useUnsplash } from '../context/useUnsplash';
export default function UnsplashPage() {
  const api = 'https://api.unsplash.com/search/photos/';
  const accessKey = '2D-eTcEkI8n0ILUyZde-xMjwZTlfSkWlA-bkHojuCHU';
  const listRef = useRef(null);
  const currentPage = useRef(1);
  const isLoading = useRef(false);
  const { keyword, setKeyword, jsonData, setJsonData } = useUnsplash();
  console.log('keyword', keyword);
  // const [keyword, setKeyword] = useState('animal');
  // const [jsonData, setJsonData] = useState([]);
  const handSearch = (text) => {
    setKeyword(text);
  };

  const getPhotos = async (page = 1) => {
    try {
      isLoading.current = true;
      const result = await axios.get(
        `${api}?client_id=${accessKey}&query=${keyword}&page=${page}`
      );
      console.log(result);
      setJsonData((preData) => {
        const newItems = result.data.results.filter(
          (item) => !preData.some((old) => old.id === item.id)
        );
        
        return [...preData, ...newItems];
      });
      setTimeout(() => {
        isLoading.current = false;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhotos();

    // 滾動監聽
    const handleScroll = () => {
      const height =
        listRef.current.offsetHeight +
        listRef.current.offsetTop -
        window.innerHeight;
      if (!isLoading.current && window.scrollY > height) {
        currentPage.current++;
        getPhotos(currentPage.current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      <div className='grid grid-cols-2 gap-3' ref={listRef}>
        {jsonData.map((item) => {
          return (
            <div key={item.id}>
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
