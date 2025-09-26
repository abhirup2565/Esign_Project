import  createSignatureRequest  from "../networks/createSignatureRequest";
import { useAppContext } from "../wrappers/AppContext";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

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
    <Button className="w-full"
      onClick={handleClick}
    >
      Create Signature Request
    </Button>
  );
};

export default CreateSignatureButton;