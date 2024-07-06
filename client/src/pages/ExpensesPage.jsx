import { Button, Stack } from "@mui/material";
import useDisclosure from "../hooks/useDisclosure";
import ExpensesForm from "../components/expenses/ExpensesForm";
import ExpensesTotal from "../components/expenses/ExpensesTotal";
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Add } from "@mui/icons-material";

const ExpensesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ExpensesForm open={isOpen} onClose={onClose} />

      <Stack spacing={2} flex={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ExpensesTotal />

          <Button variant="contained" onClick={onOpen} endIcon={<Add />}>
            Add Expense
          </Button>
        </Stack>

        <ExpensesTable />
      </Stack>
    </>
  );
};

export default ExpensesPage;
