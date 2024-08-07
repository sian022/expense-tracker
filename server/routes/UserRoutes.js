const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.patch("/users/:id/reset-password", UserController.resetPassword);
router.patch("/users/:id/change-password", UserController.changePassword);
router.patch("/users/:id", UserController.updateUserStatus);

module.exports = router;
