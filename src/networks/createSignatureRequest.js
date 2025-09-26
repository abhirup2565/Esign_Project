import { fetchWithAuth } from "./fetchWithAuth";

const createSignatureRequest = async (documentId, selectedUsers, setErrors, onSuccess) => {

  const signers = selectedUsers.map((selectedUser) => {
    return {
      identifier: String(selectedUser.identifier),
      displayName: selectedUser.displayName,
      birthYear: String(selectedUser.birthYear),
      signature: {
        height: 60,
        width: 180,
        position: "bottom-left",
        onPages: ["1"]
      }
    };
  });

  const raw = JSON.stringify({
    documentId,
    redirectUrl: "http://setu.co",//change to base url later
    signers
  });

  const requestOptions = {
    method: "POST",
    headers:{
    "Content-Type": "application/json"
    },
    body: raw,
    redirect: "follow"
  };

  try {
    const resp = await fetchWithAuth(`signature/`, requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    setErrors([]); // Clear errors on success
    onSuccess(data); // Call the provided callback
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors(prev => [...prev, `An error occurred: ${error.message}`]);
  }
};

export default createSignatureRequest;
