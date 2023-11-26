import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Pagination from "@/components/Pagination";
import mockRouter from "next-router-mock";
import { queryKeys } from "@/modules/enum";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

const { total, initial, next, previous } = {
  total: 3,
  initial: 2,
  next: 3,
  previous: 1,
};

test("pagination is rendered", async () => {
  render(<Pagination pagesTotal={total} page={initial} />);

  await waitFor(() => {
    expect(screen.getByRole("pagination")).toBeDefined();
  });
});

test("pagination updates URL query parameter when page number increases", async () => {
  render(<Pagination pagesTotal={total} page={initial} />);

  const nextButton = await screen.findByText("Next");
  fireEvent.click(nextButton);
  act(() => {
    expect(mockRouter.query[queryKeys.pagination]).toBe(`${next}`);
  });
});

test("pagination updates URL query parameter when page number diminishes", async () => {
  render(<Pagination pagesTotal={total} page={initial} />);

  const PrevButton = await screen.findByText("Prev");
  fireEvent.click(PrevButton);
  act(() => {
    expect(mockRouter.query[queryKeys.pagination]).toBe(`${previous}`);
  });
});
