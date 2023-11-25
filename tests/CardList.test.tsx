import { Cards } from "@/components/components";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import {
  mockShowsData,
  mockedDetailsData,
  testCardNumber,
} from "./mock/mockData";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("shows correct number of cards", async () => {
  render(<Cards shows={mockShowsData} details={mockedDetailsData} />);

  await waitFor(async () => {
    const cardsNumber = await screen.findAllByRole("card");
    expect(cardsNumber.length).toEqual(testCardNumber);
  });
});

test("shows a message about data absence", async () => {
  render(<Cards shows={[]} details={null} />);

  await waitFor(async () => {
    const message = await screen.findByText(
      "This search returns no results. Try another search term, please!"
    );
    expect(message).toBeDefined();
  });
});
