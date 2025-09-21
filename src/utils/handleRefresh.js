import refreshSignature from "../networks/refreshSignature";

export const handleRefresh = async (signatureId,
  setSignatures,
  setErrors) => {
  try {
    let allSigned = false;

    while (!allSigned) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before each attempt

      await refreshSignature(signatureId, setErrors, (data) => {
        // Update the signatures state with new status only
        setSignatures(prev => prev.map(sig =>
          sig.signatureId === data.id ? {
            ...sig,
            status:sig.status,
            signers: sig.signers.map(signer => {
              const updatedSigner = data.signers.find(s => s.displayName === signer.name);
              return updatedSigner ? { ...signer, status: updatedSigner.status } : signer;
            })
          } : sig
        ));

        // Check if all signers have signed
        allSigned = data.status === "sign_complete";
      });
    }
     setSignatures(prev =>
      prev.map(sig =>
        sig.signatureId === signatureId ? { ...sig, complete: true, polling: false } : sig
      )
    );

  } catch (error) {
    console.error("Polling error:", error);
    setErrors(prev => [...prev, `Polling error: ${error.message}`]);
  }
};