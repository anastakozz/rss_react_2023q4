import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

test('renders App with search section', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const search = screen.getByRole('search');
  expect(search).toBeDefined;
});
