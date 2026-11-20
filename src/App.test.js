import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./api/tmdb", () => ({
  getTrending: async () => [{ id: 8, title: "Featured movie" }],
  getMovie: async (id) => ({ id, title: "Direct movie" }),
  discover: async () => ({ results: [{ id: 12, title: "Example movie" }], total_pages: 1 }),
}));

test("visitors land on Home and can open Movies and either account form", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: "Featured movie" })).toBeVisible();
  expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute("href", "/moviedetalis/8");
  fireEvent.click(screen.getByRole("link", { name: "Movies" }));
  expect(await screen.findByRole("heading", { name: "Example movie" })).toBeVisible();
  expect(screen.getByRole("link", { name: /Example movie/ })).toHaveAttribute("href", "/moviedetalis/12");
  fireEvent.click(screen.getByRole("link", { name: "Login" }));
  expect(screen.getByRole("heading", { name: /login/i })).toBeVisible();
  fireEvent.click(screen.getByRole("link", { name: "Register" }));
  expect(screen.getByRole("button", { name: /sign up/i })).toBeVisible();
});

test("a visitor can open and reload a direct movie link", async () => {
  const directLink = () => render(
    <MemoryRouter initialEntries={["/moviedetalis/12"]}><App /></MemoryRouter>
  );
  const firstVisit = directLink();
  expect(await screen.findByRole("heading", { name: "Direct movie" })).toBeVisible();
  firstVisit.unmount();
  directLink();
  expect(await screen.findByRole("heading", { name: "Direct movie" })).toBeVisible();
});

test("Home uses /home and the brand returns to /", async () => {
  window.history.replaceState(null, "", "/");
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(await screen.findByRole("heading", { name: "Featured movie" })).toBeVisible();
  expect(window.location.pathname).toBe("/");
  fireEvent.click(screen.getByRole("link", { name: "Home" }));
  expect(window.location.pathname).toBe("/home");
  fireEvent.click(screen.getByRole("link", { name: "SceneShelf" }));
  expect(window.location.pathname).toBe("/");
  expect(window.location.hash).toBe("");
  expect(await screen.findByRole("heading", { name: "Featured movie" })).toBeVisible();
});
