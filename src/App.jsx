import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./pages/Status";
import UploadDocs from "./pages/UploadDocs";
import Settings from "./pages/Settings";
import { AppProvider } from "./wrappers/AppContext";
import PrivateRoute from "./wrappers/PrivateRoute";
import "./App.css";
import LoginPage from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
  return (
    <AppProvider>
    <Router>
      <div style={{display:"flex"}}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>} />
          <Route path="/status" element={<PrivateRoute><Status/></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><UploadDocs/></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;