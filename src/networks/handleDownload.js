import { fetchWithAuth } from "./fetchWithAuth";

const handleDownload = async (signatureId) => {


  const requestOptions = {
    method: "GET",
    headers: "",
    redirect: "follow"
  };

  try {
    const response = await fetchWithAuth(`download/${signatureId}/`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    if (data.downloadUrl) {
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.rel = 'noopener noreferrer';
      // Note: link is never added to the DOM
      link.click();
    } else {
      console.error("Download URL not found in response.");
    }
  } catch (error) {
    console.error("Download error:", error);
  }
};

export default handleDownload;