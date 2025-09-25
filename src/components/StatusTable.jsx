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
                            handleDownload(signatureRecord.signature_id, setErrors, toast)
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