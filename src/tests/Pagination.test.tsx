import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Pagination from '../components/Pagination';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';

const pages = {
  total: 3,
  initial: 2,
  next: 3,
  previous: 1,
};
const routesConfig = [{ path: '/:pageNumber', element: <Pagination /> }];

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

test('pagination is rendered', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  waitFor(() => {
    expect(screen.getByRole('pagination')).toBeDefined();
  });
});

test('pagination updates URL query parameter when page number increases', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  waitFor(() => {
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(router.state.location.pathname).toBe(`/${pages.next}`);
  });
});

test('pagination updates URL query parameter when page number diminishes', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  waitFor(() => {
    const PrevButton = screen.getByText('Prev');
    fireEvent.click(PrevButton);
    expect(router.state.location.pathname).toBe(`/${pages.previous}`);
  });
});
