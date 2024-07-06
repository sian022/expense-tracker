import { Button, Stack, useMediaQuery } from "@mui/material";
import useDisclosure from "../hooks/useDisclosure";
import ExpensesForm from "../components/expenses/ExpensesForm";
import AllTimeExpenses from "../components/expenses/AllTimeExpenses";
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setIsFormEdit, setSelectedRow } from "../slices/tableSlice";
import { useTheme } from "@emotion/react";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Media query for responsive design
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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

      <Stack gap={2} flex={1}>
        {/* Stack for displaying total expenses and add expense button */}
        <Stack
          direction={!isSmall ? "row" : "column"}
          justifyContent="space-between"
          alignItems="center"
          gap={!isSmall ? 0 : 1}
        >
          {/* AllTimeExpenses component displaying total expenses */}
          <AllTimeExpenses />

          {/* Button to open ExpensesForm modal */}
          <Button
            variant="contained"
            onClick={handleAddExpense}
            endIcon={<Add />}
            size="large"
            fullWidth={!!isSmall}
          >
            {/* {matches && "Add Expense"} */}
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
