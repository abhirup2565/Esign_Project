import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status from "./pages/Status";
import UploadDocs from "./pages/UploadDocs";
import Settings from "./pages/Settings";
import { AppProvider } from "./context/AppContext";
import "./App.css";

function App() {
  return (
    <AppProvider>
    <Router>
      <div style={{display:"flex"}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Status/>} />
          <Route path="/upload" element={<UploadDocs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;