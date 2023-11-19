import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { routesConfig } from './mockData';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { server } from '../mock/api/server';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../store/api';
const detailsUrl = '/1/1';

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

const MockComponent = () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [detailsUrl],
  });
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

test('hides details component on click', () => {
  render(<MockComponent />);

  const closeButton = screen.getByText('Close');
  fireEvent.click(closeButton);

  expect(screen.queryByRole('details')).toBeNull();
});

test('displays loader while fetching data', async () => {
  server.use(
    http.post(`${baseUrl}*`, () =>
      HttpResponse.json({
        result: null,
      })
    )
  );
  render(<MockComponent />);
  const loader = screen.getByRole('loader');
  expect(loader).toBeDefined();
});

test('displays data correctly', () => {
  render(<MockComponent />);

  waitFor(() => {
    expect(screen.getByRole('details-title')).toBeDefined();
    expect(screen.getByText('Mocked Country')).toBeDefined();
    expect(screen.getByText('Mocked Start Date')).toBeDefined();
  });
});
