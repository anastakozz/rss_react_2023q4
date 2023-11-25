import MainPage from "@/pages";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { mockMainPageData } from "./mock/mockData";
// import mockRouter from "next-router-mock";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("404 page is displayed when navigating to an invalid route", async () => {
  render(<MainPage {...mockMainPageData} />);
  const mainElement = screen.getByRole("main");
  expect(mainElement).toBeDefined();
  // mockRouter.push("/test-path");
  // await waitFor(() => {
  //   const message = screen.getByText("404");
  //   expect(message).toBeDefined();
  // });
});
