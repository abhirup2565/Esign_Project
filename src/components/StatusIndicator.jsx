import "../styles/StatusIndicator.css"

const StatusIndicator = ({ signatures }) => {
  const totalDocs = signatures.length;
  const completed = signatures.filter(sig => sig.complete).length;
  const incomplete = totalDocs - completed;

  return (
    <div className="status-overview">
      <h2 className="overview-title">Document Status Overview</h2>
      <div className="overview-stats">
        <div className="stat total">
          <span className="stat-label">Total Documents</span>
          <span className="stat-value">{totalDocs}</span>
        </div>
        <div className="stat completed">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completed}</span>
        </div>
        <div className="stat incomplete">
          <span className="stat-label">Incomplete</span>
          <span className="stat-value">{incomplete}</span>
        </div>
      </div>
    </div>
  );
};


export default StatusIndicator;