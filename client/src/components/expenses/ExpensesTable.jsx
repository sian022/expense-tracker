import {
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import useCurrency from "../../hooks/useCurrency";
import {
  ArrowDownward,
  ArrowUpward,
  HorizontalRule,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { dummyExpenses } from "../../utils/dummy";

const ExpensesTable = () => {
  const currency = useCurrency();

  const selectedCurrency = useSelector((state) => state.currency.currency);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(true);

  const averageExpense = dummyExpenses.reduce((acc, expense) => {
    return (acc + expense.amount) / dummyExpenses.length;
  }, 0);

  // Handle Chip
  const handleRelativeCost = (amount) => {
    if (amount > averageExpense) {
      return {
        label: "More than average",
        color: "error",
        icon: <ArrowUpward />,
      };
    } else if (amount === averageExpense) {
      return {
        label: "Equal to average",
        color: "primary",
        icon: <HorizontalRule />,
      };
    } else {
      return {
        label: "Less than average",
        color: "success",
        icon: <ArrowDownward />,
      };
    }
  };

  return (
    <Stack bgcolor="#fff" borderRadius="15px" flex={1} padding={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          <TextField
            type="search"
            size="small"
            placeholder="Search description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={!isActive}
                onChange={(e) => setIsActive(!e.target.checked)}
              />
            }
            label="Show Inactive"
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          View by weekly or all expenses
        </Stack>
      </Stack>

      <TableContainer sx={{ flex: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Relative Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {moment(expense.date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }}>
                  {expense.description}
                </TableCell>
                <TableCell>
                  {currency(expense.amount, selectedCurrency)}
                </TableCell>
                <TableCell>
                  <Chip
                    variant="outlined"
                    {...handleRelativeCost(expense.amount)}
                  />
                </TableCell>

                <TableCell>
                  <IconButton color="primary">
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={dummyExpenses.length || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      />
    </Stack>
  );
};

export default ExpensesTable;
