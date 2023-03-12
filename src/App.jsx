import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Collections from "./components/Collections";
import Author from './components/Author';
import Tv from './components/Tv';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import MovieDetalis from './components/MovieDetalis';
import Movies from './components/Movies';
function App() {
  
  let navigate = useNavigate();
  const [userData, setUserData] = useState('');
  function saveUserData() {
    setUserData(localStorage.getItem("userToken"));
  }
  function logOut() {
    navigate('/login');
    setUserData(null)
    localStorage.removeItem("userToken");
  }
  function ProtectedRoute({children}) {
    if (localStorage.getItem("userToken") === null) {
    return <Navigate to='/login'/>
    } else {
      return children;
  }
}
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData()
    }
  },[])
  
  return (
    <>
      <div className="container-fluid">
        <Navbar logOut={logOut} userData={userData} />
        <div className="container">
          <Routes>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="collections"
              element={
                <ProtectedRoute>
                  <Collections />
                </ProtectedRoute>
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="moviedetalis"
              element={
                <ProtectedRoute>
                  <MovieDetalis />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <MovieDetalis />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="author"
              element={
                <ProtectedRoute>
                  <Author />
                </ProtectedRoute>
              }
            />
            <Route
              path="tv"
              element={
                <ProtectedRoute>
                  <Tv />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={<Login saveUserData={saveUserData} />}
            />
            <Route path="register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
