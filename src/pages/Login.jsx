import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequest from "../networks/LoginRequest";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await LoginRequest(username, password, setError);
    if (success) navigate("/status"); 
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
      >
        <h2 >Login</h2>
        {error && <p className="">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=""
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
          required
        />
        <button
          type="submit"
          className=""
        >
          Login
        </button>
      </form>
    </div>
  );
}
