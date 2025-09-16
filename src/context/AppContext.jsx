import { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [documentIds, setDocumentIds] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [statusList, setStatusList] = useState([]);

  return (
    <AppContext.Provider value={{
      documentIds,
      setDocumentIds,
      signatures,
      setSignatures,
      statusList,
      setStatusList
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAppContext = () => useContext(AppContext);