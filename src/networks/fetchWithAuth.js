import { BASE_URL } from "../constants/network";
import { refreshToken } from "./refreshToken";

export async function fetchWithAuth(url, options = {}) {
  let access = localStorage.getItem("access");

  try{
  // Add Authorization header
  options.headers = {
    ...options.headers,
    "Authorization": `Bearer ${access}`,
  };

  let response = await fetch(`${BASE_URL}${url}`, options);

  // If token expired, try refreshing
  if (response.status === 401) 
  {
    const newAccess = await refreshToken();
    // Retry original request with new token
    if (newAccess)
    {
      options.headers["Authorization"] = `Bearer ${newAccess}`;
      response = await fetch(`${BASE_URL}${url}`, options);
    }
  }

  return response;
} catch (error) {
    console.error("fetchWithAuth error:", error);
    // Re-throw so the caller (e.g. signatureList) can decide what to do
    throw new Error(error.message || "Network request failed");
  }
}

