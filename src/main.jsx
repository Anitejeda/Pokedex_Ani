import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router';
import './index.css'
import { router } from './router';
import { UserProvider } from './components/contexts/UserProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <UserProvider/>
  </React.StrictMode>,
);