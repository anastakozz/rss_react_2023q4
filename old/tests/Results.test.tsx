import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Results from '../components/Results';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

const MockResults = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    </Provider>
  );
};

test('renders Results component', () => {
  render(<MockResults />);
  const results = screen.getAllByRole('results');
  expect(results).toBeDefined();
});
