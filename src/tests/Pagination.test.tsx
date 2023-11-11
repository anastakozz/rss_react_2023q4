import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test } from 'vitest';
import Pagination from '../components/Pagination';
import { createMemoryRouter, RouterProvider } from 'react-router';

const pages = {
    total: 2,
    initial: 1,
    next: 2
};
const routesConfig = [
  { path: `/${pages.initial}`, element: <Pagination total={pages.total} /> },
];

test('pagination updates URL query parameter when page changes', () => {
  const router = createMemoryRouter(routesConfig, { initialEntries: [`/${pages.initial}`] });
  render(<RouterProvider router={router} />);

  const nextButton = screen.getByText('Next');
  act(() => {
    fireEvent.click(nextButton);
  });
  expect(router.state.location.pathname).toBe(`/${pages.next}`);
});
