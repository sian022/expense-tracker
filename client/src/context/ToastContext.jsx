// ToastContext.js
import { Alert, Snackbar } from "@mui/material";
import { createContext, useState, useCallback } from "react";
import useDisclosure from "../hooks/useDisclosure";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [options, setOptions] = useState({
    message: "",
    type: "success",
  });

  const showToast = useCallback(
    ({ message, type = "success" }) => {
      setOptions({ message, type });
      onOpen();
    },
    [onOpen]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast component */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity={options.type}
          variant="filled"
          sx={{ width: "120%" }}
        >
          {options.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
