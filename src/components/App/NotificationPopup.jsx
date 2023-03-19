import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

export default function NotificationPopup({ setSnackbarMessage, snackbarMessage }) {
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarMessage(null);
    };
      

    return (
        <Snackbar open={!!snackbarMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleClose} severity={snackbarMessage?.severity} sx={{ width: '100%' }}>
                {snackbarMessage?.message}
            </Alert>
        </Snackbar>
    );
};