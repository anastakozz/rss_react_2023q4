import {  render, screen } from '@testing-library/react';
import { expect, test} from 'vitest';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('renders App with search section', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const search = screen.getByRole('search');
  expect(search).toBeDefined;
});
