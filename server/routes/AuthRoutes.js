const express = require("express");
const validateSchema = require("../middlewares/validateSchema");

const AuthController = require("../controllers/AuthController");

router.post("/login", validateSchema(authSchemas.login), AuthController.login);

module.exports = router;
