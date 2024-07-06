import {
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
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
  Archive,
  ArrowDownward,
  ArrowUpward,
  Edit,
  HorizontalRule,
  Restore,
  Search,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllExpensesQuery,
  useUpdateExpenseStatusMutation,
} from "../../services/expensesApi";
import Actions from "../common/Actions";
import { setIsFormEdit, setSelectedRow } from "../../slices/tableSlice";

const ExpensesTable = ({ openForm }) => {
  const dispatch = useDispatch();
  const currency = useCurrency();

  // Redux state for selected currency
  const selectedCurrency = useSelector((state) => state.currency.currency);
  // Redux state for selected row
  const selectedRow = useSelector((state) => state.table.selectedRow);

  // Local state for pagination, search, and active status filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(true);

  // RTK Query hook to fetch expenses
  const { data, isFetching } = useGetAllExpensesQuery({
    search,
    isActive,
    page: page + 1,
    pageSize: rowsPerPage,
  });
  const [updateExpenseStatus] = useUpdateExpenseStatusMutation();

  // Calculate average expense amount
  const averageExpense = data?.expenses.reduce((acc, expense) => {
    return (acc + expense.amount) / data?.expenses.length;
  }, 0);

  // Determine relative cost label, color, and icon for each expense
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

  // Handle archive/restore action for each expense
  const handleArchiveRestore = async () => {
    try {
      await updateExpenseStatus(selectedRow?.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // Action buttons for each expense row
  const actions = [
    {
      label: "Edit",
      onClick: () => {
        dispatch(setIsFormEdit(true));
        openForm();
      },
      icon: <Edit />,
    },
    {
      label: isActive ? "Archive" : "Restore",
      onClick: () => handleArchiveRestore(),
      icon: isActive ? <Archive /> : <Restore />,
    },
  ];

  return (
    <Stack bgcolor="#fff" borderRadius="15px" flex={1} padding={2}>
      {/* Search and filter section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          {/* Search input */}
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

          {/* Checkbox to toggle active/inactive expenses */}
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

        {/* View options */}
        <Stack direction="row" spacing={1} alignItems="center">
          View by weekly or all expenses
        </Stack>
      </Stack>

      {/* Table section */}
      {isFetching ? (
        <CircularProgress />
      ) : (
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

            {/* Table body with expense data */}
            <TableBody>
              {data?.expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  onClick={() => {
                    dispatch(setSelectedRow(expense));
                  }}
                >
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
                    {/* Chip indicating relative cost */}
                    <Chip
                      variant="outlined"
                      {...handleRelativeCost(expense.amount)}
                    />
                  </TableCell>

                  {/* Actions column */}
                  <TableCell>
                    <Actions actions={actions} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination section */}
      <TablePagination
        component="div"
        count={data?.expenses.length || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
        rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
      />
    </Stack>
  );
};

export default ExpensesTable;
