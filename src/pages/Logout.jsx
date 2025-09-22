import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed
}
