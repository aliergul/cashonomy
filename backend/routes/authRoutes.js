const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validateLogin = require("../middlewares/validateLogin");
const validateSignUp = require("../middlewares/validateSignUp");

router.post("/sign-up", validateSignUp, authController.signUp);
router.post("/login", validateLogin, authController.login);
router.post("/google-auth", authController.googleAuth);

module.exports = router;
