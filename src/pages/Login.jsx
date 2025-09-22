import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../wrappers/AppContext";
import LoginRequest from "../networks/LoginRequest";
import "../styles/Login.css"

export default function LoginPage() {
  const {login} = useAppContext()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await LoginRequest(username, password, setError,login);
    if (success) navigate("/status"); 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-container">
            <label className="login-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="login-input-container">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

