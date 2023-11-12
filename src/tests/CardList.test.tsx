import Cards from '../components/Cards';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DataContext } from '../modules/context';
import { mockCard } from './mockData';
import { BrowserRouter } from 'react-router-dom';

test('shows correct number of cards', () => {
  const testCardNumber = 5;
  const mockData = new Array(testCardNumber).fill(mockCard);
  render(
    <BrowserRouter>
      <DataContext.Provider value={mockData}>
        <Cards />
      </DataContext.Provider>
    </BrowserRouter>
  );

  const cardsNumber = screen.getAllByRole('card');
  expect(cardsNumber).toHaveLength(testCardNumber);
});

test('shows a message about data absence', () => {
  render(<Cards />);

  const message = screen.getByText('nothing to show');
  expect(message).toBeDefined();
});
