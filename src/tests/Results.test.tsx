import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Results from '../components/Results';
import { BrowserRouter } from 'react-router-dom';

const mockUpdateContext = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      pageNumber: 1,
      showId: 1,
    }),
  };
});

const MockResults = () => {
  return (
    <BrowserRouter>
      <Results updateContext={mockUpdateContext} />
    </BrowserRouter>
  );
};

test('renders Results component', () => {
  render(<MockResults />);
  const results = screen.getAllByRole('results');
  expect(results).toBeDefined();
});

test('updates context on click', () => {
  render(<MockResults />);
  const input = screen.getByRole('page-size-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '20' } });

  const button = screen.getByText('Set page size');
  fireEvent.click(button);

  expect(mockUpdateContext).toBeCalled();
});
