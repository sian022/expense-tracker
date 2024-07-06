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
import moment from "moment";
import useToast from "../../hooks/useToast";

const ExpensesForm = ({ open, onClose }) => {
  const toast = useToast(); // Use the custom toast hook

  // Retrieve selected currency from Redux store
  const selectedCurrency = useSelector((state) => state.currency.currency);
  // Find details of the selected currency from the currencies list
  const selectedCurrencyDetails = currencies.find(
    (c) => c.currency === selectedCurrency
  );
  // Check if the form is in edit mode
  const isEdit = useSelector((state) => state.table.isFormEdit);
  // Selected Row Data
  const selectedRow = useSelector((state) => state.table.selectedRow);

  // Initialize react-hook-form with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(expenseSchema), // Use Yup resolver for validation
    defaultValues: {
      description: "",
      amount: null,
      date: null,
    },
  });

  // RTK Mutation hooks to add and update expense
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
        updateExpense({ id: selectedRow?.id, ...transformedData }).unwrap();
      }

      toast({
        message: `Expense ${isEdit ? "updated" : "added"} succesfully`,
        type: "success",
      });
      onClose(); // Close the modal
    } catch (error) {
      console.log(error); // Log any errors
      toast({
        message: error?.data?.message || "An error occurred. Please try again",
        type: "error",
      });
    }
  };

  const currentPrefix = selectedCurrencyDetails.prefix; // Get currency prefix

  // Reset form values when modal is closed
  useEffect(() => {
    if (!open) {
      reset();
    } else {
      // Set default values when in edit mode
      if (isEdit) {
        setValue("description", selectedRow?.description);
        setValue(
          "amount",
          selectedRow?.amount * selectedCurrencyDetails.conversionRate
        );
        setValue("date", moment(selectedRow?.date));
      }
    }
  }, [open, reset, isEdit, selectedRow, setValue, selectedCurrencyDetails]);

  return (
    <Modal
      title={isEdit ? "Update Expense" : "Add New Expense"}
      open={open}
      onClose={onClose}
      width="500px"
      responsiveBreakpoint={600}
    >
      <Stack gap={1.5} component="form" onSubmit={handleSubmit(onSubmit)}>
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
              decimalScale={2}
              error={!!errors.amount}
              helperText={errors.amount?.message}
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
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.date,
                    helperText: errors.date?.message,
                  },
                }}
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
