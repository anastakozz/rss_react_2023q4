import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Search from '../components/Search';
import { Provider } from 'react-redux';
import store from '../store';

const MockSearch = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </Provider>
  );
};

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

test('renders Search component', () => {
  render(<MockSearch />);
  const search = screen.getByRole('search');
  expect(search).toBeDefined();
});

test('navigates to first page onClick', () => {
  render(<MockSearch />);
  const button = screen.getByText('Search');
  fireEvent.click(button);

  waitFor(() => {
    expect(mockedUsedNavigate).toBeCalled();
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
