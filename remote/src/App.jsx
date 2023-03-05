import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Books from './components/Books';
import Home from './components/Home';
import Author from './components/Author';
import Sections from './components/Sections';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
// import jwtDecode from 'jwt-decode';


function App() {

    let navigate = useNavigate();
  const [userData, setUserData] = useState('')
  
  function saveUserData() {
    let enCoded = localStorage.getItem("usertoken");
    // let deCoded = jwtDecode(enCoded)
    setUserData(enCoded)
  }
  function ProtectedRoute(props) {
    if (localStorage.getItem("usertoken") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }
  function logOut() {
     setUserData(null)
     localStorage.removeItem("usertoken");
     navigate("/login");
   }
  useEffect(() => {
    if (localStorage.getItem('usertoken')) {
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
                  {" "}
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="books"
              element={
                <ProtectedRoute>
                  {" "}
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route
              path="author"
              element={
                <ProtectedRoute>
                  {" "}
                  <Author />
                </ProtectedRoute>
              }
            />
            <Route
              path="sections"
              element={
                <ProtectedRoute>
                  {" "}
                  <Sections />
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
