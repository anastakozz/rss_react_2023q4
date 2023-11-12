import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import Search from '../components/Search';
import { searchKey } from '../modules/constant';
import { fullRoutesConfig } from './mockData';

const mockUpdateContext = vi.fn();
const localStorageMock: Storage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};

const MockSearch = () => {
  return (
    <BrowserRouter>
      <Search updateContext={mockUpdateContext} />
    </BrowserRouter>
  );
};

test('renders Search component', () => {
  render(<MockSearch />);
  const search = screen.getByRole('search');
  expect(search).toBeDefined();
});

test('saves new value to local storage onclick', () => {
  global.localStorage = localStorageMock;

  render(<MockSearch />);

  const input = screen.getByRole('search-input');
  const button = screen.getByText('Search');
  fireEvent.change(input, { target: { value: 'test search' } });
  fireEvent.click(button);
  waitFor(() => {
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      searchKey,
      'test search'
    );
  });
});

test('gets a value from local storage when rendered', () => {
  global.localStorage = localStorageMock;

  const router = createMemoryRouter(fullRoutesConfig, {
    initialEntries: ['/1'],
  });
  render(<RouterProvider router={router} />);

  waitFor(() => {
    expect(localStorageMock.getItem).toHaveBeenCalledWith(searchKey);
  });
});

test('throws on click on Error button', () => {
  render(<MockSearch />);

  const errorButton = screen.getByText('Error');
  try {
    fireEvent.click(errorButton);
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('this is a test Error');
  }
});
