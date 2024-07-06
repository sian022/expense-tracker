import { api } from "./api";

const expensesApi = api
  .enhanceEndpoints({
    addTagTypes: ["expenses"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createExpense: builder.mutation({
        query: (body) => ({
          url: "/expenses",
          method: "POST",
          body,
        }),
        invalidatesTags: ["expenses"],
      }),

      getAllExpenses: builder.query({
        query: (params) => ({
          url: "/expenses",
          method: "GET",
          params,
        }),
        providesTags: ["expenses"],
      }),

      updateExpense: builder.mutation({
        query: ({ id, ...body }) => ({
          url: `/expenses/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["expenses"],
      }),

      updateExpenseStatus: builder.mutation({
        query: (id) => ({
          url: `/expenses/${id}`,
          method: "PATCH",
        }),
        invalidatesTags: ["expenses"],
      }),
    }),
  });

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useUpdateExpenseMutation,
  useUpdateExpenseStatusMutation,
} = expensesApi;
