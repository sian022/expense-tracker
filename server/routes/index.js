const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const errorHandler = require("../middleware/errorHandler");

const authRoutes = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
const roleRoutes = require("./RoleRoutes");
const expenseRoutes = require("./ExpenseRoutes");

const publicRoutes = [authRoutes, userRoutes, roleRoutes];

const privateRoutes = [
  // userRoutes,
  // roleRoutes,
  expenseRoutes,
];

publicRoutes.forEach((route) => {
  router.use("/api", route, errorHandler);
});

privateRoutes.forEach((route) => {
  router.use("/api", verifyToken, route, errorHandler);
});

module.exports = router;
