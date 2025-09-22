import { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [signatures, setSignatures] = useState([]);

  return (
    <AppContext.Provider value={{
      signatures,
      setSignatures
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAppContext = () => useContext(AppContext);