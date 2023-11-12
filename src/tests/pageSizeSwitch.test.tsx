import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import PageSizeSwitch from '../components/PageSizeSwitch';

const mockUpdate = vi.fn();

test('switch is defined', () => {
  render(<PageSizeSwitch updateData={mockUpdate}></PageSizeSwitch>);
  const button = screen.getByText('Set page size');
  expect(button).toBeDefined();
});

test('switch calls updateData function on click', () => {
  render(<PageSizeSwitch updateData={mockUpdate}></PageSizeSwitch>);
  const button = screen.getByText('Set page size');
  act(() => {
    fireEvent.click(button);
  });
  expect(mockUpdate).toBeCalled();
});

test('switch changes input value', () => {
  const testValue = '20'
  render(<PageSizeSwitch updateData={mockUpdate}></PageSizeSwitch>);
  const input = screen.getByRole('page-size-input') as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: testValue } });
  });
  expect(input.value).toEqual(testValue);
});
