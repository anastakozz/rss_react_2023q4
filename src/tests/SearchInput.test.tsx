import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SearchInput from '../components/SearchInput';

const mockUpdate = vi.fn();

test('input changes value', () => {
  render(<SearchInput updateState={mockUpdate} inputValue={''} />);
  const input = screen.getByRole('search-input');
  act(() => {
    fireEvent.change(input,{ target: { value: 'test' } });
  });

  expect(mockUpdate).toBeCalled();
});
