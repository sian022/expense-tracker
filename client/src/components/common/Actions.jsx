import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRef } from "react";
import useDisclosure from "../../hooks/useDisclosure";

// Actions component to render a menu with actions
// Receives an array of actions with label, onClick function, and optional icon
// Prop Structure: [{ label: "Action 1", onClick: () => {}, icon: <Icon />}]

const Actions = ({ actions = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const anchorRef = useRef();

  return (
    <>
      <IconButton onClick={onOpen} ref={anchorRef}>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorRef.current} open={isOpen} onClose={onClose}>
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick();
              onClose();
            }}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            {action.icon && action.icon}

            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Actions;
