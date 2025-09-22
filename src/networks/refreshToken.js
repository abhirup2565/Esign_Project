const refreshToken = async () => {
  const res = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),// Passing refresh token
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("access", data.access);
    return data.access;
  } else {
    // user must login again
    localStorage.clear();
  }
};