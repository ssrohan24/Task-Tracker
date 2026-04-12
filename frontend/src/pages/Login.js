import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


import "./Login.css"
import { Link } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.msg || "Error");
    }
  };

  return (
    <div className ="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <p>
            Don't have an account? <Link to="/register">Register</Link>
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;