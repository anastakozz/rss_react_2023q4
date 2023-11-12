import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Search from '../components/Search';

const mockUpdateContext = vi.fn();

test('renders Search component', () => {
  render(
    <BrowserRouter>
      <Search updateContext={mockUpdateContext} />
    </BrowserRouter>
  );
  const search = screen.getAllByRole('search');
  expect(search).toBeDefined();
});