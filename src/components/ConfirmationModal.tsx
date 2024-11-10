import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmationModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={3}>
          {title}
        </Typography>
        <Typography variant="body1" mb={3}>
          {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
