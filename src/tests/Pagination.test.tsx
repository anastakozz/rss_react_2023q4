import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Pagination from '../components/Pagination';
import { createMemoryRouter, RouterProvider } from 'react-router';

const pages = {
  total: 3,
  initial: 2,
  next: 3,
  previous: 1,
};
const routesConfig = [
  { path: `/${pages.initial}`, element: <Pagination total={pages.total} /> },
];

const routesBadConfig = [
  {
    path: `/${pages.initial}`,
    element: <Pagination total={pages.initial - 1} />,
  },
];

vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      pageNumber: pages.initial,
    }),
  };
});

test('pagination updates URL query parameter when page number increases', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(<RouterProvider router={router} />);

  const nextButton = screen.getByText('Next');
  act(() => {
    fireEvent.click(nextButton);
  });
  expect(router.state.location.pathname).toBe(`/${pages.next}`);
});

test('pagination updates URL query parameter when page number diminishes', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(<RouterProvider router={router} />);

  const PrevButton = screen.getByText('Prev');
  act(() => {
    fireEvent.click(PrevButton);
  });
  expect(router.state.location.pathname).toBe(`/${pages.previous}`);
});

test('navigates to first page when initial value is less than total pages count', () => {
  const router = createMemoryRouter(routesBadConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(<RouterProvider router={router} />);
  expect(router.state.location.pathname).toBe(`/${pages.previous}`);
});
