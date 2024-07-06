const { Op, fn, col, where } = require("sequelize");
const Expense = require("../models/ExpenseModel");

const ExpenseController = {
  createExpense: async (req, res) => {
    // Create a new expense
    try {
      // Get the data from the request body
      const { amount, description, date } = req.body;

      // Create a new expense
      const expense = await Expense.create({
        amount,
        description,
        date,
      });

      // Send a response
      res.json({
        message: "Expense created successfully",
        expense,
      });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: error.message, status: error.status });
    }
  },

  getAllExpenses: async (req, res) => {
    // Get all expenses
    try {
      const {
        page = 1,
        pageSize = 10,
        search = "",
        isActive,
        isWeek,
        year,
      } = req.query;
      const offset = (page - 1) * pageSize;

      // Set the where condition based on the search query parameter
      const searchCondition = search
        ? {
            [Op.or]: [{ description: { [Op.like]: `%${search}%` } }],
          }
        : {};

      // Compare isActive with isActive column
      const isActiveCondition =
        isActive === "true" || isActive === "false"
          ? {
              isActive: isActive === "true",
            }
          : {};

      // Compare year with date column
      const yearCondition = year
        ? {
            [Op.and]: [
              where(fn("strftime", "%Y", col("date")), year.toString()),
            ],
          }
        : {};

      const whereCondition = {
        ...searchCondition,
        ...isActiveCondition,
        ...yearCondition,
      };

      let expenses;
      let count;
      let totalPages;

      // Get all expenses
      if (isWeek === "true") {
        // Get all expenses grouped by week
        expenses = await Expense.findAndCountAll({
          attributes: [
            [fn("strftime", "%Y-%W", col("date")), "week"],
            [fn("SUM", col("amount")), "amount"],
          ],
          where: whereCondition,
          group: [fn("strftime", "%Y-%W", col("date"))],
          limit: pageSize,
          offset,
          order: [[col("date"), "DESC"]],
        });
        count = expenses.count.length;
        totalPages = Math.ceil(count.length / pageSize);
      } else {
        expenses = await Expense.findAndCountAll({
          where: whereCondition,
          limit: pageSize,
          offset,
          order: [["date", "DESC"]],
        });

        count = expenses.count;
        totalPages = Math.ceil(expenses.count / pageSize);
      }

      // const allTimeAverage = await Expense.findAll({
      //   attributes: [[fn("AVG", col("amount")), "average"]],
      // }).then((result) => {
      //   return result[0].dataValues.average || 0;
      // });

      // Send a response with pagination details
      res.json({
        expenses: expenses.rows,
        totalExpenses: count,
        currentPage: parseInt(page),
        totalPages,
        // allTimeAverage,
      });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: error.message, status: error.status });
    }
  },

  getTotalExpenses: async (req, res) => {
    // Get the total expenses
    try {
      const { isActive } = req.query;

      // Convert isActive to a boolean if it is not undefined
      let whereCondition = {};
      if (isActive !== undefined) {
        whereCondition.isActive = isActive === "true";
      }

      // Get the total expenses
      const totalExpenses = await Expense.sum("amount", {
        where: whereCondition,
      });

      // Send a response
      res.json({ totalExpenses });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: error.message });
    }
  },

  updateExpense: async (req, res) => {
    // Update an expense
    try {
      // Get the expense ID from the request parameters
      const { id } = req.params;

      // Get the data from the request body
      const { amount, description, date } = req.body;

      // Find the expense
      const expense = await Expense.findByPk(id);

      // Check if the expense exists
      if (!expense) {
        const error = new Error("Expense not found");
        error.status = 404;
        throw error;
      }

      // Check if there are no changes
      if (
        expense.amount === amount &&
        expense.description === description &&
        +new Date(expense.date) === +new Date(date)
      ) {
        const error = new Error("No changes detected");
        error.status = 400;
        throw error;
      }

      console.log(+new Date(expense.date) === +new Date(date));

      // Update the expense
      await expense.update({
        amount,
        description,
        date,
      });

      // Send a response
      res.json({
        message: "Expense updated successfully",
        expense,
      });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: error.message });
    }
  },

  updateExpenseStatus: async (req, res) => {
    // Update an expense's status
    try {
      // Get the expense ID from the request parameters
      const { id } = req.params;

      // Find the expense
      const expense = await Expense.findByPk(id);

      // Check if the expense exists
      if (!expense) {
        const error = new Error("Expense not found");
        error.status = 404;
        throw error;
      }

      // Update the expense's status
      await expense.update({
        isActive: !expense.isActive,
      });

      // Send a response
      res.json({
        message: "Expense status updated successfully",
        expense,
      });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: error.message, status: error.status });
    }
  },
};

module.exports = ExpenseController;
