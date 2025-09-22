import { Navigate } from "react-router-dom";
import { useAppContext } from "../wrappers/AppContext";

const PublicRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user) {
    // If logged in, redirect to dashboard
    return <Navigate to="/status" replace />;
  }
  return children; // Otherwise show public page
};

export default PublicRoute;