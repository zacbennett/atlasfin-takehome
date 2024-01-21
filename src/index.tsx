import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <ArticleListPage />,
  },
  {
    path: "/:id",
    element: <ArticlePage />,
  },
  {
    path: "*",
    element: <h1>WHOOPS IDK</h1>,
  },
]);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
