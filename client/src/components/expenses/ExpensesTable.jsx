import {
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";
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
import useToast from "../../hooks/useToast";
import useDebounce from "../../hooks/useDebounce";

const ExpensesTable = ({ openForm }) => {
  const dispatch = useDispatch();
  const currency = useCurrency();
  const toast = useToast();
  const debounce = useDebounce();

  // Redux state for selected currency
  const selectedCurrency = useSelector((state) => state.currency.currency);
  // Redux state for selected row
  const selectedRow = useSelector((state) => state.table.selectedRow);

  // Local state for pagination, search, and active status filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [viewMode, setViewMode] = useState("All Expenses");

  const isWeek = viewMode === "Weekly";

  // RTK Query hook to fetch expenses
  const { data, isFetching } = useGetAllExpensesQuery({
    search,
    isActive,
    page: page + 1,
    pageSize: rowsPerPage,
    isWeek,
  });
  const [updateExpenseStatus] = useUpdateExpenseStatusMutation();

  // Calculate average expense amount
  const currentViewAverage =
    data?.expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0) / data?.expenses.length;

  // const allTimeAverage = data?.allTimeAverage || 0;

  // Determine relative cost label, color, and icon for each expense
  const handleRelativeCost = useCallback(
    (amount) => {
      if (amount > currentViewAverage) {
        return {
          label: "More than average",
          color: "error",
          icon: <ArrowUpward sx={{ fontSize: "1.1rem" }} />,
        };
      } else if (amount === currentViewAverage) {
        return {
          label: "Equal to average",
          color: "primary",
          icon: <HorizontalRule sx={{ fontSize: "1.1rem" }} />,
        };
      } else {
        return {
          label: "Less than average",
          color: "success",
          icon: <ArrowDownward sx={{ fontSize: "1.1rem" }} />,
        };
      }
    },
    [currentViewAverage]
  );

  // Handle archive/restore action for each expense
  const handleArchiveRestore = async () => {
    try {
      await updateExpenseStatus(selectedRow?.id).unwrap();

      // Show toast notification
      toast({
        message: `Expense ${isActive ? "archived" : "restored"} successfully`,
        type: "success",
      });
    } catch (error) {
      // Show error toast notification
      toast({
        message: error?.data?.message || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleEdit = () => {
    dispatch(setIsFormEdit(true));
    openForm();
  };

  const currentViewTotal = data?.expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Action buttons for each expense row
  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
      icon: <Edit />,
    },
    {
      label: isActive ? "Archive" : "Restore",
      onClick: handleArchiveRestore,
      icon: isActive ? <Archive /> : <Restore />,
    },
  ];

  return (
    <Stack bgcolor="#fff" borderRadius="15px" flex={1} padding={2} gap={0.5}>
      {/* Search and filter section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={2}>
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
            onChange={(e) => debounce(() => setSearch(e.target.value), 300)}
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

        {/* Total expenses */}
        <Stack direction="row" gap={2} alignItems="center">
          <Typography color="secondary.main">Current View Total</Typography>

          <Typography color="secondary.main" fontWeight={600} fontSize="1.2rem">
            {currency(currentViewTotal, selectedCurrency)}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* View options tabs */}
        <Tabs
          value={viewMode}
          onChange={(_, newValue) => setViewMode(newValue)}
        >
          <Tab value="All Expenses" label="All Expenses" />
          <Tab value="Weekly" label="Weekly" />
        </Tabs>
      </Stack>

      {/* Table section */}
      {isFetching ? (
        <CircularProgress />
      ) : (
        <TableContainer
          sx={{
            // flex: 1,
            maxHeight: "calc(100vh - 200px) !important",
            overflow: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{isWeek ? "Week" : "Date"}</TableCell>
                {!isWeek && <TableCell>Description</TableCell>}
                <TableCell>Amount</TableCell>
                <TableCell>Relative Cost</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table body with expense data */}
            <TableBody>
              {data?.expenses.map((expense, index) => (
                <TableRow
                  key={expense.id || index}
                  onClick={() => {
                    dispatch(setSelectedRow(expense));
                  }}
                >
                  <TableCell>
                    {isWeek
                      ? moment(expense.week, "YYYY-[W]WW").format(
                          "YYYY [Week] WW"
                        )
                      : moment(expense.date).format("MMM DD, YYYY")}
                  </TableCell>
                  {!isWeek && (
                    <TableCell sx={{ fontWeight: "700" }}>
                      {expense.description}
                    </TableCell>
                  )}
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
