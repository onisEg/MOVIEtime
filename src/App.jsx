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
import { useState } from "react";
import MovieDetalis from "./components/MovieDetalis";
import Movies from "./components/Movies";
import { getToken, logout } from "./services/auth";

// Defined outside App so it isn't re-created on every render
function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  return getToken() ? <Navigate to="/home" replace /> : children;
}

const protectedPages = [
  { path: "/", element: <Home /> },
  { path: "home", element: <Home /> },
  { path: "collections", element: <Collections /> },
  { path: "movies", element: <Movies /> },
  { path: "moviedetalis/:id", element: <MovieDetalis /> },
  { path: "author", element: <Author /> },
  { path: "tv", element: <Tv /> },
];

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(getToken());

  function saveUserData() {
    setUserData(getToken());
  }

  function logOut() {
    logout();
    setUserData(null);
    navigate("/login");
  }

  return (
    <div className="container-fluid">
      <Navbar logOut={logOut} userData={userData} />
      <div className="container pb-5">
        <Routes>
          {protectedPages.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
          <Route
            path="login"
            element={
              <GuestRoute>
                <Login saveUserData={saveUserData} />
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
