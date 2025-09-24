import { useState, useEffect } from "react";
//import { useAppContext } from "../wrappers/AppContext";
import { handleRefresh} from "../utils/handleRefresh";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import handleDownload from "../networks/handleDownload";
import StatusIndicator from "../components/StatusIndicator";
import { FileText } from "lucide-react";
import { FaDownload, FaLink } from "react-icons/fa";
import "../styles/Status.css"
import Error from "../components/Error";
import { dashboardList } from "../networks/dashboardList";

const DashboardPage = () => {
  const [ signatures, setSignatures ] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dashboardList(setErrors);
        setSignatures(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    // fetch immediately
    fetchData();
    // set up polling
    const interval = setInterval(fetchData, 5000);
    // cleanup on unmount
    return () => clearInterval(interval); 
  }, [setErrors, setSignatures]);

//   useEffect(() => {
//    const fetch = async () => {
//     try {
//       const data = await dashboardList(setErrors);
//       setSignatures(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//     };
//     fetch()
//     },[setErrors]);

// useEffect(() => {
//     signatures.forEach(signatureRecord => {
//       const isAlreadyPolling = signatureRecord.polling;
//       const isComplete = signatureRecord.status === "sign_complete";

//       if (!isAlreadyPolling && !isComplete) {
//         // Mark the signature as polling to avoid multiple triggers
//         setSignatures(prev =>
//           prev.map(sig =>
//             sig.signature_id === signatureRecord.signature_id
//               ? { ...sig, polling: true }
//               : sig
//           )
//         );

//         handleRefresh(signatureRecord.signature_id, setSignatures, setErrors);
//       }
//     });
//     console.log(signatures);
//   }, [signatures]);

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
                      {signatureRecord.document_id}
                    </td>
                  )}
                  <td>{signer.username}</td>
                  <td>{getStatusBadge(signer.status)}</td>
                  <td>
                    <a
                      href={signer.signer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon"
                    >
                      <FaLink />
                    </a>
                  </td>
                  {index === 0 && (
                    <td rowSpan={signerCount} className="action-cell">
                      {signatureRecord.status==="sign_complete" && (
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

export default DashboardPage;
