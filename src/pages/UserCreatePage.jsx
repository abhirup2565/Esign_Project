import { useState } from "react";
import { useAppContext } from "../wrappers/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../constants/network";

export default function UserCreatePage() {
  const { access } = useAppContext(); // access token from context/localStorage
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [isManager, setIsManager] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}users/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`, // JWT token
        },
        body: JSON.stringify({
          "username":username,
          "password":password,
          "dob": dob,
          "is_staff": isManager,
        }),
      });

      if (res.ok) {
        toast.success("User created successfully!");
        setUsername("");
        setPassword("");
        setDob("");
        setIsManager(false);
      } else {
        const data = await res.json();
        toast.error(data.detail || "Failed to create user.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2 className="settings-heading">Create User</h2>
        {message && <p className="settings-note">{message}</p>}
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-input-container">
            <label className="settings-label">Username</label>
            <input
              type="text"
              className="settings-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="settings-input-container">
            <label className="settings-label">Password</label>
            <input
              type="password"
              className="settings-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="settings-input-container">
            <label className="settings-label">Date of Birth</label>
            <input
              type="date"
              className="settings-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="settings-input-container">
            <label className="settings-label">
              <input
                type="checkbox"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
              />
              Manager
            </label>
          </div>

          <button type="submit" className="settings-btn">
            Create User
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
