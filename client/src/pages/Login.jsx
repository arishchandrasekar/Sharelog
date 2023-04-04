import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("Wrong Credentials");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
