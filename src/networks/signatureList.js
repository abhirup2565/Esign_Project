import {fetchWithAuth} from "./fetchWithAuth";

export const signatureList = async (url,setErrors) => {

  const requestOptions = {
    method: "GET",
  };

  try {
    const resp = await fetchWithAuth(url, requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    setErrors([]);  // Clear errors on success
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors([error.message || "Network request failed"]);
    return [];
  }
};