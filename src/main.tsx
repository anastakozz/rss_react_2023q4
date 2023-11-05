import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Details from './components/Details';
import { getShowData } from './services/api.service';
import { ShowsProps } from './modules/interfaces';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="search/:pageNumber">
        <Route
          path=":showId"
          element={<Details />}
          loader={async ({ params }): Promise<ShowsProps | undefined> => {
            return await getShowData(params.showId);
          }}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
