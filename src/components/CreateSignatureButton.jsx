import  createSignatureRequest  from "../networks/createSignatureRequest";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const CreateSignatureButton = ({
  uploadedDocId,
  selectedUsers,
  setErrors,
  setCurrentStep
}) => {
    const { signatures, setSignatures } = useAppContext();
  const handleClick = () => {
    if (!selectedUsers.length) {
      setErrors(["Please select at least one user."]);
      return;
    }

    createSignatureRequest(
      uploadedDocId,
      selectedUsers,
      setErrors,
      (data) => {
        toast.success("Signature request created successfully!");
        console.log("Signature request response:", data);
        setSignatures(prev => [...prev, {
            signatureId: data.id,
            documentId: data.documentId,
            status: data.status,
            signers: data.signers.map(signer => ({
            signatureUrl: signer.url,
            status: signer.status,
            name: signer.displayName
            }))
        }]);
    setCurrentStep(3);
      }
    );
  };

  return (
    <button
      style={{ marginTop: "20px", padding: "10px 20px" }}
      onClick={handleClick}
    >
      Create Signature Request
    </button>
  );
};

export default CreateSignatureButton;