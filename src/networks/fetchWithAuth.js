const API_BASE = "http://127.0.0.1:8000"; // Django backend

async function fetchWithAuth(url, options = {}) {
  let access = localStorage.getItem("access");

  // Add Authorization header
  options.headers = {
    ...options.headers,
    "Authorization": `Bearer ${access}`,
  };

  let response = await fetch(`${API_BASE}${url}`, options);

  // If token expired, try refreshing
  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");

    const refreshRes = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("access", data.access);

      // Retry original request with new token
      options.headers["Authorization"] = `Bearer ${data.access}`;
      response = await fetch(`${API_BASE}${url}`, options);
    } else {
      // Refresh token also invalid → redirect to login
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }

  return response;
}
