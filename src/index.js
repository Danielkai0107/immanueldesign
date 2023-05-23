import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import './styles/global.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error-page';
import About from './pages/About';

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service Worker Registered', reg))
    .catch((err) => console.log('Service Worker Not Registered', err));
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/About",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
