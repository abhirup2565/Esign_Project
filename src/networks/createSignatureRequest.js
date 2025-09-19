import { getHeaders } from "./getHeaders";
import { users } from "../constants/users";

const createSignatureRequest = async (documentId, selectedUsers, setErrors, onSuccess) => {
  const myHeaders = getHeaders();
  myHeaders.append("Content-Type", "application/json");

  const signers = selectedUsers.map(({ identifier }) => {
    const user = users.find(u => u.identifier === identifier);
    return {
      identifier: user.identifier,
      displayName: user.displayName,
      birthYear: user.birthYear,
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
    redirectUrl: "http://setu.co",
    signers
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const resp = await fetch("/api/signature", requestOptions);
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
