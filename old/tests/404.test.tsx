import { fullRoutesConfig } from './mockData';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

test('404 page is displayed when navigating to an invalid route', () => {
  const router = createMemoryRouter(fullRoutesConfig, {
    initialEntries: ['/test/bad/adress'],
  });
  render(<RouterProvider router={router} />);
  const message = screen.getByText('404');
  expect(message).toBeDefined();
});
