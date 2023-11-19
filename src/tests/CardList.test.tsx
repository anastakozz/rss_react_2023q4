import Cards from '../components/Cards';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { testCardNumber } from './mockData';
import { server } from '../mock/api/server';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../store/api';

const MockComponent = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Cards />
      </Provider>
    </BrowserRouter>
  );
};

test('shows correct number of cards', () => {
  render(<MockComponent />);
  waitFor(() => {
    const cardsNumber = screen.getAllByRole('card');
    expect(cardsNumber).toHaveLength(testCardNumber);
  });
});

test('shows a message about data absence', () => {
  server.use(
    http.post(`${baseUrl}*`, () =>
      HttpResponse.json({
        result: [],
      })
    )
  );
  render(<MockComponent />);
  waitFor(() => {
    const message = screen.getByText('nothing to show');
    expect(message).toBeDefined();
  });
});
