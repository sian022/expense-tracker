import ExpensesForm from "../components/expenses/ExpensesForm";
import useDisclosure from "../hooks/useDisclosure";

const ExpensesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ExpensesForm open={true} onClose={onClose} />
    </>
  );
};

export default ExpensesPage;
