import { createContext, useContext, useState } from 'react';

const UnsplashContext = createContext();

export function UnsplashProvider({ children }) {
  const [keyword, setKeyword] = useState('animal');
  const [jsonData, setJsonData] = useState([]);

  return (
    <UnsplashContext.Provider
      value={{ keyword, setKeyword, jsonData, setJsonData }}
    >
      {children}
    </UnsplashContext.Provider>
  );
}

export default UnsplashContext;
