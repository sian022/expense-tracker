import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

import Modal from "../common/Modal";
import currencies from "../../utils/currencies";
import { expenseSchema } from "../../app/schema";

import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "../../services/expensesApi";

const ExpensesForm = ({ open, onClose, isEdit }) => {
  // Retrieve selected currency from Redux store
  const selectedCurrency = useSelector((state) => state.currency.currency);
  // Find details of the selected currency from the currencies list
  const selectedCurrencyDetails = currencies.find(
    (c) => c.currency === selectedCurrency
  );

  // Initialize react-hook-form with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(expenseSchema), // Use Yup resolver for validation
    defaultValues: {
      description: "",
      amount: null,
      date: null,
    },
  });

  // RTK Mutation hook to add new expense
  const [createExpense, { isLoading: isCreateLoading }] =
    useCreateExpenseMutation();
  const [updateExpense, { isLoading: isUpdateLoading }] =
    useUpdateExpenseMutation();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Transform amount to USD value
      const amountUSD = data.amount / selectedCurrencyDetails.conversionRate;

      const transformedData = {
        ...data,
        amount: amountUSD,
      };

      // Call the createExpense mutation if not in edit mode
      if (!isEdit) {
        await createExpense(transformedData).unwrap();
      } else {
        // Call the updateExpense mutation if in edit mode
        // updateExpense({ id: expenseId, data: transformedData });
      }

      onClose(); // Close the modal
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  const currentPrefix = selectedCurrencyDetails.prefix; // Get currency prefix

  // Reset form values when modal is closed
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Modal title="Add New Expense" open={open} onClose={onClose} width="500px">
      <Stack spacing={1.5} component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Description field */}
        <TextField
          label="Description"
          size="small"
          fullWidth
          helperText={errors.description?.message}
          error={!!errors.description}
          {...register("description")}
        />

        {/* Amount field */}
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumericFormat
              label="Amount"
              type="text"
              size="small"
              customInput={TextField}
              onValueChange={(e) => {
                onChange(Number(e.value));
              }}
              onBlur={onBlur}
              value={value || ""}
              inputRef={ref}
              prefix={currentPrefix}
              thousandSeparator=","
              allowNegative={false}
              allowLeadingZeros={false}
            />
          )}
        />

        {/* Date picker */}
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                {...field}
                inputRef={field.ref}
              />
            </LocalizationProvider>
          )}
        />

        {/* Submit button */}
        <Button type="submit" variant="contained" color="primary">
          {isCreateLoading || isUpdateLoading ? <CircularProgress /> : "Submit"}
        </Button>
      </Stack>
    </Modal>
  );
};

export default ExpensesForm;
