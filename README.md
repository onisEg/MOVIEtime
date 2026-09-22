# 🎬 MOVIEtime

A movie discovery app built with **React** and the **TMDB API**. Browse trending and popular movies, TV shows and people, and open any movie to see its rating, runtime, genres and overview.

![Home](https://github.com/onisEg/MOVIEtime/assets/35266228/c3559770-d414-45e2-95ba-42fe08995f98)

| Collections | Movie details |
|---|---|
| ![Collections](https://github.com/onisEg/MOVIEtime/assets/35266228/b8250428-f2c7-4b77-987c-b7a56b97b12b) | ![Details](https://github.com/onisEg/MOVIEtime/assets/35266228/b79f466a-7a34-4705-8dd0-a73e646e3a5f) |

## Try it

Log in with the demo account, or create your own:

| Username | Password |
|---|---|
| `demo` | `demo123` |

## Features

- **Home** — this week's #1 trending movie as a hero section.
- **Collections** — trending movies, TV shows and people of the week.
- **Movies / TV / People** — popular lists with pagination.
- **Movie details** — rating, year, genres, runtime, overview and poster.
- **Auth** — register and login with Joi validation; all pages are protected and redirect to login.
- **Responsive** poster grids (2 columns on phones up to 6 on desktop), loading and error states, 404 page.

> **About the auth:** the app originally used a custom WordPress REST endpoint that is no longer online.
> It now uses a small client-side auth service (`src/services/auth.js`) that stores users in
> `localStorage` with SHA-256 hashed passwords, so the demo keeps working without a backend.

## Tech stack

React 18 (Create React App) · React Router 6 · Axios · Joi · Bootstrap 5 · Font Awesome · TMDB API

## Project structure

```
src/
├── api/tmdb.js          # Axios instance + TMDB requests
├── services/auth.js     # register / login / logout
├── components/          # pages + shared MediaGrid, Pager, usePagedList
└── css/
```

## Run locally

```bash
npm install
npm start          # http://localhost:3000
```

Optionally create a `.env` file with your own TMDB key:

```
REACT_APP_TMDB_KEY=your_key_here
```

## Author

**Anas Alnagar** — Frontend Developer, Barcelona  
[Portfolio](https://www.anascv.com/) · [LinkedIn](https://www.linkedin.com/in/anaseg/) · [GitHub](https://github.com/onisEg)
