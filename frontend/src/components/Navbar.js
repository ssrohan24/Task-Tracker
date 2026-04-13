import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3>Project Tracker</h3>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;