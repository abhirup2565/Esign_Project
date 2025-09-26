import { useState, useEffect } from "react";
import StatusIndicator from "../components/StatusIndicator";
import { FileText } from "lucide-react";
import Error from "../components/Error";
import { signatureList } from "../networks/signatureList";
import { DataTable } from "../components/data-table";
import { ShimmerStatusIndicator } from "../components/ShimmerStatusIndicator";
import { ShimmerDataTable } from "../components/ShimmerDataTable";

const DashboardPage = () => {
  const [ signatures, setSignatures ] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await signatureList("dashboard/",setErrors);
        setSignatures(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      finally{
        setLoading(false);
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
      <h2 className="text-2xl font-bold text-primary mb-6 md:text-3xl">
        Dashboard Page
      </h2>
      <Error errors={errors}/>
      {loading ? (
      <>
      <ShimmerStatusIndicator/>
      <ShimmerDataTable/>
      </>) : (
      <>
      <StatusIndicator signatures={signatures}/>
      {signatures.length > 0 ? (
        <DataTable data={signatures}/>
      ) : (
        <EmptyTable/>
      )}
    </>
    )}
    </div>
  );
};

const EmptyTable = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <FileText size={64} className="empty-icon" />
      <h3 className="empty-title">No Document Found</h3>
      <p className="empty-subtitle">You don't have any documents yet.</p>
    </div>
  );
};



export default DashboardPage;