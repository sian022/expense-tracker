import currencies from "../utils/currencies";

const useCurrency = () => {
  const formatCurrency = (amount, currency = "USD") => {
    if (!amount && amount !== 0) return null; // Handle undefined or null

    // Find the conversion rate of the selected currency
    const convertedAmount =
      amount * currencies.find((c) => c.currency === currency).conversionRate;

    return convertedAmount.toLocaleString("en-US", {
      style: "currency",
      currency,
    });
  };

  return formatCurrency;
};

export default useCurrency;
