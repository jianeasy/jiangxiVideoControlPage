import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Map from '@/pages/Map';
import Video from '@/pages/Video';
import Cave from '@/pages/Cave';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    
    children: [
      {
        path: 'map',
        element: <Map />,
      },
      {
        path: 'video',
        element: <Video />,
      },
      {
        path: 'cave',
        element: <Cave />,
      },
    ],
  },
], {
  basename: '/videoMapControlPage',
});
export default router;
