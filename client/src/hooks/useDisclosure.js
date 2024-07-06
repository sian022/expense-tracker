import { useState } from "react";

// Custom hook for managing the state of a modal or dialog box.
const useDisclosure = () => {
  // State to track whether the modal/dialog is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal/dialog
  const onOpen = () => {
    setIsOpen(true);
  };

  // Function to close the modal/dialog
  const onClose = () => {
    setIsOpen(false);
  };

  // Function to toggle the modal/dialog state (open/close)
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  // Return state and functions to control modal/dialog state
  return {
    isOpen, // Boolean indicating whether the modal/dialog is open
    onOpen, // Function to open the modal/dialog
    onClose, // Function to close the modal/dialog
    onToggle, // Function to toggle the modal/dialog state
  };
};

export default useDisclosure;
