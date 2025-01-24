const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post("/google-auth", authController.googleAuth);

module.exports = router;
