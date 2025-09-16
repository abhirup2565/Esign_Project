import { getHeaders } from "./getHeaders";

const refreshSignature = async (signatureId, setErrors, onSuccess) => {
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const resp = await fetch(`/api/signature/${signatureId}`, requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    setErrors([]); // Clear previous errors
    onSuccess(data); // Call the success callback with the data
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors((prev) => [...prev, `An error occurred: ${error.message}`]);
  }
};

export default refreshSignature;
