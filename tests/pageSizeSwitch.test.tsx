import { fireEvent, render, screen, act } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PageSizeSwitch from "../src/components/PageSizeSwitch";
import { basicPageSize } from "@/modules/constant";
import mockRouter from "next-router-mock";
import { queryKeys } from "@/modules/enum";

vi.mock("next/router", () => vi.importActual("next-router-mock"));
const testValue = "20";

test("switch is defined", () => {
  render(<PageSizeSwitch size={basicPageSize} />);
  const button = screen.getByText("Set page size");
  expect(button).toBeDefined();
});

test("switch changes input value", () => {
  render(<PageSizeSwitch size={basicPageSize} />);

  const input = screen.getByRole("page-size-input") as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: testValue } });
  });
  expect(input.value).toEqual(testValue);
});

test("updates query onclick", () => {
  render(<PageSizeSwitch size={basicPageSize} />);

  const input = screen.getByRole("page-size-input") as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: testValue } });
  });

  const Button = screen.getByText("Set page size");
  fireEvent.click(Button);

  expect(mockRouter.query[queryKeys.pageSize]).toEqual(testValue);
});
