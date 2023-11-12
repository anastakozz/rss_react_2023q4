import { ShowsProps } from '../modules/interfaces';
import { ResultsCard, Details } from '../components/components';
import { Outlet, Navigate } from 'react-router-dom';
import { firstPage } from '../modules/constant';
import App from '../App';
import MyErrorElement from '../components/404page';

export const mockCard: ShowsProps = {
  id: '1',
  titleOriginal: 'Test Card',
  totalSeasons: '1',
  rating: 0,
};

export const mockedDetailsData = {
  titleOriginal: 'Mocked Title',
  country: 'Mocked Country',
  started: 'Mocked Start Date',
  description: 'Mocked Description',
  image: 'Mocked Image URL',
};

export const routesConfig = [
  {
    path: '/1',
    element: (
      <>
        <ResultsCard item={mockCard} />
        <Outlet />
      </>
    ),
    children: [{ path: '/1/:showId', element: <Details /> }],
  },
];

export const fullRoutesConfig = [
  {
    path: '/',
    element: <Navigate to={firstPage} />,
    errorElement: <MyErrorElement />,
  },
  {
    path: '/:pageNumber',
    element: <App />,
    children: [{ path: ':showId', element: <Details /> }],
  },
];
