import { BASE_URL } from "../constants/network";

export default async function LoginRequest(username, password,setError,login)
{
     try {
      const res = await fetch(`${BASE_URL}token/`, {
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
        const userInfo = {
          user_username:data.user_username,
          user_id: data.user_id,
          is_manager: data.is_manager,
        };
        login(userInfo, data.access, data.refresh); //sets value context and local storage
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