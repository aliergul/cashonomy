const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validateLogin = require("../middlewares/validateLogin");

router.post("/sign-up", authController.signUp);
router.post("/login", validateLogin, authController.login);
router.post("/google-auth", authController.googleAuth);

module.exports = router;
