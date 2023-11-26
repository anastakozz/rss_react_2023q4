import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Search from "@/components/Search";
import mockRouter from "next-router-mock";
import { queryKeys } from "@/modules/enum";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("renders Search component", () => {
  render(<Search search="" />);
  const search = screen.getByRole("search");
  expect(search).toBeDefined();
});

test("throws on click on Error button", () => {
  render(<Search search="" />);

  const errorButton = screen.getByText("Error");
  try {
    fireEvent.click(errorButton);
    expect(true).toBeFalsy();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("this is a test Error");
    expect(screen.findByRole("error-boundary")).toBeDefined();
  }
});

test("updates query onclick", () => {
  render(<Search search="test query" />);

  const searchButton = screen.getByText("Search");
  fireEvent.click(searchButton);

  expect(mockRouter.query[queryKeys.search]).toEqual("test query");
});

test("updates value onchange", () => {
  render(<Search search="" />);

  const searchButton = screen.getByText("Search");
  const input = screen.getByRole("search-input");
  act(() => {
    fireEvent.change(input, { target: { value: "test" } });
  });
  fireEvent.click(searchButton);

  expect(mockRouter.query[queryKeys.search]).toEqual("test");
});
