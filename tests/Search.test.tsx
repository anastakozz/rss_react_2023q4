import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Search from "@/components/Search";

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
  }
});
