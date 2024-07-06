import * as yup from "yup";

export const expenseSchema = yup.object().shape({
  description: yup
    .string()
    .required("Description is required.")
    .typeError("Description must be a string."),
  amount: yup
    .number()
    .required("Amount is required.")
    .typeError("Amount must be a number.")
    .positive("Amount must be greater than zero."),
  date: yup
    .date()
    .required("Date is required.")
    .typeError("Date must be a valid date."),
});
