import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uploadDocument } from "../networks/uploadDocument";
import StepContent from "../components/StepContent";
import Stepper from "../components/Stepper";
import Error from "../components/Error";


function UploadDocs() {
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
    uploadDocument(file, name, setErrors, (docId) => {
      toast.success(`Document uploaded successfully! ID: ${docId}`);
      setUploadedDocId(docId);
      setCurrentStep(2); // Move to next step
    });
  };

  return (
    <>
    <h2 className="text-2xl font-bold text-primary mb-6 md:text-3xl">
        Upload File
    </h2>
    <div className="flex min-h-svh w-full items-center justify-center">
    <div className="w-full max-w-sm">
     <Stepper currentStep={currentStep}/>
     <Error errors={errors}/>
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
    </div>
    </>
  );
}

export default UploadDocs;
