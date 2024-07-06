import { api } from "./api";

const expensesApi = api
  .enhanceEndpoints({
    addTagTypes: ["expenses", "expensesTotal"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createExpense: builder.mutation({
        query: (body) => ({
          url: "/expenses",
          method: "POST",
          body,
        }),
        invalidatesTags: ["expenses", "expensesTotal"],
      }),

      getAllExpenses: builder.query({
        query: (params) => ({
          url: "/expenses",
          method: "GET",
          params,
        }),
        providesTags: ["expenses"],
      }),

      getTotalExpenses: builder.query({
        query: (params) => ({
          url: "/expenses/total",
          method: "GET",
          params,
        }),
        providesTags: ["expensesTotal"],
      }),

      updateExpense: builder.mutation({
        query: ({ id, ...body }) => ({
          url: `/expenses/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["expenses", "expensesTotal"],
      }),

      updateExpenseStatus: builder.mutation({
        query: (id) => ({
          url: `/expenses/${id}`,
          method: "PATCH",
        }),
        invalidatesTags: ["expenses", "expensesTotal"],
      }),
    }),
  });

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetTotalExpensesQuery,
  useUpdateExpenseMutation,
  useUpdateExpenseStatusMutation,
} = expensesApi;
