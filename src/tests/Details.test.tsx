import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { routesConfig } from './mockData';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

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
