import {
  Box,
  IconButton,
  Modal as MuiModal,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const Modal = ({
  children,
  open,
  onClose,
  width = 400,
  title = "Title",
  ...props
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MuiModal open={open} onClose={onClose} {...props}>
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontFamily="Montserrat" fontWeight="500">
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
