import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Details from "@/components/Details";
import { mockedDetailsData } from "./mock/mockData";
import mockRouter from "next-router-mock";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("hides details component on click", async () => {
  render(<Details data={mockedDetailsData} />);

  const closeButton = screen.getByText("Close");
  fireEvent.click(closeButton);
  await waitFor(() => {
    expect(mockRouter.query["details"]).not.toBeDefined();
  });
});

test("displays data correctly", async () => {
  render(<Details data={mockedDetailsData} />);

  await waitFor(async () => {
    expect(screen.getByRole("details-title")).toBeDefined();
    expect(screen.getByText("Mocked Country")).toBeDefined();
    expect(screen.getByText("Mocked Start Date")).toBeDefined();
  });
});
