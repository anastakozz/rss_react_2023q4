import ResultsCard from '../components/ResultsCard';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { mockCard } from './mockData';

test('renders proper data', () => {
  render(
    <BrowserRouter>
      <ResultsCard item={mockCard} />
    </BrowserRouter>
  );
  expect(screen.getByText('Test Card')).toBeDefined();
});
