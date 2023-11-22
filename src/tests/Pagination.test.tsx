import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Pagination from '../components/Pagination';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import { server } from '../mock/api/server';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../store/api';
import { basicPageSize } from '../modules/constant';

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

test('pagination is rendered', async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByRole('pagination')).toBeDefined();
  });
});

test('pagination updates URL query parameter when page number increases', async () => {
  server.use(
    http.post(`${baseUrl}*`, () =>
      HttpResponse.json({ result: +basicPageSize * 3 })
    )
  );
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  });

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

  act(() => {
    expect(router.state.location.pathname).toBe(`/${pages.next}`);
  });
});

test('pagination updates URL query parameter when page number diminishes', async () => {
  server.use(
    http.post(`${baseUrl}*`, () =>
      HttpResponse.json({ result: +basicPageSize * 3 })
    )
  );
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [`/${pages.initial}`],
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  });

  const PrevButton = screen.getByText('Prev');
  fireEvent.click(PrevButton);
  await act(async () => {
    expect(router.state.location.pathname).toBe(`/${pages.previous}`);
  });
});
