const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/RoleController");

router.post("/roles", RoleController.createRole);
router.get("/roles", RoleController.getAllRoles);
router.get("/roles/:id", RoleController.getRoleById);
router.put("/roles/:id", RoleController.updateRole);
router.patch("/roles/:id", RoleController.updateRoleStatus);

module.exports = router;
