# 🎬 MOVIEtime

A React movie-browsing app that pulls its data from The Movie Database (TMDB) and puts the catalog behind a simple account system. Browse popular titles, open a details page for any movie, and page through the results.

**Live demo:** https://movi-etime.vercel.app

> Heads up: the sign-in service this app used to call is currently offline, so logging in on the live demo doesn't work at the moment. See [Known issues](#known-issues--roadmap).

![MOVIEtime screenshot](https://github.com/onisEg/MOVIEtime/assets/35266228/c3559770-d414-45e2-95ba-42fe08995f98)
![MOVIEtime screenshot](https://github.com/onisEg/MOVIEtime/assets/35266228/b8250428-f2c7-4b77-987c-b7a56b97b12b)
![MOVIEtime screenshot](https://github.com/onisEg/MOVIEtime/assets/35266228/b79f466a-7a34-4705-8dd0-a73e646e3a5f)

## What it does

- Browse popular movies, pulled live from TMDB (`/discover/movie`, sorted by popularity)
- Open a details page for any movie at `/moviedetalis/:id`
- Page through results with a numbered pager
- Register and log in — the session token is stored in `localStorage` and the inner pages sit behind protected routes
- Collections, TV, and Author sections exist as routes (TV and Author are still minimal placeholders)

## Built with

- React 18 (Create React App) + React Router v6
- Axios for API requests
- Bootstrap 5 and Font Awesome for the UI
- Joi for form validation
- The Movie Database (TMDB) REST API for all movie data

## Running it locally

```bash
git clone https://github.com/onisEg/MOVIEtime.git
cd MOVIEtime
npm install
npm start
```

Then open http://localhost:3000.

### Scripts

- `npm start` — run in development mode
- `npm run build` — create a production build in `build/`
- `npm test` — run the test runner

## Project structure

```
src/
  App.jsx              # routes + the auth gate (ProtectedRoute)
  components/
    Navbar.jsx  Footer.jsx
    Home.jsx  Movies.jsx  MovieDetalis.jsx
    Collections.jsx  Tv.jsx  Author.jsx
    Login.jsx  Register.jsx   # Joi-validated forms
    Notfound.jsx
  css/   imgs/
```

## Configuration

The TMDB API key is currently hardcoded inside the components, and the auth endpoint is a fixed URL. Both should move into a `.env` file so they aren't committed to the repo:

```
REACT_APP_TMDB_KEY=your_tmdb_key_here
REACT_APP_AUTH_URL=your_auth_endpoint_here
```

(See the issues below — this is on the to-do list.)

## Known issues / roadmap

These are tracked in the repo's **Issues** tab:

- **Login is down** — the sign-in request used to hit an external WordPress endpoint that now returns 404, so no one can log in. Because every inner page is protected, logged-out visitors land on a blank page. The simplest fix for the demo is a local/mock login.
- **`ProtectedRoute` doesn't redirect** logged-out users to `/login` (the redirect line is commented out), which is why they see a blank page instead of the login screen.
- **TMDB API key is committed** in the source and should move to an environment variable.
- **Pagination is hardcoded to 13 pages**, and Prev/Next can run past the real range.

## Author

Built by [Anas Alnagar](https://github.com/onisEg) — front-end developer. One of my React learning projects.
