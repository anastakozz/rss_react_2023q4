import ResultsCard from "@/components/ResultsCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { mockCard } from "./mock/mockData";
import mockRouter from "next-router-mock";
import { queryKeys } from "@/modules/enum";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("renders proper data", () => {
  render(<ResultsCard item={mockCard} />);
  expect(screen.getByText("Test Card")).toBeDefined();
});

test("shows details component on click", async () => {
  render(<ResultsCard item={mockCard} />);

  const link = screen.getByRole("card");
  fireEvent.click(link);

  await waitFor(() => {
    expect(mockRouter.query[queryKeys.details]).toBeDefined();
  });
});
