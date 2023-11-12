import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { routesConfig } from './mockData';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
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

test('hides details component on click', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/1/1'],
  });
  render(<RouterProvider router={router} />);

  const closeButton = screen.getByText('Close');
  act(() => {
    fireEvent.click(closeButton);
  });

  expect(screen.queryByRole('details')).toBeNull();
});

test('displays loader while fetching data', async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/1/1'],
  });
  render(<RouterProvider router={router} />);
  const loader = screen.getByRole('loader');
  expect(loader).toBeDefined();
});

test('displays data correctly', async () => {
  vi.mocked(getShowData).mockResolvedValue({
    titleOriginal: 'Mocked Title',
    country: 'Mocked Country',
    started: 'Mocked Start Date',
    description: 'Mocked Description',
    image: 'Mocked Image URL',
  });

  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/1/1'],
  });
  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByRole('details-title')).toBeDefined();
    expect(screen.getByText('Mocked Country')).toBeDefined();
    expect(screen.getByText('Mocked Start Date')).toBeDefined();
  });
});
