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
import { statusList } from "../networks/statusList";
import { DataTable } from "../components/data-table";

const Status = () => {
  const [ signatures, setSignatures ] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await statusList(setErrors);
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

  return (
    <div>
      <h2 className="status-heading">Status Page</h2>
      <Error errors={errors}/>
      <StatusIndicator signatures={signatures}/>
      {signatures.length>0?(<DataTable data={signatures}/>):<EmptyTable/>}
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

export default Status;
