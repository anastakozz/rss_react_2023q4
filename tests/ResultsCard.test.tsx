import ResultsCard from "@/components/ResultsCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Provider } from "react-redux";
import { mockCard } from "./mock/mockData";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("renders proper data", () => {
  render(<ResultsCard item={mockCard} />);
  expect(screen.getByText("Test Card")).toBeDefined();
});

// test("shows details component on click", async () => {
//   render(<MockComponent />);

//   const link = screen.getByRole("card");
//   fireEvent.click(link);

//   await waitFor(() => {
//     const details = screen.getByRole("details");
//     expect(details).toBeDefined();
//   });
// });

// test("initiates additional api call onclick", async () => {
//   const requestSpy = vi.fn();
//   server.events.on("request:start", ({ request }) => {
//     requestSpy(request.url);
//   });

//   render(<MockComponent />);

//   const link = screen.getByRole("card");
//   fireEvent.click(link);

//   await waitFor(() => {
//     expect(requestSpy).toHaveBeenCalledWith(baseUrl);
//   });
// });
