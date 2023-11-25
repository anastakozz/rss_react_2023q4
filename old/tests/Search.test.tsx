import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
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

test('renders Search component', () => {
  render(<MockSearch />);
  const search = screen.getByRole('search');
  expect(search).toBeDefined();
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
