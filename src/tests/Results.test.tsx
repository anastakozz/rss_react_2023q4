import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Results from '../components/Results';
import { BrowserRouter } from 'react-router-dom';

const mockUpdateContext = vi.fn();

test('renders Results component', () => {
  render(
    <BrowserRouter>
      <Results updateContext={mockUpdateContext} />
    </BrowserRouter>
  );
  const results = screen.getAllByRole('results');
  expect(results).toBeDefined();
});
