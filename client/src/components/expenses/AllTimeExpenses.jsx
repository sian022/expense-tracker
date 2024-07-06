import { Card, Typography } from "@mui/material";
import useCurrency from "../../hooks/useCurrency";
import { useSelector } from "react-redux";
import { useGetTotalExpensesQuery } from "../../services/expensesApi";

const AllTimeExpenses = () => {
  // Custom hook to format currency
  // We're passing the amount and the global selected currency
  const currency = useCurrency();
  const selectedCurrency = useSelector((state) => state.currency.currency);

  const { data } = useGetTotalExpensesQuery({ isActive: true });

  // Styles for the Card component
  const cardStyles = {
    padding: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    borderRadius: "15px", // Corrected missing 'px' unit for borderRadius
  };

  return (
    <Card sx={cardStyles}>
      {/* Title for total expenses */}
      <Typography color="secondary.main">All Time Expenses</Typography>

      {/* Display the formatted total expense amount */}
      <Typography fontSize="1.5rem" fontWeight="bold" color="secondary.main">
        {currency(data?.totalExpenses, selectedCurrency)}
      </Typography>
    </Card>
  );
};

export default AllTimeExpenses;
