import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
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

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

test('switch is defined', () => {
  render(<RenderComponent />);
  const button = screen.getByText('Set page size');
  expect(button).toBeDefined();
});

test('returns to first page onclick', () => {
  render(<RenderComponent />);
  const button = screen.getByText('Set page size');

  fireEvent.click(button);

  waitFor(() => {
    expect(mockedUsedNavigate).toBeCalled();
  });
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
