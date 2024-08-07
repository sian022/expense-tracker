const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const authRoutes = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
const roleRoutes = require("./RoleRoutes");
const expenseRoutes = require("./ExpenseRoutes");

const publicRoutes = [authRoutes];

const privateRoutes = [userRoutes, roleRoutes, expenseRoutes];

publicRoutes.forEach((route) => {
  router.use("/api", route);
});

privateRoutes.forEach((route) => {
  router.use("/api", verifyToken, route);
});

module.exports = router;
