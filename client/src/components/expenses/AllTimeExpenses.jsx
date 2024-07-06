import { Stack, Typography } from "@mui/material";
import useCurrency from "../../hooks/useCurrency";
import { useSelector } from "react-redux";
import { useGetTotalExpensesQuery } from "../../services/expensesApi";
import { useTheme } from "@emotion/react";

const AllTimeExpenses = () => {
  const theme = useTheme();

  // Custom hook to format currency
  // We're passing the amount and the global selected currency
  const currency = useCurrency();
  const selectedCurrency = useSelector((state) => state.currency.currency);

  const { data } = useGetTotalExpensesQuery({ isActive: true });

  return (
    <Stack
      padding={2}
      gap={2}
      // justifyContent="space-between"
      alignItems="center"
      borderRadius="15px"
      bgcolor="white"
      border={`1px solid ${theme.palette.secondary.main}`}
      minWidth="200px"
    >
      {/* Display the formatted total expense amount */}
      <Typography
        fontSize="1.5rem"
        fontWeight="bold"
        color="secondary.main"
        textAlign="center"
        width="100%"
        letterSpacing="1px"
        lineHeight="80%"
      >
        {currency(data?.totalExpenses, selectedCurrency)}
      </Typography>

      {/* Title for total expenses */}
      <Typography color="secondary.main" fontSize="0.95rem" lineHeight="80%">
        All Time Expenses
      </Typography>
    </Stack>
  );
};

export default AllTimeExpenses;
