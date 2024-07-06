import currencies from "../utils/currencies";

const useCurrency = () => {
  // Function to format amount into selected currency
  const formatCurrency = (amount, currency = "USD") => {
    // Handle undefined or null amounts
    if (!amount && amount !== 0) return null;

    // Find the conversion rate of the selected currency
    const convertedAmount =
      amount * currencies.find((c) => c.currency === currency).conversionRate;

    console.log(convertedAmount);

    // Format the converted amount as currency with US locale
    return convertedAmount.toLocaleString("en-US", {
      style: "currency",
      currency,
    });
  };

  // Return the formatCurrency function for use in components
  return formatCurrency;
};

export default useCurrency;
