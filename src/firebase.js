// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-mnnOPhcJG1BC9yN2JXnv7WWOtMNdGNg',
  authDomain: 'react-todo-auth-5cafb.firebaseapp.com',
  projectId: 'react-todo-auth-5cafb',
  storageBucket: 'react-todo-auth-5cafb.firebasestorage.app',
  messagingSenderId: '763588183201',
  appId: '1:763588183201:web:f63b87465a4a0adf61dce0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
