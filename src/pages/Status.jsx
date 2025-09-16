import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import refreshSignature from "../utils/refreshSignature";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Status = () => {
  const { signatures, setSignatures } = useAppContext();
  const [errors, setErrors] = useState([]);

  const handleRefresh = (signatureId) => {
    // Placeholder for refresh logic
    refreshSignature(signatureId, setErrors, (data) => {
    setSignatures(prev => prev.map(sig =>
    sig.signatureId === data.id ? {
      ...sig,
      signers: data.signers.map(signer => ({
        signatureUrl: signer.url,
        status: signer.status,
        name: signer.displayName
      }))
    } : sig
    ));
    toast.success("Signature data refreshed!");
    console.log("Refresh clicked for signature ID:", signatureId);
    })
    // you can fetch updated data and setSignatures here if needed
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Status Page</h2>
    {errors.length > 0 && (
              <div style={{ marginTop: "20px", color: "red" }}>
                <h4>Error:</h4>
                <p>{errors[0]}</p>
              </div>
            )}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Signer Name</th>
            <th>Signer Status</th>
            <th>Signer URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {signatures.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No signatures available</td>
            </tr>
          ) : (
            signatures.map((signatureRecord) =>
              signatureRecord.signers.map((signer, index) => (
                <tr key={`${signatureRecord.signatureId}-${index}`}>
                  <td>{signatureRecord.documentId}</td>
                  <td>{signer.name}</td>
                  <td>{signer.status}</td>
                  <td>
                    <a href={signer.signatureUrl} target="_blank" rel="noopener noreferrer">
                      Link to Sign
                    </a>
                  </td>
                  <td>
                    <button onClick={() => handleRefresh(signatureRecord.signatureId)}>
                      Refresh
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Status;