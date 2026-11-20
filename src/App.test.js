import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./api/tmdb", () => ({
  discover: async () => ({ results: [{ id: 12, title: "Example movie" }], total_pages: 1 }),
}));

test("visitors see the catalog immediately and can open either account form", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: "Example movie" })).toBeVisible();
  expect(screen.getByRole("link", { name: /Example movie/ })).toHaveAttribute("href", "/moviedetalis/12");
  fireEvent.click(screen.getByRole("link", { name: "Login" }));
  expect(screen.getByRole("heading", { name: /login/i })).toBeVisible();
  fireEvent.click(screen.getByRole("link", { name: "Register" }));
  expect(screen.getByRole("button", { name: /sign up/i })).toBeVisible();
});
