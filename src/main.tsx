import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import HookForm from './pages/HookForm';
import StandartForm from './pages/StandartForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/form-1" element={<HookForm />}></Route>
      <Route path="/form-2" element={<StandartForm />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
