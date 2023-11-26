import MainPage from "@/pages";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { mockMainPageData } from "./mock/mockData";
import PageNotFound from "@/pages/404";
import ServerErrorPage from "@/pages/500";

vi.mock("next/router", () => vi.importActual("next-router-mock"));

test("mainPage component is rendered", async () => {
  render(<MainPage {...mockMainPageData} />);
  const mainElement = screen.getByRole("main");
  expect(mainElement).toBeDefined();
});

test("404 component is rendered", async () => {
  render(<PageNotFound />);
  const message = screen.getByText("404");
  expect(message).toBeDefined();
});

test("500 component is rendered", async () => {
  render(<ServerErrorPage />);
  const message = screen.getByText("500");
  expect(message).toBeDefined();
});
