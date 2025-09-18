import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Input from "../components/Input";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Settings.css";

function Settings() {
  // State to hold input values
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [productInstanceId, setProductInstanceId] = useState("");

  // Load saved settings from localStorage on component mount
    useEffect(() => {
    const savedClientId = localStorage.getItem("x-client-id") || "";
    const savedClientSecret = localStorage.getItem("x-client-secret") || "";
    const savedProductInstanceId = localStorage.getItem("x-product-instance-id") || "";

    setClientId(savedClientId);
    setClientSecret(savedClientSecret);
    setProductInstanceId(savedProductInstanceId);
  }, []);

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
          <Input 
            divClass="settings-input-container" 
            labelClass="settings-label" 
            inputClass="settings-input" 
            type="text" 
            label="X-Client-ID" 
            value={clientId} 
            onChange={setClientId} 
            />
            <Input 
            divClass="settings-input-container" 
            labelClass="settings-label" 
            inputClass="settings-input" 
            type="text" 
            label="X-Client-Secret" 
            value={clientSecret} 
            onChange={setClientSecret} 
            />
            <Input 
            divClass="settings-input-container" 
            labelClass="settings-label" 
            inputClass="settings-input" 
            type="text" 
            label="X-Product-Instance-ID"
            value={productInstanceId} 
            onChange={setProductInstanceId} 
            />
          <button className="settings-btn" type="submit">Update</button>
        </form>

        <ToastContainer position="top-right" autoClose={2000}/>
      </div>
    </div>
  );
}

export default Settings;
