import { fireEvent, render, screen, act } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PageSizeSwitch from "../src/components/PageSizeSwitch";
import { basicPageSize } from "@/modules/constant";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("switch is defined", () => {
  render(<PageSizeSwitch size={basicPageSize} />);
  const button = screen.getByText("Set page size");
  expect(button).toBeDefined();
});

test("switch changes input value", () => {
  const testValue = "20";
  render(<PageSizeSwitch size={basicPageSize} />);
  const input = screen.getByRole("page-size-input") as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: testValue } });
  });
  expect(input.value).toEqual(testValue);
});
