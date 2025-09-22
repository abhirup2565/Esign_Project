import { BASE_URL } from "../constants/network";
export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    return null;
  }

  const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } else {
    // Refresh token invalid → force logout
    window.location.href = "/logout";
    return null;
  }
}