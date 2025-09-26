import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./wrappers/AppContext";
import PrivateRoute from "./wrappers/PrivateRoute";
import PublicRoute from "./wrappers/PublicRoute";
import Status from "./pages/Status";
import UploadDocs from "./pages/UploadDocs";
import LoginPage from "./pages/Login";
import Logout from "./pages/Logout";
import HomePage from "./pages/Home";
import UserCreatePage from "./pages/UserCreatePage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
      <Layout>
        <ModeToggle/>
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>} />
          <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>} />
          <Route path="/status" element={<PrivateRoute><Status/></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
          <Route path="/create-user" element={<PrivateRoute managerOnly={true}><UserCreatePage/></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute managerOnly={true}><UploadDocs/></PrivateRoute>} />
          {/* Catch all: custom error page */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
    </Layout>
    </ThemeProvider>
    </AppProvider>
  );
}

export default App;