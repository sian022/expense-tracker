import { useState, useCallback } from "react";
import {
  Checkbox,
  Chip,
  InputAdornment,
  Skeleton,
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
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
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
import useCurrency from "../../hooks/useCurrency";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TableContainerSkeleton from "./TableContainerSkeleton";

const ExpensesTable = ({ openForm }) => {
  const dispatch = useDispatch();
  const currency = useCurrency();
  const toast = useToast();
  const debounce = useDebounce();

  // State for year filter
  const [year, setYear] = useState(null);

  // Media query for responsive design
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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

  // Determine if view mode is weekly
  const isWeek = viewMode === "Weekly";

  // Fetch expenses data using RTK Query hook
  const { data, isFetching } = useGetAllExpensesQuery({
    search,
    isActive,
    page: page + 1, // RTK Query page indexing starts at 1
    pageSize: rowsPerPage,
    isWeek,
    year: year ? year : "",
  });
  const [updateExpenseStatus] = useUpdateExpenseStatusMutation();

  // Calculate average expense amount for the current view
  const currentViewAverage =
    data?.expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0) / data?.expenses.length;

  // Handle relative cost label, color, and icon based on expense amount relative to average
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

  // Handle archive/restore action for the selected expense
  const handleArchiveRestore = async () => {
    try {
      await updateExpenseStatus(selectedRow?.id).unwrap();

      // Show success toast notification
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

  // Handle edit action for the selected expense
  const handleEdit = () => {
    dispatch(setIsFormEdit(true));
    openForm();
  };

  // Calculate total amount of expenses in the current view
  const currentViewTotal =
    data?.expenses.reduce((acc, expense) => acc + expense.amount, 0) || 0;

  // Actions available for each expense row
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Stack
          direction="row"
          gap={2}
          justifyContent={isSmall ? "space-between" : "flex-start"}
          width={isSmall ? "100%" : "auto"}
        >
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

          {/* Date Picker for filtering by year */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              slotProps={{
                textField: {
                  size: "small",
                  sx: { minWidth: "100px", width: "100px" },
                },
                actionBar: {
                  actions: ["today", "clear"],
                },
              }}
              views={["year"]}
              label="Year"
              onChange={(date) => setYear(date?.format("YYYY"))}
              value={year ? moment(year, "YYYY") : null}
            />
          </LocalizationProvider>

          {/* Checkbox to toggle active/inactive expenses */}
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={!isActive}
              onChange={(e) => setIsActive(!e.target.checked)}
            />

            {isSmall ? <Archive /> : <Typography>Archived</Typography>}
          </Stack>
        </Stack>

        {/* Total expenses */}
        {!isSmall && (
          <Stack direction="row" gap={2} alignItems="center">
            {/* Skeletons for loading state */}
            {!isMedium && isFetching && (
              <Skeleton width="140px" sx={{ transform: "none" }} />
            )}

            {!isMedium && !isFetching && (
              <Typography color="secondary.main">Current View Total</Typography>
            )}

            {isFetching ? (
              <Skeleton width="100px" sx={{ transform: "none" }} />
            ) : (
              <Typography
                color="secondary.main"
                fontWeight={700}
                fontSize="1.2rem"
              >
                {currency(currentViewTotal, selectedCurrency)}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>

      {/* View mode options */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={isSmall ? "center" : "space-between"}
        gap={2}
      >
        {/* Tabs for switching between All Expenses and Weekly view */}
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
        // Loading skeleton while fetching data
        <TableContainerSkeleton />
      ) : (
        <TableContainer
          sx={{
            flex: isSmall ? 1 : "auto",
            height: "calc(100vh - 440px)", // Adjust height based on screen size
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
                {!isWeek && <TableCell>Actions</TableCell>}
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
                  {!isWeek && (
                    <TableCell>
                      <Actions actions={actions} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination section */}
      <TablePagination
        component="div"
        count={data?.totalExpenses || 0}
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
