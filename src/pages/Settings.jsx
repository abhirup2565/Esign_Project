import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Settings</h2>

    {/* Note */}
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid red", borderRadius: "5px", backgroundColor: "#ffe6e6" }}>
    <strong>Note:</strong> It is <span style={{ color: "red" }}>not recommended</span> to store sensitive data such as client secrets in localStorage for security reasons. This is done here only for demonstration and assignment purposes.
    </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>X-Client-ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>X-Client-Secret:</label>
          <input
            type="text"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>X-Product-Instance-ID:</label>
          <input
            type="text"
            value={productInstanceId}
            onChange={(e) => setProductInstanceId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Update
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Settings;
