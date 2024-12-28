const express = require("express");

const authController = require("../controllers/authController");
const userMiddleware = require("../middleware/userMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", userMiddleware.checkNewUserData, authController.signup);

module.exports = router;
