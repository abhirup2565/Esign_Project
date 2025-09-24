import {fetchWithAuth} from "./fetchWithAuth";

export const statusList = async (setErrors) => {

  const requestOptions = {
    method: "GET",
  };

  try {
    const resp = await fetchWithAuth(`status/`, requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    console.log(`Users List Fetched`);
    setErrors([]);  // Clear errors on success
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors([`An error occurred: ${error}`]);
  }
};