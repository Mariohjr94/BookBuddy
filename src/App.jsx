import React from "react";
import { useState, useEffect } from "react";
import bookLogo from "./assets/books.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigations";
import Login from "./components/auth/Login";
import Books from "./components/Books";
import Register from "./components/auth/Register";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div>
      <NavBar token={token} setToken={setToken}></NavBar>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              token={token}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} />} />
      </Routes>
    </div>
  );
}
export default App;
