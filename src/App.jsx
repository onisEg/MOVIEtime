import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Collections from "./components/Collections";
import Author from "./components/Author";
import Tv from "./components/Tv";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/Notfound";
import MovieDetalis from "./components/MovieDetalis";
import Movies from "./components/Movies";
import { getToken, logout } from "./services/auth";

function GuestRoute({ children }) {
  return getToken() ? <Navigate to="/home" replace /> : children;
}

const browsePages = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "home", element: <Home /> },
  { path: "collections", element: <Collections /> },
  { path: "movies", element: <Movies /> },
  { path: "moviedetalis/:id", element: <MovieDetalis /> },
  { path: "author", element: <Author /> },
  { path: "tv", element: <Tv /> },
];

function App() {
  const navigate = useNavigate();
  const signedIn = Boolean(getToken());

  function logOut() {
    logout();
    navigate("/");
  }

  return (
    <div className="container-fluid">
      <Navbar logOut={logOut} signedIn={signedIn} />
      <div className="container pb-5">
        <Routes>
          {browsePages.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
          <Route
            path="login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
