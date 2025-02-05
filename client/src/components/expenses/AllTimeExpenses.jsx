import { Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import useCurrency from "../../hooks/useCurrency";
import { useSelector } from "react-redux";
import { useGetTotalExpensesQuery } from "../../services/expensesApi";
import { useTheme } from "@emotion/react";

const AllTimeExpenses = () => {
  const theme = useTheme();

  // Media query for responsive design
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Custom hook to format currency
  // We're passing the amount and the global selected currency
  const currency = useCurrency();
  const selectedCurrency = useSelector((state) => state.currency.currency);

  const { data, isFetching } = useGetTotalExpensesQuery({ isActive: true });

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
      width={!isSmall ? "auto" : "100%"}
    >
      {/* Display the formatted total expense amount */}
      {isFetching ? (
        <Skeleton width="80%" sx={{ transform: "none" }} height="18px" />
      ) : (
        <Typography
          fontSize="1.5rem"
          fontWeight="bold"
          color="secondary.main"
          textAlign="center"
          width="100%"
          letterSpacing="1px"
          lineHeight="80%"
        >
          {currency(data?.totalExpenses || 0, selectedCurrency)}
        </Typography>
      )}

      {/* Title for total expenses */}
      {isFetching ? (
        <Skeleton width="70%" sx={{ transform: "none" }} height="13px" />
      ) : (
        <Typography color="secondary.main" fontSize="0.95rem" lineHeight="80%">
          All Time Expenses
        </Typography>
      )}
    </Stack>
  );
};

export default AllTimeExpenses;
