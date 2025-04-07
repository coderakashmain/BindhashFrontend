import React, { useContext, useState } from 'react'
import {  Snackbar, Alert } from "@mui/material"; 
import { SnackbarContext } from '../../Context/SnackbarContext';

const CustomSnackbar = () => {
    const { snackbar, setSnackbar } = useContext(SnackbarContext);


  

    return (
        <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
  severity={snackbar.type}
  variant="filled"
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  sx={{
    width: '100%',
    bgcolor: snackbar.type === "success" ? "#e6f4ea" :
            snackbar.type === "error" ? "#fdecea" :
            snackbar.type === "warning" ? "#fff4e5" :
            "#e8f0fe",
    color: snackbar.type === "success" ? "#1e4620" :
           snackbar.type === "error" ? "#5f2120" :
           snackbar.type === "warning" ? "#663c00" :
           "#1a73e8",
    border: `1px solid ${
      snackbar.type === "success" ? "#a5d6a7" :
      snackbar.type === "error" ? "#ef9a9a" :
      snackbar.type === "warning" ? "#ffcc80" :
      "#90caf9"
    }`,
    borderRadius: 2,
    boxShadow: 3,
    fontWeight: 500,
    px: 2,
    py: 1.5,
  }}
>
  {snackbar.message}
</Alert>
      </Snackbar>
    );
  };

export default CustomSnackbar
