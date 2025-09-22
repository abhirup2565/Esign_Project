import { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [signatures, setSignatures] = useState([]);
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});
const [access, setAccess] = useState(localStorage.getItem("access")||"");
const [refresh, setRefresh] = useState(localStorage.getItem("refresh")||"");

const login = (userData, accessToken, refreshToken) => {
  setUser(userData);
  setAccess(accessToken);
  setRefresh(refreshToken);

  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("access", accessToken);
  localStorage.setItem("refresh", refreshToken);
};

const logout = () => {
  setUser(null);
  setAccess("");
  setRefresh("");

  localStorage.removeItem("user");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
  return (
    <AppContext.Provider value={{
      signatures,
      setSignatures,
      user,
      setUser,
      access,
      setAccess,
      refresh,
      setRefresh,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAppContext = () => useContext(AppContext);