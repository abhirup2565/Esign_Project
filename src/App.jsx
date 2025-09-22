import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./pages/Status";
import UploadDocs from "./pages/UploadDocs";
import Settings from "./pages/Settings";
import { AppProvider } from "./wrappers/AppContext";
import PrivateRoute from "./wrappers/PrivateRoute";
import PublicRoute from "./wrappers/PublicRoute";
import "./App.css";
import LoginPage from "./pages/Login";
import Logout from "./pages/Logout";
import HomePage from "./pages/Home";


function App() {
  return (
    <AppProvider>
    <Router>
      <div style={{display:"flex"}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>} />
          <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>} />
          <Route path="/status" element={<PrivateRoute><Status/></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute managerOnly={true}><UploadDocs/></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute managerOnly={true}><Settings/></PrivateRoute>} />
          {/* Catch all: custom error page */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;