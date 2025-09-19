import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { handleRefresh} from "../utils/handleRefresh";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import handleDownload from "../networks/handleDownload";
import StatusIndicator from "../components/StatusIndicator";
import { FileText } from "lucide-react";
import { FaDownload, FaLink } from "react-icons/fa";
import "../styles/Status.css"
import Error from "../components/Error";

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
    <div className="status-page">
      <h2 className="status-heading">Status Page</h2>
      <Error errors={errors}/>
      <StatusIndicator signatures={signatures}/>
      {signatures.length>0?(<StatusTable signatures={signatures} setErrors={setErrors}/>):<EmptyTable/>}
      <ToastContainer />
    </div>
  );
};

const EmptyTable = () => {
  return (
    <div className="empty-table">
      <FileText size={64} className="empty-icon" />
      <h3 className="empty-title">No Document Found</h3>
      <p className="empty-subtitle">You don't have any documents yet.</p>
    </div>
  );
};

const StatusTable = ({ signatures, setErrors }) => {
  const getStatusBadge = (status) => {
    let className = "status-badge";
    if (status === "signed") className += " signed";
    else if (status === "pending") className += " pending";
    else className += " other";

    return <span className={className}>{status}</span>;
  };

  return (
    <div className="status-table-card">
      <h3 className="status-table-heading">Document Signatures</h3>

      <table className="status-table">
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Signer Name</th>
            <th>Signer Status</th>
            <th>Signer URL</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {
            signatures.map((signatureRecord) => {
              const signerCount = signatureRecord.signers.length;
              return signatureRecord.signers.map((signer, index) => (
                <tr key={`${signatureRecord.signatureId}-${index}`}>
                  {index === 0 && (
                    <td rowSpan={signerCount} className="doc-id">
                      {signatureRecord.documentId}
                    </td>
                  )}
                  <td>{signer.name}</td>
                  <td>{getStatusBadge(signer.status)}</td>
                  <td>
                    <a
                      href={signer.signatureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon"
                    >
                      <FaLink />
                    </a>
                  </td>
                  {index === 0 && (
                    <td rowSpan={signerCount} className="action-cell">
                      {signatureRecord.complete && (
                        <button
                          onClick={() =>
                            handleDownload(signatureRecord.signatureId, setErrors, toast)
                          }
                          className="download-btn"
                        >
                          <FaDownload />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ));
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Status;
