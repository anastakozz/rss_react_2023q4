import Cards from '../components/Cards';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { mockShowsData, testCardNumber } from './mockData';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../store/api';
import { server } from '../mock/api/server';

const MockComponent = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Cards />
      </Provider>
    </BrowserRouter>
  );
};

test('shows correct number of cards', async () => {
  server.use(
    http.post(`${baseUrl}*`, () => HttpResponse.json({ result: mockShowsData }))
  );
  render(<MockComponent />);

  await waitFor(async () => {
    const cardsNumber = await screen.findAllByRole('card');
    expect(cardsNumber.length).toEqual(testCardNumber);
  });
});

test('shows a message about data absence', async () => {
  server.use(http.post(`${baseUrl}*`, () => HttpResponse.json({ result: [] })));
  render(<MockComponent />);

  await waitFor(async () => {
    const message = await screen.findByText('nothing to show');
    expect(message).toBeDefined();
  });
});
