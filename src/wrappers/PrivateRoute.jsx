import { Navigate } from "react-router-dom";
import { useAppContext } from "../wrappers/AppContext";

function PrivateRoute({ children, managerOnly = false }) {
  {
  const { user } = useAppContext();
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // If route is for managers only and user is not a manager
  if (managerOnly && !user.is_manager) {
    return <Navigate to="/status" replace />; // Or any "Unauthorized" page
  }
  return children; // Render the protected component
};
}

export default PrivateRoute;