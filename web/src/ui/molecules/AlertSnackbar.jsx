import { Alert, Snackbar } from "@mui/material";

const AlertSnackbar = ({
  open,
  handleClose,
  message,
  variant = "filled",
  severity,
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} variant={variant}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;
