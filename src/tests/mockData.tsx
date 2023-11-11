import { ShowsProps } from '../modules/interfaces';
import {ResultsCard, Details} from '../components/components';
import { Outlet } from 'react-router-dom';

export const mockCard: ShowsProps = {
  id: '1',
  titleOriginal: 'Test Card',
  totalSeasons: '1',
  rating: 0,
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




