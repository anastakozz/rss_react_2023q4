import ResultsCard from '../components/ResultsCard';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ShowsProps } from '../modules/interfaces';
import { BrowserRouter } from 'react-router-dom';

const mockCard: ShowsProps = {
  id: '1',
  titleOriginal: 'Test Card',
  totalSeasons: '1',
  rating: 0,
};

test('renders proper data', () => {
  render(
    <BrowserRouter>
      <ResultsCard item={mockCard} />
    </BrowserRouter>
  );
  expect(screen.getByText('Test Card')).toBeDefined();
});
