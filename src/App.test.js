import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { getToken } from "./services/auth";

jest.mock("./api/tmdb", () => ({
  getTrending: async () => [{ id: 12, title: "Example movie" }],
}));

function openPage(path) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

test("a guest can browse without credentials, reload, and exit", async () => {
  const firstVisit = openPage("/home");
  fireEvent.click(screen.getByRole("button", { name: "Enter as a guest" }));
  expect(await screen.findByRole("heading", { name: "Example movie" })).toBeVisible();
  expect(getToken()).toBeNull();
  expect(screen.getByRole("link", { name: "movies" })).toBeVisible();

  firstVisit.unmount();
  openPage("/home");
  expect(await screen.findByRole("heading", { name: "Example movie" })).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Exit guest mode" }));
  expect(screen.getByRole("button", { name: "Enter as a guest" })).toBeVisible();
  fireEvent.click(screen.getByRole("link", { name: "MOVIEtime" }));
  expect(screen.getByRole("heading", { name: "Login to your account" })).toBeVisible();
});
