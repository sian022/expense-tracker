const express = require("express");
const router = express.Router();

const ExpenseController = require("../controllers/ExpenseController");

router.post("/expenses", ExpenseController.createExpense);
router.get("/expenses", ExpenseController.getAllExpenses);
router.get("/expenses/total", ExpenseController.getTotalExpenses);
router.put("/expenses/:id", ExpenseController.updateExpense);
router.patch("/expenses/:id", ExpenseController.updateExpenseStatus);

module.exports = router;
