import { Button, Stack } from "@mui/material";
import useDisclosure from "../hooks/useDisclosure";
import ExpensesForm from "../components/expenses/ExpensesForm";
import ExpensesTotal from "../components/expenses/ExpensesTotal";
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Add } from "@mui/icons-material";

const ExpensesPage = () => {
  // Custom hook for managing modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Dummy total for expenses
  const total = 2000;

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
          {/* ExpensesTotal component displaying total expenses */}
          <ExpensesTotal total={total} />

          {/* Button to open ExpensesForm modal */}
          <Button
            variant="contained"
            onClick={onOpen}
            endIcon={<Add />}
            size="large"
          >
            Add Expense
          </Button>
        </Stack>

        {/* ExpensesTable component displaying list of expenses */}
        <ExpensesTable />
      </Stack>
    </>
  );
};

export default ExpensesPage;
