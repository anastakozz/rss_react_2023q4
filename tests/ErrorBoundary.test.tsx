import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Search from "@/components/Search";
import ErrorBoundary from "@/components/ErrorBoundary";
import { reloadWindow } from "@/modules/utils";

vi.mock("@/modules/utils", async (importOriginal) => {
  const mod: { [key: string]: unknown } = await importOriginal();
  return {
    ...mod,
    reloadWindow: vi.fn(),
  };
});

test("shows ErrorBoundary fallback", () => {
  render(
    <ErrorBoundary>
      <Search search="" />
    </ErrorBoundary>
  );

  const errorButton = screen.getByText("Error");
  try {
    fireEvent.click(errorButton);
    expect(true).toBeFalsy();
  } catch (error) {
    expect(screen.findByRole("error-boundary")).toBeDefined();
  }
});

test("reloads onclick", async () => {
  render(
    <ErrorBoundary>
      <Search search="" />
    </ErrorBoundary>
  );

  const errorButton = screen.getByText("Error");
  try {
    fireEvent.click(errorButton);
    expect(true).toBeFalsy();
  } catch (error) {
    const refreshButton = screen.getByText("refresh");
    act(() => {
      fireEvent.click(refreshButton);
    });

    expect(reloadWindow).toHaveBeenCalled();
  }
});
