import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        setUserInfo({ info });
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <header>
      <Link to="/" className="logo">
        SHARELOG
      </Link>
      <nav>
        {userInfo && (
          <>
            <Link to="/create">New Post</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </>
        )}
        {!userInfo && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
