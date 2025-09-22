import { getHeaders } from "./getHeaders";
import { BASE_URL } from "../constants/network";

const handleDownload = async (signatureId, setErrors, toast) => {
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${BASE_URL}documents/${signatureId}/`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.downloadUrl) {
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.rel = 'noopener noreferrer';
      // Note: link is never added to the DOM
      link.click();
      toast.success("Downloading started!");
    } else {
      setErrors(prev => [...prev, "Download URL not found in response."]);
    }
  } catch (error) {
    console.error("Download error:", error);
    setErrors(prev => [...prev, `Download error: ${error.message}`]);
  }
};

export default handleDownload;