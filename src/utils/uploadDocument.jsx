import { getHeaders } from "./getHeaders";

export const uploadDocument = async (file, name, setDocumentIds, setErrors,onSuccess) => {
  const myHeaders = getHeaders();

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("document", file, file.name);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  try {
    const resp = await fetch("/api/documents", requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    console.log(`updated document ID: ${data.id}`);
    setErrors([]);  // Clear errors on success
    setDocumentIds(prev => [...prev, data.id]);
    onSuccess(data.id)
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors([`An error occurred: ${error.message}`]);
  }
};