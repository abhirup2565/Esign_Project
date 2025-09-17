import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { handleRefresh} from "../utils/handleRefresh";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import handleDownload from "../utils/handleDownload";

const Status = () => {
  const { signatures, setSignatures } = useAppContext();
  const [errors, setErrors] = useState([]);

useEffect(() => {
    signatures.forEach(signatureRecord => {
      const isAlreadyPolling = signatureRecord.polling;
      const isComplete = signatureRecord.signers.every(signer => signer.status === "signed");

      if (!isAlreadyPolling && !isComplete) {
        // Mark the signature as polling to avoid multiple triggers
        setSignatures(prev =>
          prev.map(sig =>
            sig.signatureId === signatureRecord.signatureId
              ? { ...sig, polling: true }
              : sig
          )
        );

        handleRefresh(signatureRecord.signatureId, setSignatures, setErrors);
      }
    });
  }, [signatures]);

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
            signatures.map((signatureRecord) => {
              const signerCount = signatureRecord.signers.length;
              return signatureRecord.signers.map((signer, index) => (
                <tr key={`${signatureRecord.signatureId}-${index}`}>
                  {index === 0 && (
                    <td rowSpan={signerCount}>{signatureRecord.documentId}</td>
                  )}
                  <td>{signer.name}</td>
                  <td>{signer.status}</td>
                  <td>
                    <a href={signer.signatureUrl} target="_blank" rel="noopener noreferrer">
                      Link to Sign
                    </a>
                  </td>
                  {index === 0 && (
                    <td rowSpan={signerCount}>
                      {signatureRecord.complete && (
                        <button onClick={() => handleDownload(signatureRecord.signatureId,setErrors,toast)}>
                          Download
                        </button>
                      )}
                    </td>
                  )}

                </tr>
              ));
            })
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Status;
