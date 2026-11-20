import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { getTrending } from "../api/tmdb";

jest.mock("../api/tmdb", () => ({ getTrending: jest.fn() }));

test.each(["empty list", "network failure"])("Home recovers from %s", async (scenario) => {
  if (scenario === "empty list") getTrending.mockResolvedValueOnce([]);
  else getTrending.mockRejectedValueOnce(new Error("offline"));
  getTrending.mockResolvedValueOnce([{ id: 7, title: "Example movie" }]);
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(await screen.findByRole("status")).toHaveTextContent("currently unavailable");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByRole("heading", { name: "Example movie" })).toBeVisible();
  expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute("href", "/moviedetalis/7");
});
