import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import SettingsInput from "../components/SettingsInput";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Settings.css";
import settingsChanged from "../utils/settingsChanged";

function Settings() {
  // State to hold input values
  const [clientId, setClientId] = useState(localStorage.getItem("x-client-id") || "");
  const [clientSecret, setClientSecret] = useState(localStorage.getItem("x-client-secret") || "");
  const [productInstanceId, setProductInstanceId] = useState(localStorage.getItem("x-product-instance-id") || "");
  const [update, setUpdate] = useState(false);

  // Detecting changes
    useEffect(() => {
    settingsChanged(clientId,clientSecret,productInstanceId)?setUpdate(true):setUpdate(false);
  }, [clientId,clientSecret,productInstanceId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("x-client-id", clientId);
    localStorage.setItem("x-client-secret", clientSecret);
    localStorage.setItem("x-product-instance-id", productInstanceId);

    // Show toast notification
    toast.success("Settings updated!");
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2 className="settings-heading">Settings</h2>

      {/* Note */}
      <div className="settings-note">
        <strong>Note:</strong> It is <span className="highlight">not recommended</span> to store sensitive data such as client secrets in localStorage for security reasons. This is done here only for demonstration and assignment purposes.
      </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <SettingsInput 
              label="X-Client-ID" 
              value={clientId} 
              onChange={setClientId} 
            />
            <SettingsInput 
              label="X-Client-Secret" 
              value={clientSecret} 
              onChange={setClientSecret} 
            />
            <SettingsInput 
              label="X-Product-Instance-ID"
              value={productInstanceId} 
              onChange={setProductInstanceId} 
            />
          {update&&(<button className="settings-btn" type="submit">Update</button>)}
        </form>

        <ToastContainer position="top-right" autoClose={2000}/>
      </div>
    </div>
  );
}

export default Settings;
