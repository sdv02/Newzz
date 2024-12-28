import { IconButton, Snackbar, Button, Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

function SignupDialog() {
  const [openDialog, setOpenDialog] = useState(true);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const goToSignup = () => {};

  const action = (
    <Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Snackbar
      open={openDialog}
      autoHideDuration={5000}
      onClose={handleClose}
      message="Signup for free and customize your feed!"
      action={action}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{ background: "#d9d7d782", height: "50px", width: "100px" }}
    />
  );
}

export default SignupDialog;
