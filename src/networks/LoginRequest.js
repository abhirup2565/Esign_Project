export default async function LoginRequest(username, password,setError)
{
     try {
      const res = await fetch("api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      /*
      *if authemtication successful set access and refresh token 
      *return true if authemtication successful else false
      */
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        return true;
      } else {
        setError("Invalid username or password");
        return false;
        }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
      return false;
    }
}