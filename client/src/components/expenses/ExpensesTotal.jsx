import { Card, Typography } from "@mui/material";
import useCurrency from "../../hooks/useCurrency";
import { useSelector } from "react-redux";

const ExpensesTotal = ({ total = 0 }) => {
  // Custom hook to format currency
  // We're passing the amount and the global selected currency
  const currency = useCurrency();
  const selectedCurrency = useSelector((state) => state.currency.currency);

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
      <Typography color="secondary.main">Total Expenses</Typography>

      {/* Display the formatted total expense amount */}
      <Typography fontSize="1.5rem" fontWeight="bold" color="secondary.main">
        {currency(total, selectedCurrency)}
      </Typography>
    </Card>
  );
};

export default ExpensesTotal;
