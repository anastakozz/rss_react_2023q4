import ResultsCard from '../components/ResultsCard';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { mockCard, routesConfig } from './mockData';
import { act } from 'react-dom/test-utils';

vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      pageNumber: 1,
    }),
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

