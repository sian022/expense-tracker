const { Op } = require("sequelize");
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
      res.status(500).json({ error: error.message, status: error.status });
    }
  },

  getAllExpenses: async (req, res) => {
    // Get all expenses
    try {
      const { page = 1, pageSize = 10, search = "", isActive } = req.query;
      const offset = (page - 1) * pageSize;

      const searchCondition = search
        ? {
            [Op.or]: [{ description: { [Op.like]: `%${search}%` } }],
          }
        : {};

      const isActiveCondition =
        isActive === "true" || isActive === "false"
          ? {
              isActive: isActive === "true",
            }
          : {};

      const whereCondition = {
        ...searchCondition,
        ...isActiveCondition,
      };

      // Get all expenses
      const expenses = await Expense.findAndCountAll({
        limit: pageSize,
        offset,
        where: whereCondition,
        order: [["date", "DESC"]],
      });

      // Send a response with pagination details
      res.json({
        expenses: expenses.rows,
        totalExpenses: expenses.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(expenses.count / pageSize),
      });
    } catch (error) {
      // Send an error response
      res.status(500).json({ error: error.message, status: error.status });
    }
  },

  getTotalExpenses: async (req, res) => {
    // Get the total expenses
    try {
      const { isActive } = req.query;

      // Set the where condition based on the isActive query parameter
      const whereCondition = isActive === undefined ? {} : { isActive };

      // Get the total expenses
      const totalExpenses = await Expense.sum("amount", {
        where: whereCondition,
      });

      // Send a response
      res.json({ totalExpenses });
    } catch (error) {
      // Send an error response
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
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
