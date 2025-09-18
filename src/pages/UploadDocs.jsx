import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uploadDocument } from "../utils/uploadDocument";
import StepContent from "../components/StepContent";
import Stepper from "../components/Stepper";
import "../styles/UploadDocs.css"

function UploadDocs() {
  const { documentIds, setDocumentIds } = useAppContext();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocId, setUploadedDocId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setErrors(["Please provide both file and name."]);
      return;
    }
    uploadDocument(file, name, setDocumentIds, setErrors, (docId) => {
      toast.success(`Document uploaded successfully! ID: ${docId}`);
      setUploadedDocId(docId);
      setCurrentStep(2); // Move to next step
    });
  };

  return (
    <div className="uploadDocs-container">
    <h2 className="uploadDocs-heading">Upload Document and Create Signature</h2>
     <Stepper className="stepper-container" currentStep={currentStep}/>
    <StepContent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        name={name}
        setFile={setFile}
        setName={setName}
        handleUploadSubmit={handleUploadSubmit}
        errors={errors}
        setErrors={setErrors}
        uploadedDocId={uploadedDocId}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
    />
    <ToastContainer />
    </div>
  );
}

export default UploadDocs;
