import ResultsCard from '../components/ResultsCard';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { mockCard, routesConfig } from './mockData';
import { act } from 'react-dom/test-utils';
import { getShowData } from '../services/api.service';

vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      pageNumber: 1,
      showId: 1,
    }),
  };
});

vi.mock('../services/api.service', async () => {
  const mod: { [key: string]: unknown } = await vi.importActual(
    '../services/api.service'
  );
  return {
    ...mod,
    getShowData: vi.fn(),
  };
});

test('renders proper data', () => {
  render(
    <BrowserRouter>
      <ResultsCard item={mockCard} />
    </BrowserRouter>
  );
  expect(screen.getByText('Test Card')).toBeDefined();
});

test('shows details component on click', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/1'],
  });
  render(<RouterProvider router={router} />);

  const link = screen.getByRole('card');

  act(() => {
    fireEvent.click(link);
  });
  const details = screen.getByRole('details');
  expect(details).toBeDefined();
});

test('initiates additional api call onclick', async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/1'],
  });

  render(<RouterProvider router={router} />);

  const link = screen.getByRole('card');
  fireEvent.click(link);

  await waitFor(() => {
    expect(getShowData).toHaveBeenCalled();
  });
});
