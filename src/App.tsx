import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from '@/pages/home';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
function App() {
  console.log('init');
  
  return <RouterProvider router={router} ></RouterProvider>;
}

export default App;
