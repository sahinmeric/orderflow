import { Snackbar, Alert } from "@mui/material";

type SnackbarNotificationProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
};

const SnackbarNotification = ({
  open,
  onClose,
  message,
  severity = "success",
}: SnackbarNotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
