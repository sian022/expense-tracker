const express = require("express");
const router = express.Router();

const expenseRoutes = require("./ExpenseRoutes");

const publicRoutes = [expenseRoutes];

publicRoutes.forEach((route) => {
  router.use("/api", route);
});

module.exports = router;
