import { useState } from "react";

// This custom hook is used to manage the state of a modal or a dialog box.
// It returns an object with isOpen, onOpen, onClose, and onToggle functions.
// Usage: const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
