import React, { useState, createContext } from "react";

export const SnackbarContext = createContext(); // ✅ Correct naming

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });



  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
