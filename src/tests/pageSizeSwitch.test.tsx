import { fireEvent, render, screen, act } from '@testing-library/react';
import { expect, test } from 'vitest';
import PageSizeSwitch from '../components/PageSizeSwitch';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

const RenderComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageSizeSwitch />
      </BrowserRouter>
    </Provider>
  );
};

test('switch is defined', () => {
  render(<RenderComponent />);
  const button = screen.getByText('Set page size');
  expect(button).toBeDefined();
});

test('switch changes input value', () => {
  const testValue = '20';
  render(<RenderComponent />);
  const input = screen.getByRole('page-size-input') as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: testValue } });
  });
  expect(input.value).toEqual(testValue);
});
