import { Button, Stack } from "@mui/material";
import useDisclosure from "../hooks/useDisclosure";
import ExpensesForm from "../components/expenses/ExpensesForm";
import AllTimeExpenses from "../components/expenses/AllTimeExpenses";
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setIsFormEdit, setSelectedRow } from "../slices/tableSlice";

const ExpensesPage = () => {
  const dispatch = useDispatch();

  // Custom hook for managing modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddExpense = () => {
    dispatch(setIsFormEdit(false));
    dispatch(setSelectedRow(null));
    onOpen();
  };

  return (
    <>
      {/* ExpensesForm component for adding/editing expenses */}
      <ExpensesForm open={isOpen} onClose={onClose} />

      <Stack spacing={2} flex={1}>
        {/* Stack for displaying total expenses and add expense button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* AllTimeExpenses component displaying total expenses */}
          <AllTimeExpenses />

          {/* Button to open ExpensesForm modal */}
          <Button
            variant="contained"
            onClick={handleAddExpense}
            endIcon={<Add />}
            size="large"
          >
            Add Expense
          </Button>
        </Stack>

        {/* ExpensesTable component displaying list of expenses */}
        <ExpensesTable openForm={onOpen} />
      </Stack>
    </>
  );
};

export default ExpensesPage;
