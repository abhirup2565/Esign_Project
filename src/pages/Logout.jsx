import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../wrappers/AppContext"

export default function Logout() {
  const navigate = useNavigate();
  const {logout} = useAppContext()

  useEffect(() => {
    // Clear tokens from localStorage and context
    logout()
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed
}
