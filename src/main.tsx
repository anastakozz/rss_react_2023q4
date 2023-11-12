import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Details from './components/Details';
import { firstPage } from './modules/constant';
import MyErrorElement from './components/404page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to={firstPage} />}
        errorElement={<MyErrorElement />}
      />
      <Route
        path="/:pageNumber"
        element={<App />}
        errorElement={<MyErrorElement />}
      >
        <Route path=":showId" element={<Details />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
