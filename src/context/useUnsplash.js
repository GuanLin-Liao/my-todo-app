import { useContext } from 'react';
import UnsplashContext from './UnsplashContext';

export const useUnsplash = () => useContext(UnsplashContext);
