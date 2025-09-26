import {fetchWithAuth} from "./fetchWithAuth";

export const userList = async (setErrors) => {

  const requestOptions = {
    method: "GET",
  };

  try {
    const resp = await fetchWithAuth(`users/list/`, requestOptions);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    setErrors([]);  // Clear errors on success
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    setErrors([`An error occurred: ${error}`]);
  }
};